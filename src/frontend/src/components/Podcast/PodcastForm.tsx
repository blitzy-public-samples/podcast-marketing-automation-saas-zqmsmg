import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Podcast, PodcastCreateInput, PodcastUpdateInput } from '../../types/podcast';
import Button from '../Common/Button';
import Input from '../Common/Input';

// Define the validation schema using yup
const podcastSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  coverImageUrl: yup.string().url('Must be a valid URL').required('Cover image URL is required'),
});

interface PodcastFormProps {
  podcast: Podcast | null;
  onSubmit: (data: PodcastCreateInput | PodcastUpdateInput) => Promise<void>;
  isLoading: boolean;
}

const PodcastForm: React.FC<PodcastFormProps> = ({ podcast, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: podcast || {},
    validationSchema: podcastSchema,
  });

  const onSubmitForm = async (data: PodcastCreateInput | PodcastUpdateInput) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
      />
      <Input
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        multiline
        rows={4}
      />
      <Input
        label="Cover Image URL"
        {...register('coverImageUrl')}
        error={errors.coverImageUrl?.message}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (podcast ? 'Update Podcast' : 'Create Podcast')}
      </Button>
    </form>
  );
};

export default PodcastForm;

// TODO: Implement file upload functionality for podcast cover image
// TODO: Add accessibility attributes to form elements
// TODO: Consider adding a rich text editor for the podcast description