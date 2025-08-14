import { describe, it, expect } from 'vitest';
import { 
  getCubeTransform, 
  getTestTransform, 
  getRestTransform, 
  getRotationIntensity 
} from './cube-transform.util';
import { AccelerometerData } from '../data/types/sensor.types';

describe('Cube Transform Utility', () => {
  describe('getCubeTransform', () => {
    it('should generate rest transform for flat face up position', () => {
      const accel: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const transform = getCubeTransform(accel);
      
      // Should be close to rest position (small rotations due to normalization)
      expect(transform).toContain('rotateZ(');
      expect(transform).toContain('rotateX(');
      expect(transform).toContain('rotateY(');
      expect(transform).toContain('deg)');
    });

    it('should generate left tilt transform', () => {
      const accel: AccelerometerData = { x: 0.161, y: 0.174, z: 0.046 };
      const transform = getCubeTransform(accel);
      
      // X-axis should show significant rotation for left tilt
      expect(transform).toContain('rotateX(');
      expect(transform).toContain('deg)');
    });

    it('should generate right tilt transform', () => {
      const accel: AccelerometerData = { x: -0.143, y: 0.206, z: 0.044 };
      const transform = getCubeTransform(accel);
      
      // X-axis should show significant rotation for right tilt
      expect(transform).toContain('rotateX(');
      expect(transform).toContain('deg)');
    });

    it('should generate forward tilt transform', () => {
      const accel: AccelerometerData = { x: -0.020, y: 0.194, z: 0.145 };
      const transform = getCubeTransform(accel);
      
      // Z-axis should show significant rotation for forward tilt
      expect(transform).toContain('rotateZ(');
      expect(transform).toContain('deg)');
    });

    it('should limit rotation angles to ±90 degrees', () => {
      const accel: AccelerometerData = { x: 0.5, y: 0.5, z: 0.5 }; // Extreme values
      const transform = getCubeTransform(accel);
      
      // Extract rotation values and check they're within limits
      const matches = transform.match(/rotate[XYZ]\(([^)]+)deg\)/g);
      expect(matches).toBeTruthy();
      
      matches?.forEach(match => {
        const value = parseFloat(match.match(/rotate[XYZ]\(([^)]+)deg\)/)?.[1] || '0');
        expect(value).toBeGreaterThanOrEqual(-90);
        expect(value).toBeLessThanOrEqual(90);
      });
    });

    it('should use correct transform order', () => {
      const accel: AccelerometerData = { x: 0.1, y: 0.1, z: 0.1 };
      const transform = getCubeTransform(accel);
      
      // Should follow order: rotateZ -> rotateX -> rotateY
      const zIndex = transform.indexOf('rotateZ');
      const xIndex = transform.indexOf('rotateX');
      const yIndex = transform.indexOf('rotateY');
      
      expect(zIndex).toBeLessThan(xIndex);
      expect(xIndex).toBeLessThan(yIndex);
    });
  });

  describe('getTestTransform', () => {
    it('should generate test transform with default values', () => {
      const transform = getTestTransform();
      expect(transform).toBe('rotateX(45deg) rotateY(45deg) rotateZ(45deg)');
    });

    it('should generate test transform with custom values', () => {
      const transform = getTestTransform(30, 60, 90);
      expect(transform).toBe('rotateX(30deg) rotateY(60deg) rotateZ(90deg)');
    });

    it('should handle zero rotations', () => {
      const transform = getTestTransform(0, 0, 0);
      expect(transform).toBe('rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
    });
  });

  describe('getRestTransform', () => {
    it('should return rest position transform', () => {
      const transform = getRestTransform();
      expect(transform).toBe('rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
    });
  });

  describe('getRotationIntensity', () => {
    it('should calculate rotation intensity from accelerometer data', () => {
      const accel: AccelerometerData = { x: 0.1, y: 0.2, z: 0.05 };
      const intensity = getRotationIntensity(accel);
      
      // Should return value between 0 and 1
      expect(intensity).toBeGreaterThanOrEqual(0);
      expect(intensity).toBeLessThanOrEqual(1);
    });

    it('should return maximum intensity across all axes', () => {
      const accel: AccelerometerData = { x: 0.1, y: 0.3, z: 0.05 };
      const intensity = getRotationIntensity(accel);
      
      // Y-axis has highest value (0.3), so intensity should be based on that
      expect(intensity).toBeGreaterThan(0.1);
    });

    it('should handle zero values', () => {
      const accel: AccelerometerData = { x: 0, y: 0, z: 0 };
      const intensity = getRotationIntensity(accel);
      expect(intensity).toBe(0);
    });

    it('should handle extreme values', () => {
      const accel: AccelerometerData = { x: 0.5, y: 0.5, z: 0.5 };
      const intensity = getRotationIntensity(accel);
      
      // Should be clamped to 1 due to normalization
      expect(intensity).toBe(1);
    });
  });
});
