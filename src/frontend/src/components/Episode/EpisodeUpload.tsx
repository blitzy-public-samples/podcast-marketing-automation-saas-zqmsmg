import React, { useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Episode, EpisodeCreateInput } from '../../types/episode';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';
import { useEpisode } from '../../hooks/useEpisode';

const EpisodeUpload: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EpisodeCreateInput>();
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { createEpisode } = useEpisode();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
        setUploadError(null);
      } else {
        setUploadError('Please select an audio file.');
        setFile(null);
      }
    }
  };

  const onSubmit = async (formData: EpisodeCreateInput) => {
    if (!file) {
      setUploadError('Please select an audio file to upload.');
      return;
    }

    const maxFileSize = 100 * 1024 * 1024; // 100 MB
    if (file.size > maxFileSize) {
      setUploadError('File size exceeds the limit of 100 MB.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key as keyof EpisodeCreateInput]);
      });

      await createEpisode(formDataToSend, (progress) => {
        setUploadProgress(progress);
      });

      reset();
      setFile(null);
      setUploadProgress(0);
      setUploadError(null);
      // Show success message (implement toast or notification system)
      console.log('Episode uploaded successfully');
    } catch (error) {
      setUploadError('Failed to upload episode. Please try again.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload New Episode</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="text"
          label="Episode Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
        <Input
          type="textarea"
          label="Episode Description"
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />
        <Input
          type="file"
          label="Audio File"
          accept="audio/*"
          onChange={handleFileChange}
          error={uploadError}
        />
        {file && (
          <div className="text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <Button type="submit" disabled={!file || uploadProgress > 0}>
          Upload Episode
        </Button>
      </form>
    </div>
  );
};

export default EpisodeUpload;

// Human tasks:
// TODO: Implement proper error handling and user feedback for file upload failures
// TODO: Add file size limit validation to prevent uploading excessively large audio files
// TODO: Implement progress tracking for file upload to improve user experience
// TODO: Consider adding drag-and-drop functionality for file upload