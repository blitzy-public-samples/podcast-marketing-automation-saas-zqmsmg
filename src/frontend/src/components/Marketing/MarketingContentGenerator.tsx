import React, { useState, useCallback } from 'react';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Select from '../Common/Select';
import Loader from '../Common/Loader';

// Assuming these types are defined in the marketing types file
interface MarketingContentGenerationRequest {
  platform: SocialMediaPlatform;
  contentType: string;
  targetAudience: string;
  keyPoints: string[];
  episodeId: string;
}

interface MarketingContentGenerationResponse {
  content: MarketingContent;
}

interface MarketingContent {
  platform: SocialMediaPlatform;
  content: string;
  // Add other relevant fields
}

type SocialMediaPlatform = 'Twitter' | 'Facebook' | 'LinkedIn' | 'Instagram';

interface MarketingContentGeneratorProps {
  episodeId: string;
  onContentGenerated: (content: MarketingContent) => void;
}

const MarketingContentGenerator: React.FC<MarketingContentGeneratorProps> = ({
  episodeId,
  onContentGenerated,
}) => {
  const [platform, setPlatform] = useState<SocialMediaPlatform>('Twitter');
  const [contentType, setContentType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<MarketingContent | null>(null);

  const generateMarketingContent = async (request: MarketingContentGenerationRequest): Promise<MarketingContentGenerationResponse> => {
    // This function would typically make an API call to the backend
    // For now, we'll simulate an API call with a timeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            content: {
              platform: request.platform,
              content: `Generated content for ${request.platform} about ${request.contentType} targeting ${request.targetAudience}`,
            },
          });
        } else {
          reject(new Error('Failed to generate content'));
        }
      }, 1500);
    });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const request: MarketingContentGenerationRequest = {
        platform,
        contentType,
        targetAudience,
        keyPoints,
        episodeId,
      };

      const response = await generateMarketingContent(request);
      setGeneratedContent(response.content);
      onContentGenerated(response.content);
    } catch (err) {
      setError('Failed to generate marketing content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [platform, contentType, targetAudience, keyPoints, episodeId, onContentGenerated]);

  const handleKeyPointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const points = event.target.value.split(',').map(point => point.trim()).filter(point => point !== '');
    setKeyPoints(points);
  };

  return (
    <div className="marketing-content-generator">
      <h2>Generate Marketing Content</h2>
      <form onSubmit={handleSubmit}>
        <Select
          label="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as SocialMediaPlatform)}
          options={[
            { value: 'Twitter', label: 'Twitter' },
            { value: 'Facebook', label: 'Facebook' },
            { value: 'LinkedIn', label: 'LinkedIn' },
            { value: 'Instagram', label: 'Instagram' },
          ]}
        />
        <Input
          label="Content Type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          placeholder="e.g., Promotional, Educational, Engaging"
        />
        <Input
          label="Target Audience"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Professionals, Students, Tech Enthusiasts"
        />
        <Input
          label="Key Points (comma-separated)"
          value={keyPoints.join(', ')}
          onChange={handleKeyPointsChange}
          placeholder="e.g., Main topic, Guest name, Key takeaway"
        />
        <Button type="submit" disabled={isLoading}>
          Generate Content
        </Button>
      </form>

      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      {generatedContent && (
        <div className="generated-content">
          <h3>Generated Content for {generatedContent.platform}</h3>
          <p>{generatedContent.content}</p>
        </div>
      )}

      {/* Commented list of human tasks */}
      {/* 
      Human tasks:
      - Implement error handling and user feedback for failed API calls (Required)
      - Add form validation to ensure all required fields are filled before submission (Required)
      - Implement a preview feature for generated content before finalizing (Optional)
      - Add support for multiple content generation attempts and comparison (Optional)
      */}
    </div>
  );
};

export default MarketingContentGenerator;