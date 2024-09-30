// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the global fetch function
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
}));

// Mock the localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock as any;

// Mock the sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.sessionStorage = sessionStorageMock as any;

// Suppress console.error and console.warn in tests
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock the ResizeObserver
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.ResizeObserver = ResizeObserverMock as any;

// Mock the IntersectionObserver
class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}
global.IntersectionObserver = IntersectionObserverMock as any;

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});