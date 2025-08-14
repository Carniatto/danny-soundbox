import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ControllerService } from './controller.service';

describe('ControllerService', () => {
  let service: ControllerService;

  beforeEach(() => {
    service = new ControllerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial connection status as disconnected', () => {
    expect(service.isConnected()).toBe(false);
  });

  it('should have initial button state as not pressed', () => {
    expect(service.isTrianglePressed()).toBe(false);
  });

  it('should request HID device when connect is called', async () => {
    // Mock navigator.hid
    const mockRequestDevice = vi.fn().mockResolvedValue([]);
    Object.defineProperty(navigator, 'hid', {
      value: { requestDevice: mockRequestDevice },
      writable: true,
    });

    try {
      await service.connect();
    } catch (error) {
      // Expected to fail since no device selected
    }
    
    expect(mockRequestDevice).toHaveBeenCalled();
  });

  it('should update connection status when device is connected', async () => {
    // Mock successful connection
    const mockDevice = {
      open: vi.fn().mockResolvedValue(undefined),
      addEventListener: vi.fn(),
    };
    
    const mockRequestDevice = vi.fn().mockResolvedValue([mockDevice]);
    Object.defineProperty(navigator, 'hid', {
      value: { requestDevice: mockRequestDevice },
      writable: true,
    });

    await service.connect();
    
    expect(service.isConnected()).toBe(true);
  });
});
