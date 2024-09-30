import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';

// Assuming these types are defined elsewhere in the project
import { Podcast, PodcastCreateInput, PodcastUpdateInput } from '../../types/podcast';

interface PodcastFormProps {
  podcast?: Podcast;
  onSubmit: (data: PodcastCreateInput | PodcastUpdateInput) => void;
}

const PodcastForm: React.FC<PodcastFormProps> = ({ podcast, onSubmit }) => {
  const [coverImage, setCoverImage] = useState<string | null>(podcast?.coverImageUrl || null);
  const { control, handleSubmit, formState: { errors } } = useForm<PodcastCreateInput | PodcastUpdateInput>({
    defaultValues: {
      title: podcast?.title || '',
      description: podcast?.description || '',
    },
  });

  const handleImagePicker = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
      if (result.assets && result.assets.length > 0) {
        setCoverImage(result.assets[0].uri || null);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      // TODO: Implement error handling for image upload failures
    }
  };

  const onFormSubmit = (data: PodcastCreateInput | PodcastUpdateInput) => {
    onSubmit({ ...data, coverImageUrl: coverImage });
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Podcast Title"
            accessibilityLabel="Podcast Title Input"
          />
        )}
        name="title"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      <Controller
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Podcast Description"
            multiline
            accessibilityLabel="Podcast Description Input"
          />
        )}
        name="description"
      />
      {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

      <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker} accessibilityLabel="Select Cover Image">
        <Text>Select Cover Image</Text>
      </TouchableOpacity>

      {coverImage && (
        <Image source={{ uri: coverImage }} style={styles.coverImage} accessibilityLabel="Podcast Cover Image" />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onFormSubmit)} accessibilityLabel="Submit Podcast Form">
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PodcastForm;

// TODO: Implement error handling for image upload failures
// TODO: Add accessibility labels to form inputs
// TODO: Optimize image resizing for better performance