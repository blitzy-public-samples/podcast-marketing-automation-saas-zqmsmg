import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Episode, EpisodeCreateInput } from '../../types/episode';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useEpisode } from '../../hooks/useEpisode';
import { Theme } from '../../styles/theme';

interface EpisodeUploadProps {
  podcastId: string;
  onUploadComplete: (episode: Episode) => void;
}

const pickAudioFile = async (): Promise<string | null> => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });
    return res.uri;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('User cancelled the picker');
    } else {
      console.error('Error picking audio file:', err);
      Alert.alert('Error', 'Failed to pick audio file. Please try again.');
    }
    return null;
  }
};

export const EpisodeUpload: React.FC<EpisodeUploadProps> = ({ podcastId, onUploadComplete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFileUrl, setAudioFileUrl] = useState<string | null>(null);
  const { createEpisode } = useEpisode();

  const handleUpload = async () => {
    if (!title || !description || !audioFileUrl) {
      Alert.alert('Error', 'Please fill in all fields and select an audio file.');
      return;
    }

    const episodeData: EpisodeCreateInput = {
      podcastId,
      title,
      description,
      audioFileUrl,
    };

    try {
      const newEpisode = await createEpisode(episodeData);
      onUploadComplete(newEpisode);
      Alert.alert('Success', 'Episode uploaded successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setAudioFileUrl(null);
    } catch (error) {
      console.error('Error uploading episode:', error);
      Alert.alert('Error', 'Failed to upload episode. Please try again.');
    }
  };

  const handlePickAudio = async () => {
    const fileUri = await pickAudioFile();
    if (fileUri) {
      setAudioFileUrl(fileUri);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={title}
        onChangeText={setTitle}
        placeholder="Episode Title"
        style={styles.input}
      />
      <Input
        value={description}
        onChangeText={setDescription}
        placeholder="Episode Description"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        title={audioFileUrl ? 'Audio File Selected' : 'Pick Audio File'}
        onPress={handlePickAudio}
        style={styles.button}
      />
      <Button
        title="Upload Episode"
        onPress={handleUpload}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default EpisodeUpload;

// Human tasks:
// TODO: Implement proper error handling and user feedback for file upload failures
// TODO: Add file size and type validation for audio uploads
// TODO: Implement progress indicator for audio file uploads
// TODO: Consider adding the ability to record audio directly in the app