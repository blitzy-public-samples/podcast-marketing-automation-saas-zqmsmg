import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View, Text } from 'react-native';
import { Theme } from '../../styles/theme';

interface InputProps {
  label?: string;
  error?: string;
  textInputProps?: TextInputProps;
}

const Input: React.FC<InputProps> = ({ label, error, textInputProps }) => {
  // Apply theme styles (assuming Theme object structure)
  const themeStyles = {
    labelColor: Theme.colors.text,
    inputBackgroundColor: Theme.colors.background,
    inputBorderColor: Theme.colors.border,
    errorColor: Theme.colors.error,
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: themeStyles.labelColor }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          { backgroundColor: themeStyles.inputBackgroundColor, borderColor: themeStyles.inputBorderColor },
          error && styles.inputError,
        ]}
        {...textInputProps}
      />
      {error && <Text style={[styles.errorText, { color: themeStyles.errorColor }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;

// Human tasks:
// - Review and test the Input component for accessibility compliance
// - Ensure the component adheres to the design system and UI/UX guidelines