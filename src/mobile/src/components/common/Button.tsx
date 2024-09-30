import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, style }) => {
  // Create a combined style array
  const buttonStyles = [
    styles.button,
    disabled && styles.disabledButton,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Button;

// Human tasks:
// TODO: Review and approve the Button component design and functionality
// TODO: Confirm the color scheme and styling of the button
// TODO: Consider adding additional button variants (e.g., outline, text-only)