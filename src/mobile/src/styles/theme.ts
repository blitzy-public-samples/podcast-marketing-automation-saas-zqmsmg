import { StyleSheet } from 'react-native';

// Define color palette
const colors = {
  primary: '#1E40AF', // Deep Blue
  secondary: '#0D9488', // Teal
  background: '#F3F4F6', // Light Gray
  text: '#1F2937', // Dark Gray
  error: '#EF4444', // Red
  success: '#10B981', // Green
  warning: '#F59E0B', // Yellow
  info: '#3B82F6', // Blue
};

// Define typography
const typography = {
  fontFamily: 'Inter', // Primary font family
  fontSize: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

// Define spacing
const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

// Define border radius
const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

// Define shadows
const shadows = StyleSheet.create({
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

// Define the complete theme object
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

// Function to get the complete theme object
export const getTheme = () => theme;

// Export individual theme components for more granular usage
export { colors, typography, spacing, borderRadius, shadows };

// Human tasks (commented as requested)
/*
Human tasks:
1. Finalize the color palette with the design team
2. Confirm the typography settings, including font family and sizes
3. Verify accessibility compliance of the chosen color combinations
4. Decide on specific values for spacing and border radius
*/