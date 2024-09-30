import openai
import logging
from typing import Optional
from apps.marketing.models import MarketingContent
from apps.episodes.models import Episode

class ContentGenerationService:
    """Service class for generating marketing content using AI"""

    def __init__(self, api_key: str, model: str):
        """
        Initialize the ContentGenerationService with OpenAI API key and model

        :param api_key: OpenAI API key
        :param model: AI model to be used
        """
        self.api_key = api_key
        self.model = model
        openai.api_key = self.api_key
        self.logger = logging.getLogger(__name__)

    def generate_content(self, episode: Episode, platform: str) -> str:
        """
        Generate marketing content for a given episode and platform

        :param episode: Episode instance
        :param platform: Social media platform
        :return: Generated marketing content
        """
        try:
            # Extract relevant information from the episode
            episode_info = self._extract_episode_info(episode)

            # Construct a prompt for the AI model
            prompt = self._construct_prompt(episode_info, platform)

            # Call the OpenAI API to generate content
            response = openai.Completion.create(
                engine=self.model,
                prompt=prompt,
                max_tokens=150,
                n=1,
                stop=None,
                temperature=0.7,
            )

            # Process and format the generated content
            generated_content = response.choices[0].text.strip()
            formatted_content = self._format_content(generated_content, platform)

            return formatted_content
        except Exception as e:
            self.logger.error(f"Error generating content: {str(e)}")
            raise

    def save_generated_content(self, episode: Episode, platform: str, content: str) -> MarketingContent:
        """
        Save the generated content to the MarketingContent model

        :param episode: Episode instance
        :param platform: Social media platform
        :param content: Generated content
        :return: Saved MarketingContent instance
        """
        try:
            marketing_content = MarketingContent(
                episode=episode,
                platform=platform,
                content=content,
                status='draft'
            )
            marketing_content.save()
            return marketing_content
        except Exception as e:
            self.logger.error(f"Error saving generated content: {str(e)}")
            raise

    def generate_and_save_content(self, episode: Episode, platform: str) -> MarketingContent:
        """
        Generate and save marketing content for an episode and platform

        :param episode: Episode instance
        :param platform: Social media platform
        :return: Generated and saved MarketingContent instance
        """
        content = self.generate_content(episode, platform)
        return self.save_generated_content(episode, platform, content)

    def _extract_episode_info(self, episode: Episode) -> dict:
        """
        Extract relevant information from the episode

        :param episode: Episode instance
        :return: Dictionary containing episode information
        """
        return {
            'title': episode.title,
            'description': episode.description,
            'transcript': self._get_transcript(episode)
        }

    def _get_transcript(self, episode: Episode) -> Optional[str]:
        """
        Get the transcript for the episode if available

        :param episode: Episode instance
        :return: Transcript text or None if not available
        """
        try:
            return episode.transcript.content
        except AttributeError:
            return None

    def _construct_prompt(self, episode_info: dict, platform: str) -> str:
        """
        Construct a prompt for the AI model based on the platform and episode information

        :param episode_info: Dictionary containing episode information
        :param platform: Social media platform
        :return: Constructed prompt
        """
        return f"Generate a {platform} post for a podcast episode titled '{episode_info['title']}'. " \
               f"Episode description: {episode_info['description']}. " \
               f"Use the following transcript excerpt if available: " \
               f"{episode_info['transcript'][:500] if episode_info['transcript'] else 'No transcript available.'}"

    def _format_content(self, content: str, platform: str) -> str:
        """
        Process and format the generated content based on the platform

        :param content: Generated content
        :param platform: Social media platform
        :return: Formatted content
        """
        # Add platform-specific formatting (e.g., hashtags for Twitter)
        if platform.lower() == 'twitter':
            content = f"{content[:250]}... #podcast"
        elif platform.lower() == 'linkedin':
            content = f"{content}\n\n#podcast #contentcreation"
        return content

# TODO: Implement error handling and retries for API calls to OpenAI
# TODO: Implement rate limiting to comply with OpenAI API usage limits
# TODO: Create unit tests for the ContentGenerationService class
# TODO: Consider implementing a caching mechanism to store generated content temporarily
# TODO: Explore options for content customization based on user preferences or platform-specific requirements