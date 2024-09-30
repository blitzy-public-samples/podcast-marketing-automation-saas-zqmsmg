from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Transcript
from .serializers import TranscriptSerializer
from apps.episodes.models import Episode
from services.transcription import transcription_service

class TranscriptListCreateView(generics.ListCreateAPIView):
    queryset = Transcript.objects.all()
    serializer_class = TranscriptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieves a list of all transcripts.
        """
        transcripts = self.get_queryset()
        serializer = self.get_serializer(transcripts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Creates a new transcript for a given episode.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            episode_id = request.data.get('episode_id')
            try:
                episode = Episode.objects.get(id=episode_id)
            except Episode.DoesNotExist:
                return Response({"error": "Episode not found"}, status=status.HTTP_404_NOT_FOUND)

            transcript = serializer.save(episode=episode)
            
            # Initiate the transcription process
            transcription_service.create_transcript(transcript.id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TranscriptDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transcript.objects.all()
    serializer_class = TranscriptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Retrieves a specific transcript.
        """
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Updates a specific transcript.
        """
        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Deletes a specific transcript.
        """
        return super().delete(request, *args, **kwargs)

class TranscriptGenerateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, episode_id):
        """
        Generates a transcript for a specific episode.
        """
        try:
            episode = Episode.objects.get(id=episode_id)
        except Episode.DoesNotExist:
            return Response({"error": "Episode not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if a transcript already exists
        existing_transcript = Transcript.objects.filter(episode=episode).first()
        if existing_transcript:
            return Response({"error": "Transcript already exists for this episode"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new Transcript object
        transcript = Transcript.objects.create(episode=episode)

        # Initiate the transcription process
        transcription_service.create_transcript(transcript.id)

        return Response({"message": "Transcript generation initiated"}, status=status.HTTP_202_ACCEPTED)

class TranscriptDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        """
        Downloads a transcript in the specified format.
        """
        try:
            transcript = Transcript.objects.get(pk=pk)
        except Transcript.DoesNotExist:
            return Response({"error": "Transcript not found"}, status=status.HTTP_404_NOT_FOUND)

        format = request.query_params.get('format', 'txt')
        
        if format not in ['txt', 'srt', 'vtt']:
            return Response({"error": "Invalid format specified"}, status=status.HTTP_400_BAD_REQUEST)

        # TODO: Implement the logic to generate the transcript in the requested format
        # This is a placeholder implementation
        content = f"Transcript content in {format} format"
        
        response = Response(content, content_type='text/plain')
        response['Content-Disposition'] = f'attachment; filename="transcript.{format}"'
        return response

# TODO: Implement proper error handling and logging for all views
# TODO: Add authentication and permission checks for all views
# TODO: Implement rate limiting for transcript generation to prevent abuse
# TODO: Add support for different transcript formats in the TranscriptDownloadView
# TODO: Implement caching for frequently accessed transcripts