import logging
import json
import openai
from django.conf import settings
from src.api.apps.episodes.models import Episode
from src.api.apps.transcripts.models import Transcript
from src.api.apps.marketing.models import MarketingContent

logger = logging.getLogger(__name__)

class ContentGenerationService:
    """
    A service class for generating AI-driven marketing content for podcast episodes.
    """

    def __init__(self):
        """
        Initializes the ContentGenerationService with OpenAI API key and model name.
        """
        self.openai_api_key = settings.OPENAI_API_KEY
        self.model_name = 'gpt-3.5-turbo'
        openai.api_key = self.openai_api_key

    def generate_marketing_content(self, episode: Episode, platform: str) -> MarketingContent:
        """
        Generates marketing content for a given podcast episode using its transcript.

        Args:
            episode (Episode): The podcast episode for which to generate content.
            platform (str): The social media platform for which to generate content.

        Returns:
            MarketingContent: Generated marketing content object.
        """
        try:
            transcript = Transcript.objects.get(episode=episode)
            prompt = self.prepare_prompt(episode, transcript, platform)
            generated_content = self.call_openai_api(prompt)
            parsed_content = self.parse_generated_content(generated_content, platform)

            marketing_content = MarketingContent.objects.create(
                episode=episode,
                platform=platform,
                content=json.dumps(parsed_content),
                status='generated'
            )

            return marketing_content

        except Transcript.DoesNotExist:
            logger.error(f"Transcript not found for episode {episode.id}")
            raise ValueError(f"Transcript not found for episode {episode.id}")
        except Exception as e:
            logger.error(f"Error generating marketing content: {str(e)}")
            raise

    def prepare_prompt(self, episode: Episode, transcript: Transcript, platform: str) -> str:
        """
        Prepares the prompt for content generation based on episode data and target platform.

        Args:
            episode (Episode): The podcast episode.
            transcript (Transcript): The transcript of the episode.
            platform (str): The social media platform for which to generate content.

        Returns:
            str: Prepared prompt for content generation.
        """
        summary = transcript.content[:500]  # Use first 500 characters as summary
        prompt = f"""
        Generate marketing content for the following podcast episode:
        Title: {episode.title}
        Description: {episode.description}
        Summary: {summary}

        Target platform: {platform}

        Please generate the following:
        1. A catchy headline (max 100 characters)
        2. Main post content (max 280 characters for Twitter, 2200 for other platforms)
        3. Three relevant hashtags
        4. A call-to-action

        Format the response as a JSON object with keys: "headline", "main_content", "hashtags", and "cta".
        """
        return prompt

    def call_openai_api(self, prompt: str) -> str:
        """
        Makes a call to the OpenAI API to generate content based on the prepared prompt.

        Args:
            prompt (str): The prepared prompt for content generation.

        Returns:
            str: Generated content from OpenAI API.
        """
        try:
            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that generates marketing content for podcast episodes."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                n=1,
                stop=None,
                temperature=0.7,
            )
            return response.choices[0].message['content'].strip()
        except Exception as e:
            logger.error(f"Error calling OpenAI API: {str(e)}")
            raise

    def parse_generated_content(self, content: str, platform: str) -> dict:
        """
        Parses and validates the generated content to ensure it meets the required format.

        Args:
            content (str): The generated content from OpenAI API.
            platform (str): The social media platform for which the content was generated.

        Returns:
            dict: Parsed and validated content.
        """
        try:
            parsed_content = json.loads(content)
            required_keys = ["headline", "main_content", "hashtags", "cta"]
            
            if not all(key in parsed_content for key in required_keys):
                raise ValueError("Generated content is missing required keys")

            # Validate content length
            if len(parsed_content["headline"]) > 100:
                parsed_content["headline"] = parsed_content["headline"][:97] + "..."

            if platform.lower() == "twitter":
                if len(parsed_content["main_content"]) > 280:
                    parsed_content["main_content"] = parsed_content["main_content"][:277] + "..."
            elif len(parsed_content["main_content"]) > 2200:
                parsed_content["main_content"] = parsed_content["main_content"][:2197] + "..."

            if not isinstance(parsed_content["hashtags"], list) or len(parsed_content["hashtags"]) != 3:
                raise ValueError("Generated content should contain exactly 3 hashtags")

            return parsed_content

        except json.JSONDecodeError:
            logger.error("Failed to parse generated content as JSON")
            raise ValueError("Generated content is not in valid JSON format")
        except Exception as e:
            logger.error(f"Error parsing generated content: {str(e)}")
            raise

# TODO: Implement rate limiting and error handling for OpenAI API calls
# TODO: Add unit tests for ContentGenerationService methods
# TODO: Implement caching mechanism for generated content to reduce API calls
# TODO: Add support for multiple language content generation