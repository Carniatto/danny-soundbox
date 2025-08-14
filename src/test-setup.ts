import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock dualsense-ts library before any imports
vi.mock('dualsense-ts', () => ({
  Dualsense: vi.fn().mockImplementation(() => ({
    connection: {
      on: vi.fn(),
    },
    left: {
      bumper: { on: vi.fn() },
      analog: { 
        x: { on: vi.fn() }, 
        y: { on: vi.fn() },
        button: { on: vi.fn() }
      },
      trigger: { on: vi.fn() },
    },
    right: {
      bumper: { on: vi.fn() },
      analog: { 
        x: { on: vi.fn() }, 
        y: { on: vi.fn() },
        button: { on: vi.fn() }
      },
      trigger: { on: vi.fn() },
    },
    cross: { on: vi.fn() },
    circle: { on: vi.fn() },
    square: { on: vi.fn() },
    triangle: { on: vi.fn() },
    dpad: {
      up: { on: vi.fn() },
      down: { on: vi.fn() },
      left: { on: vi.fn() },
      right: { on: vi.fn() },
    },
    touchpad: { 
      on: vi.fn(),
      left: {
        x: { on: vi.fn() },
        y: { on: vi.fn() },
        contact: { on: vi.fn() }
      }
    },
    ps: { on: vi.fn() },
    gyroscope: { x: { on: vi.fn() }, y: { on: vi.fn() }, z: { on: vi.fn() } },
    accelerometer: { x: { on: vi.fn() }, y: { on: vi.fn() }, z: { on: vi.fn() } },
  })),
  DualsenseHID: vi.fn().mockImplementation(() => ({})),
  WebHIDProvider: vi.fn().mockImplementation(() => ({
    attach: vi.fn(),
  })),
}));

// Mock Web APIs that might not be available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock WebHID API
Object.defineProperty(navigator, 'hid', {
  writable: true,
  value: {
    requestDevice: vi.fn().mockResolvedValue([]),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  },
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number);
global.cancelAnimationFrame = vi.fn((id: number) => clearTimeout(id));

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};
