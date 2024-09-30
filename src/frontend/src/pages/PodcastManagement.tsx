import React, { useState, useEffect } from 'react';
import PodcastList from '../components/Podcast/PodcastList';
import PodcastForm from '../components/Podcast/PodcastForm';
import Button from '../components/Common/Button';
import Modal from '../components/Common/Modal';
import { Podcast } from '../types/podcast';
import { usePodcast } from '../hooks/usePodcast';

const PodcastManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { podcasts, createPodcast, updatePodcast, deletePodcast, fetchPodcasts } = usePodcast();

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handleCreatePodcast = async (podcastData: Omit<Podcast, 'id'>) => {
    setIsLoading(true);
    try {
      await createPodcast(podcastData);
      setIsModalOpen(false);
      fetchPodcasts();
    } catch (error) {
      console.error('Error creating podcast:', error);
      // TODO: Implement error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPodcast = async (podcastData: Podcast) => {
    setIsLoading(true);
    try {
      await updatePodcast(podcastData);
      setIsModalOpen(false);
      fetchPodcasts();
    } catch (error) {
      console.error('Error updating podcast:', error);
      // TODO: Implement error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePodcast = async (podcastId: number) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      setIsLoading(true);
      try {
        await deletePodcast(podcastId);
        fetchPodcasts();
      } catch (error) {
        console.error('Error deleting podcast:', error);
        // TODO: Implement error handling
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openModal = (podcast: Podcast | null = null) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPodcast(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Podcast Management</h1>
      <Button onClick={() => openModal()} className="mb-4">
        Add New Podcast
      </Button>
      <PodcastList
        podcasts={podcasts}
        onEdit={openModal}
        onDelete={handleDeletePodcast}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PodcastForm
          podcast={selectedPodcast}
          onSubmit={selectedPodcast ? handleEditPodcast : handleCreatePodcast}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default PodcastManagement;

// TODO: Implement error handling for podcast operations (create, edit, delete)
// TODO: Add loading indicators for asynchronous operations
// TODO: Implement proper form validation in PodcastForm component
// TODO: Add unit and integration tests for the PodcastManagement component
// TODO: Implement search and filter functionality for podcasts
// TODO: Add keyboard navigation support for improved accessibility