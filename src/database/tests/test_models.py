import pytest
from freezegun import freeze_time
from src.database.models import User, Podcast, Episode, Transcript, MarketingContent, SocialMediaPost, Analytics
from src.database.config.database import db

def setup_module():
    """Set up the test database and create tables before running tests"""
    # Connect to the test database
    db.connect()
    # Create all tables defined in the models
    db.create_tables([User, Podcast, Episode, Transcript, MarketingContent, SocialMediaPost, Analytics])

def teardown_module():
    """Clean up the test database after running all tests"""
    # Drop all tables in the test database
    db.drop_tables([User, Podcast, Episode, Transcript, MarketingContent, SocialMediaPost, Analytics])
    # Close the database connection
    db.close()

@pytest.mark.parametrize('email,password,is_valid', [
    ('test@example.com', 'password123', True),
    ('invalid_email', 'short', False)
])
def test_user_model(email, password, is_valid):
    """Test the User model creation and validation"""
    # Create a User instance with given email and password
    user = User(email=email, password=password)
    
    # Assert that the User instance is valid or invalid as expected
    assert user.is_valid() == is_valid
    
    # If valid, save the User to the database and assert it was saved correctly
    if is_valid:
        user.save()
        assert User.get(User.email == email) == user

def test_podcast_model():
    """Test the Podcast model creation and relationships"""
    # Create a User instance
    user = User.create(email="podcast_creator@example.com", password="secure_password")
    
    # Create a Podcast instance associated with the User
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    
    # Assert that the Podcast was created successfully
    assert Podcast.get(Podcast.id == podcast.id) == podcast
    
    # Assert that the relationship between User and Podcast is correct
    assert podcast.user == user

def test_episode_model():
    """Test the Episode model creation and relationships"""
    # Create a User and Podcast instance
    user = User.create(email="episode_creator@example.com", password="secure_password")
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    
    # Create an Episode instance associated with the Podcast
    episode = Episode.create(
        title="Test Episode",
        description="A test episode",
        audio_file_url="https://example.com/test_episode.mp3",
        podcast=podcast
    )
    
    # Assert that the Episode was created successfully
    assert Episode.get(Episode.id == episode.id) == episode
    
    # Assert that the relationship between Podcast and Episode is correct
    assert episode.podcast == podcast

def test_transcript_model():
    """Test the Transcript model creation and relationships"""
    # Create a User, Podcast, and Episode instance
    user = User.create(email="transcript_creator@example.com", password="secure_password")
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    episode = Episode.create(
        title="Test Episode",
        description="A test episode",
        audio_file_url="https://example.com/test_episode.mp3",
        podcast=podcast
    )
    
    # Create a Transcript instance associated with the Episode
    transcript = Transcript.create(content="This is a test transcript.", episode=episode)
    
    # Assert that the Transcript was created successfully
    assert Transcript.get(Transcript.id == transcript.id) == transcript
    
    # Assert that the relationship between Episode and Transcript is correct
    assert transcript.episode == episode

def test_marketing_content_model():
    """Test the MarketingContent model creation and relationships"""
    # Create a User, Podcast, and Episode instance
    user = User.create(email="marketing_creator@example.com", password="secure_password")
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    episode = Episode.create(
        title="Test Episode",
        description="A test episode",
        audio_file_url="https://example.com/test_episode.mp3",
        podcast=podcast
    )
    
    # Create a MarketingContent instance associated with the Episode
    marketing_content = MarketingContent.create(
        content="Check out our latest episode!",
        platform="twitter",
        episode=episode
    )
    
    # Assert that the MarketingContent was created successfully
    assert MarketingContent.get(MarketingContent.id == marketing_content.id) == marketing_content
    
    # Assert that the relationship between Episode and MarketingContent is correct
    assert marketing_content.episode == episode

def test_social_media_post_model():
    """Test the SocialMediaPost model creation and relationships"""
    # Create a User, Podcast, Episode, and MarketingContent instance
    user = User.create(email="social_media_creator@example.com", password="secure_password")
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    episode = Episode.create(
        title="Test Episode",
        description="A test episode",
        audio_file_url="https://example.com/test_episode.mp3",
        podcast=podcast
    )
    marketing_content = MarketingContent.create(
        content="Check out our latest episode!",
        platform="twitter",
        episode=episode
    )
    
    # Create a SocialMediaPost instance associated with the MarketingContent
    social_media_post = SocialMediaPost.create(
        platform="twitter",
        post_id="1234567890",
        marketing_content=marketing_content
    )
    
    # Assert that the SocialMediaPost was created successfully
    assert SocialMediaPost.get(SocialMediaPost.id == social_media_post.id) == social_media_post
    
    # Assert that the relationship between MarketingContent and SocialMediaPost is correct
    assert social_media_post.marketing_content == marketing_content

@freeze_time("2023-05-01")
def test_analytics_model():
    """Test the Analytics model creation and relationships"""
    # Create a User, Podcast, and Episode instance
    user = User.create(email="analytics_creator@example.com", password="secure_password")
    podcast = Podcast.create(title="Test Podcast", description="A test podcast", user=user)
    episode = Episode.create(
        title="Test Episode",
        description="A test episode",
        audio_file_url="https://example.com/test_episode.mp3",
        podcast=podcast
    )
    
    # Create an Analytics instance associated with the Episode
    analytics = Analytics.create(
        downloads=100,
        likes=50,
        shares=25,
        comments=10,
        episode=episode
    )
    
    # Assert that the Analytics was created successfully
    assert Analytics.get(Analytics.id == analytics.id) == analytics
    
    # Assert that the relationship between Episode and Analytics is correct
    assert analytics.episode == episode
    
    # Assert that the date is correctly set to the frozen time
    assert analytics.date.strftime("%Y-%m-%d") == "2023-05-01"

# Human tasks:
# 1. Implement additional edge case tests for each model (Required)
# 2. Add tests for model methods and properties, if any (Required)
# 3. Implement integration tests to check model interactions (Optional)