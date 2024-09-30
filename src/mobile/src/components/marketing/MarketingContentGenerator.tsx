import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MobileMarketingContent, MarketingContentType } from '../../types/marketing';
import { useMarketing } from '../../hooks/useMarketing';
import { useEpisode } from '../../hooks/useEpisode';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';

// Assuming these types are defined in the marketing.ts file
type Episode = {
  id: string;
  title: string;
};

const MarketingContentGenerator: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [selectedContentTypes, setSelectedContentTypes] = useState<MarketingContentType[]>([]);
  const [generatedContent, setGeneratedContent] = useState<MobileMarketingContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { episodes, loading: episodesLoading } = useEpisode();
  const { generateMarketingContent, loading: marketingLoading } = useMarketing();

  const handleEpisodeSelect = useCallback((episodeId: string) => {
    setSelectedEpisode(episodeId);
    setGeneratedContent(null);
  }, []);

  const handleContentTypeToggle = useCallback((contentType: MarketingContentType) => {
    setSelectedContentTypes(prev => 
      prev.includes(contentType)
        ? prev.filter(type => type !== contentType)
        : [...prev, contentType]
    );
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!selectedEpisode || selectedContentTypes.length === 0) {
      setError('Please select an episode and at least one content type');
      return;
    }

    setError(null);
    try {
      const content = await generateMarketingContent(selectedEpisode, selectedContentTypes);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate marketing content. Please try again.');
    }
  }, [selectedEpisode, selectedContentTypes, generateMarketingContent]);

  if (episodesLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Marketing Content Generator</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Episode</Text>
        {episodes.map((episode: Episode) => (
          <Button
            key={episode.id}
            title={episode.title}
            onPress={() => handleEpisodeSelect(episode.id)}
            style={selectedEpisode === episode.id ? styles.selectedButton : styles.button}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Content Types</Text>
        {Object.values(MarketingContentType).map((type) => (
          <Button
            key={type}
            title={type}
            onPress={() => handleContentTypeToggle(type)}
            style={selectedContentTypes.includes(type) ? styles.selectedButton : styles.button}
          />
        ))}
      </View>

      <Button
        title="Generate Content"
        onPress={handleGenerate}
        disabled={marketingLoading}
        style={styles.generateButton}
      />

      {marketingLoading && <Loader />}

      {error && <Text style={styles.error}>{error}</Text>}

      {generatedContent && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generated Content</Text>
          {Object.entries(generatedContent).map(([type, content]) => (
            <View key={type} style={styles.contentItem}>
              <Text style={styles.contentType}>{type}</Text>
              <Input
                multiline
                value={content}
                editable={false}
                style={styles.contentText}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
  },
  selectedButton: {
    marginBottom: 8,
    backgroundColor: '#007AFF',
  },
  generateButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  contentItem: {
    marginBottom: 16,
  },
  contentType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentText: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default MarketingContentGenerator;

// TODO: Implement design system and styling for the component
// TODO: Add accessibility features for screen readers
// TODO: Implement offline support for content generation (Optional)