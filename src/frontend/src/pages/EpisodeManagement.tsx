import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeList from '../components/Episode/EpisodeList';
import EpisodeForm from '../components/Episode/EpisodeForm';
import { Episode } from '../types/episode';
import useEpisode from '../hooks/useEpisode';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';

const EpisodeManagement: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { podcastId } = useParams<{ podcastId: string }>();
  const { episodes, fetchEpisodes, createEpisode, updateEpisode, deleteEpisode } = useEpisode();

  useEffect(() => {
    if (podcastId) {
      fetchEpisodes(podcastId);
    }
  }, [podcastId, fetchEpisodes]);

  const handleAddEpisode = () => {
    setSelectedEpisode(null);
    setIsFormOpen(true);
  };

  const handleEditEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsFormOpen(true);
  };

  const handleDeleteEpisode = (episode: Episode) => {
    setSelectedEpisode(episode);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData: Partial<Episode>) => {
    try {
      if (selectedEpisode) {
        await updateEpisode(selectedEpisode.id, formData);
      } else {
        await createEpisode(podcastId!, formData);
      }
      setIsFormOpen(false);
      fetchEpisodes(podcastId!);
    } catch (error) {
      console.error('Error submitting episode:', error);
      // TODO: Implement error handling and display error message to user
    }
  };

  const confirmDelete = async () => {
    if (selectedEpisode) {
      try {
        await deleteEpisode(selectedEpisode.id);
        setIsDeleteModalOpen(false);
        fetchEpisodes(podcastId!);
      } catch (error) {
        console.error('Error deleting episode:', error);
        // TODO: Implement error handling and display error message to user
      }
    }
  };

  return (
    <div className="episode-management">
      <h1>Episode Management</h1>
      <Button onClick={handleAddEpisode}>Add New Episode</Button>
      <EpisodeList
        episodes={episodes}
        onEdit={handleEditEpisode}
        onDelete={handleDeleteEpisode}
      />
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <EpisodeForm
          episode={selectedEpisode}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this episode?</p>
          <Button onClick={confirmDelete}>Yes, Delete</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default EpisodeManagement;

// TODO: Implement error handling and success notifications for CRUD operations
// TODO: Add loading indicators for asynchronous operations
// TODO: Implement batch operations (e.g., bulk delete, bulk status update)
// TODO: Add keyboard shortcuts for common actions (e.g., 'N' for new episode)
// TODO: Implement undo functionality for delete operations