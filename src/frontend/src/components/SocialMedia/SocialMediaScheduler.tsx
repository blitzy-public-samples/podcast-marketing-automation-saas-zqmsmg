import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SocialMediaPost, MarketingContent, SocialMediaPlatform } from '../../types';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Modal from '../Common/Modal';

interface SocialMediaSchedulerProps {
  marketingContents: MarketingContent[];
  onSchedule: (post: SocialMediaPost) => void;
}

const SocialMediaScheduler: React.FC<SocialMediaSchedulerProps> = ({ marketingContents, onSchedule }) => {
  const [selectedContent, setSelectedContent] = useState<MarketingContent | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialMediaPlatform | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset platform if the new content is for a different platform
    if (selectedContent && selectedPlatform && selectedContent.platform !== selectedPlatform) {
      setSelectedPlatform(null);
    }
  }, [selectedContent]);

  const handleContentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const content = marketingContents.find(c => c.id === event.target.value);
    setSelectedContent(content || null);
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(event.target.value as SocialMediaPlatform);
  };

  const handleDateChange = (date: Date | null) => {
    setScheduledDate(date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledTime(event.target.value);
  };

  const validateForm = (): boolean => {
    if (!selectedContent) {
      setError('Please select a marketing content.');
      return false;
    }
    if (!selectedPlatform) {
      setError('Please select a social media platform.');
      return false;
    }
    if (!scheduledDate) {
      setError('Please select a date.');
      return false;
    }
    if (!scheduledTime) {
      setError('Please select a time.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSchedule = () => {
    if (!validateForm()) return;

    const [hours, minutes] = scheduledTime.split(':').map(Number);
    const scheduledDateTime = new Date(scheduledDate!);
    scheduledDateTime.setHours(hours, minutes);

    const newPost: SocialMediaPost = {
      id: '', // This will be generated by the backend
      marketingContentId: selectedContent!.id,
      platform: selectedPlatform!,
      scheduledTime: scheduledDateTime.toISOString(),
      status: 'SCHEDULED',
    };

    onSchedule(newPost);
    resetForm();
  };

  const resetForm = () => {
    setSelectedContent(null);
    setSelectedPlatform(null);
    setScheduledDate(null);
    setScheduledTime('');
  };

  const handleOpenModal = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="social-media-scheduler">
      <h2>Schedule Social Media Post</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="content-select">Select Marketing Content:</label>
        <select id="content-select" onChange={handleContentChange} value={selectedContent?.id || ''}>
          <option value="">Select content</option>
          {marketingContents.map(content => (
            <option key={content.id} value={content.id}>{content.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="platform-select">Select Platform:</label>
        <select id="platform-select" onChange={handlePlatformChange} value={selectedPlatform || ''}>
          <option value="">Select platform</option>
          {Object.values(SocialMediaPlatform).map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date-picker">Select Date:</label>
        <DatePicker
          id="date-picker"
          selected={scheduledDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <div className="form-group">
        <label htmlFor="time-input">Select Time:</label>
        <Input
          id="time-input"
          type="time"
          value={scheduledTime}
          onChange={handleTimeChange}
        />
      </div>
      {selectedContent && (
        <div className="content-preview">
          <h3>Content Preview:</h3>
          <p>{selectedContent.content}</p>
        </div>
      )}
      <Button onClick={handleOpenModal}>Schedule Post</Button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <h2>Confirm Scheduling</h2>
        <p>Are you sure you want to schedule this post?</p>
        <Button onClick={handleSchedule}>Confirm</Button>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default SocialMediaScheduler;

// TODO: Implement error handling for API calls in the onSchedule function
// TODO: Add form validation to ensure all required fields are filled before scheduling
// TODO: Implement character count validation for different social media platforms