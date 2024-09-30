import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import { Button } from './Button';

// Define ModalProps type
export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  const modalSizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div
          className={classNames(
            'inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl',
            modalSizeClasses[size],
            className
          )}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">{children}</div>

          <div className="mt-4">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

// Human tasks:
// TODO: Review and adjust modal styles to match the design system
// TODO: Implement animations for modal open/close transitions
// TODO: Add keyboard event listeners for accessibility (e.g., closing on Esc key)
// TODO: Implement unit tests for the Modal component