import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Define the props interface for the Loader component
interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

// Loader component
const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#0000ff' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

// Styles for the Loader component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;

// Human tasks:
// TODO: Review and test the Loader component for different screen sizes and orientations
// TODO: Ensure the Loader component adheres to the app's design system and color scheme