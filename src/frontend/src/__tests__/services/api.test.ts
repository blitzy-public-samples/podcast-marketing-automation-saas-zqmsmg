import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { api, handleApiError } from '../../services/api';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '../../config/constants';

describe('API Service', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(api);
    localStorage.clear();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create an axios instance with the correct base URL', () => {
    expect(api.defaults.baseURL).toBe(API_BASE_URL);
  });

  it('should add authorization header to requests', async () => {
    const token = 'test-token';
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    mock.onGet('/test').reply(config => {
      expect(config.headers?.Authorization).toBe(`Bearer ${token}`);
      return [200, {}];
    });

    await api.get('/test');
  });

  it('should handle successful responses', async () => {
    const responseData = { message: 'Success' };
    mock.onGet('/test').reply(200, responseData);

    const response = await api.get('/test');
    expect(response.data).toEqual(responseData);
  });

  it('should handle API errors', async () => {
    const errorMessage = 'Bad Request';
    mock.onGet('/test').reply(400, { message: errorMessage });

    try {
      await api.get('/test');
    } catch (error) {
      const formattedError = handleApiError(error as AxiosError);
      expect(formattedError).toBe(errorMessage);
    }
  });

  it('should handle network errors', async () => {
    mock.onGet('/test').networkError();

    try {
      await api.get('/test');
    } catch (error) {
      const formattedError = handleApiError(error as AxiosError);
      expect(formattedError).toBe('Network Error');
    }
  });
});

// Human tasks:
// TODO: Add tests for token refresh logic once implemented
// TODO: Add tests for specific error codes and messages once implemented
// TODO: Add tests for request retry logic if implemented