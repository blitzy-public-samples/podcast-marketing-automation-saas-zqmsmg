import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  size?: string;
  color?: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div<LoaderProps>`
  display: inline-block;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
`;

const SpinnerAnimation = styled.div<LoaderProps>`
  width: 100%;
  height: 100%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${props => props.color || '#1E40AF'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <LoaderWrapper size={size}>
      <SpinnerAnimation color={color} />
    </LoaderWrapper>
  );
};

export default Loader;

// TODO: Implement accessibility features for the loader, such as aria-labels
// TODO: Consider adding different loader styles or animations as options