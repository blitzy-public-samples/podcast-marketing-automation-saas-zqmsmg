import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { Theme } from '../styles/theme';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { register } = useAuth();

  const handleRegister = async () => {
    // Reset error
    setError('');

    // Validate input fields
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // TODO: Implement proper email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    // TODO: Implement password strength validation

    try {
      await register(email, password);
      // Navigate to login or dashboard (depending on your app flow)
      navigation.navigate('Login' as never);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Register" onPress={handleRegister} />
      </View>
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login' as never)}>
        Already have an account? Login
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Theme.colors.text,
  },
  form: {
    marginBottom: 20,
  },
  errorText: {
    color: Theme.colors.error,
    marginBottom: 10,
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    color: Theme.colors.primary,
  },
});

export default RegisterScreen;

// TODO: Implement proper error handling and display user-friendly error messages
// TODO: Ensure all input validations are in place (email format, password strength, etc.)
// TODO: Implement password visibility toggle feature
// TODO: Add terms and conditions checkbox and link
// TODO: Implement analytics tracking for registration attempts and success rates