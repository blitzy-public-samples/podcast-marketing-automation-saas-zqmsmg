import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { Theme } from '../styles/theme';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    // Basic input validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      // Navigation to main app will be handled by the auth state change
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title="Login"
        onPress={handleLogin}
        disabled={isLoading}
      />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  errorText: {
    color: Theme.colors.error,
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: Theme.colors.primary,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: Theme.colors.text,
  },
  registerLink: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;

// Human tasks:
// TODO: Implement proper error handling and user feedback for login failures
// TODO: Add loading state to the login button while authentication is in progress
// TODO: Implement 'Remember Me' functionality if required
// TODO: Set up analytics tracking for login attempts and success/failure rates
// TODO: Review and test the login flow for usability and accessibility