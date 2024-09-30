import { describe, expect, test, jest, beforeEach, afterEach } from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as api from '../../services/api';
import { API_BASE_URL } from '../../config/constants';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // Create a new instance of MockAdapter before each test
    mock = new MockAdapter(mockedAxios);
  });

  afterEach(() => {
    // Restore the original adapter after each test
    mock.restore();
  });

  test('createApiInstance creates an axios instance with correct configuration', () => {
    const instance = api.createApiInstance();
    expect(instance.defaults.baseURL).toBe(API_BASE_URL);
    expect(instance.defaults.timeout).toBe(10000); // Assuming a default timeout of 10 seconds
  });

  test('setAuthToken sets the Authorization header correctly', async () => {
    const token = 'test-token';
    api.setAuthToken(token);
    
    mock.onGet('/test').reply(200);
    await api.get('/test');

    expect(mock.history.get[0].headers?.Authorization).toBe(`Bearer ${token}`);
  });

  test('clearAuthToken removes the Authorization header', async () => {
    api.setAuthToken('test-token');
    api.clearAuthToken();
    
    mock.onGet('/test').reply(200);
    await api.get('/test');

    expect(mock.history.get[0].headers?.Authorization).toBeUndefined();
  });

  test('get method sends a GET request correctly', async () => {
    const responseData = { data: 'test' };
    mock.onGet('/test').reply(200, responseData);

    const result = await api.get('/test');
    expect(result).toEqual(responseData);
  });

  test('post method sends a POST request correctly', async () => {
    const requestData = { key: 'value' };
    const responseData = { success: true };
    mock.onPost('/test', requestData).reply(200, responseData);

    const result = await api.post('/test', requestData);
    expect(result).toEqual(responseData);
  });

  test('put method sends a PUT request correctly', async () => {
    const requestData = { key: 'updated' };
    const responseData = { success: true };
    mock.onPut('/test', requestData).reply(200, responseData);

    const result = await api.put('/test', requestData);
    expect(result).toEqual(responseData);
  });

  test('delete method sends a DELETE request correctly', async () => {
    const responseData = { success: true };
    mock.onDelete('/test').reply(200, responseData);

    const result = await api.delete('/test');
    expect(result).toEqual(responseData);
  });

  test('API calls handle errors correctly', async () => {
    const errorMessage = 'Network Error';
    mock.onGet('/test').networkError();

    await expect(api.get('/test')).rejects.toThrow(errorMessage);
  });
});

// Human tasks (commented as requested):
/*
TODO: Implement tests for request interceptors
TODO: Add tests for response interceptors
TODO: Create tests for multipart form data handling
TODO: Implement tests for retry logic once it's added to the API service
TODO: Add tests for request caching once implemented in the API service
*/