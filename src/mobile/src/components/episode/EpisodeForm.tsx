import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Episode, EpisodeCreateInput, EpisodeUpdateInput, EpisodeStatus } from '../../types/episode';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { useEpisode } from '../../hooks/useEpisode';
import * as formatters from '../../utils/formatters';
import * as validators from '../../utils/validators';

interface EpisodeFormProps {
  episode?: Episode;
  onSubmit: (episode: EpisodeCreateInput | EpisodeUpdateInput) => void;
  onCancel: () => void;
}

export const EpisodeForm: React.FC<EpisodeFormProps> = ({ episode, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(episode?.title || '');
  const [description, setDescription] = useState(episode?.description || '');
  const [audioFile, setAudioFile] = useState<string | null>(episode?.audioFileUrl || null);
  const [publishDate, setPublishDate] = useState<Date | null>(episode?.publishDate ? new Date(episode.publishDate) : null);
  const [status, setStatus] = useState<EpisodeStatus>(episode?.status || EpisodeStatus.DRAFT);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createEpisode, updateEpisode } = useEpisode();

  useEffect(() => {
    // Reset form when episode prop changes
    if (episode) {
      setTitle(episode.title);
      setDescription(episode.description);
      setAudioFile(episode.audioFileUrl);
      setPublishDate(episode.publishDate ? new Date(episode.publishDate) : null);
      setStatus(episode.status);
    }
  }, [episode]);

  const handleSubmit = async () => {
    if (validateForm()) {
      const episodeData: EpisodeCreateInput | EpisodeUpdateInput = {
        title,
        description,
        audioFileUrl: audioFile,
        publishDate: publishDate?.toISOString(),
        status,
      };

      try {
        if (episode) {
          await updateEpisode(episode.id, episodeData as EpisodeUpdateInput);
        } else {
          await createEpisode(episodeData as EpisodeCreateInput);
        }
        onSubmit(episodeData);
      } catch (error) {
        console.error('Error submitting episode:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validators.isValidTitle(title)) {
      newErrors.title = 'Title is required and must be between 3 and 100 characters';
    }

    if (!validators.isValidDescription(description)) {
      newErrors.description = 'Description is required and must be between 10 and 1000 characters';
    }

    if (!audioFile) {
      newErrors.audioFile = 'Audio file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAudioUpload = async () => {
    // TODO: Implement audio file upload functionality
    // This should open a file picker, upload the file to cloud storage,
    // and update the audioFile state with the uploaded file URL
    console.log('Audio upload not implemented');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPublishDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Title"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        error={errors.description}
      />
      <TouchableOpacity onPress={handleAudioUpload} style={styles.uploadButton}>
        <Text>{audioFile ? 'Change Audio File' : 'Upload Audio File'}</Text>
      </TouchableOpacity>
      {errors.audioFile && <Text style={styles.errorText}>{errors.audioFile}</Text>}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text>{publishDate ? formatters.formatDate(publishDate) : 'Select Publish Date'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={publishDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.statusContainer}>
        <Text>Status:</Text>
        {Object.values(EpisodeStatus).map((statusOption) => (
          <TouchableOpacity
            key={statusOption}
            onPress={() => setStatus(statusOption)}
            style={[
              styles.statusButton,
              status === statusOption && styles.statusButtonActive,
            ]}
          >
            <Text>{statusOption}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} variant="secondary" />
        <Button title={episode ? 'Update' : 'Create'} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  uploadButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 4,
    marginVertical: 8,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 4,
    marginVertical: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  statusButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusButtonActive: {
    backgroundColor: '#a0a0a0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

// TODO: Implement the audio file upload functionality
// TODO: Design and implement error handling and user feedback mechanisms
// TODO: Optimize the form for various screen sizes and orientations
// TODO: Implement accessibility features for the form inputs
// TODO: Consider adding form field hints or tooltips for better user guidance