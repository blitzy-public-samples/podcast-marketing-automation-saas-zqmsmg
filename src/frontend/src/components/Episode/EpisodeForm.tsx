import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Episode, EpisodeCreateInput, EpisodeUpdateInput, EpisodeStatus } from '../../types/episode';
import { Button } from '../Common/Button';
import { Input } from '../Common/Input';

interface EpisodeFormProps {
  podcastId: string;
  initialData: Episode | null;
  onSubmit: (data: EpisodeCreateInput | EpisodeUpdateInput) => void;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  audioFileUrl: yup.string().url('Invalid URL').required('Audio file URL is required'),
  status: yup.string().oneOf(Object.values(EpisodeStatus)).required('Status is required'),
  publishDate: yup.date().nullable(),
});

export const EpisodeForm: React.FC<EpisodeFormProps> = ({ podcastId, initialData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialData || { podcastId },
    validationSchema,
  });

  React.useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof Episode, value);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: EpisodeCreateInput | EpisodeUpdateInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
        label="Audio File URL"
        {...register('audioFileUrl')}
        error={errors.audioFileUrl?.message}
      />
      <Input
        label="Status"
        {...register('status')}
        error={errors.status?.message}
        as="select"
      >
        {Object.values(EpisodeStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Input>
      <Input
        label="Publish Date"
        type="datetime-local"
        {...register('publishDate')}
        error={errors.publishDate?.message}
      />
      <Button type="submit">
        {initialData ? 'Update Episode' : 'Create Episode'}
      </Button>
    </form>
  );
};

// Human tasks:
// TODO: Implement file upload functionality for audio files
// TODO: Add support for scheduling episode publication
// TODO: Integrate with a rich text editor for episode description
// TODO: Implement auto-save functionality to prevent data loss