import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import styled from 'styled-components/native';

// Define the ModalProps interface based on the JSON specification
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-height: 80%;
`;

const ModalHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ModalTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled(TouchableOpacity)`
  padding: 5px;
`;

const CloseButtonText = styled(Text)`
  font-size: 20px;
  color: #333;
`;

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, title, children }) => {
  return (
    <RNModal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onPress={onClose}>
              <CloseButtonText>×</CloseButtonText>
            </CloseButton>
          </ModalHeader>
          {children}
        </ModalContent>
      </ModalContainer>
    </RNModal>
  );
};

export default Modal;

// Human tasks (commented):
/*
1. Review and approve the Modal component design and functionality
2. Ensure the Modal component is accessible and follows React Native best practices
3. Test the Modal component on various device sizes and orientations
*/