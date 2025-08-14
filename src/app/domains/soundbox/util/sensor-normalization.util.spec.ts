import { describe, it, expect } from 'vitest';
import { 
  normalizeAxis, 
  normalizeAccelerometer, 
  normalizeGyroscope, 
  normalizedToPercentage, 
  smoothSensorValue 
} from './sensor-normalization.util';

describe('Sensor Normalization Utility', () => {
  describe('normalizeAxis', () => {
    it('should normalize value from min-max range to -1 to +1', () => {
      // Test middle value
      expect(normalizeAxis(0, -10, 10)).toBe(0);
      
      // Test minimum value
      expect(normalizeAxis(-10, -10, 10)).toBe(-1);
      
      // Test maximum value
      expect(normalizeAxis(10, -10, 10)).toBe(1);
      
      // Test quarter values
      expect(normalizeAxis(-5, -10, 10)).toBe(-0.5);
      expect(normalizeAxis(5, -10, 10)).toBe(0.5);
    });

    it('should clamp values outside the range', () => {
      expect(normalizeAxis(-15, -10, 10)).toBe(-1); // Below min
      expect(normalizeAxis(15, -10, 10)).toBe(1);   // Above max
    });

    it('should handle asymmetric ranges', () => {
      // Range is -5 to 15 (20 units), so 0 should be at -0.5
      expect(normalizeAxis(0, -5, 15)).toBe(-0.5);
      expect(normalizeAxis(5, -5, 15)).toBe(0);
      expect(normalizeAxis(15, -5, 15)).toBe(1);
    });
  });

  describe('normalizeAccelerometer', () => {
    it('should normalize accelerometer values from ±0.25G to ±1', () => {
      expect(normalizeAccelerometer(0)).toBe(0);
      expect(normalizeAccelerometer(0.25)).toBe(1);
      expect(normalizeAccelerometer(-0.25)).toBe(-1);
      expect(normalizeAccelerometer(0.125)).toBe(0.5);
      expect(normalizeAccelerometer(-0.125)).toBe(-0.5);
    });

    it('should clamp accelerometer values outside ±0.25G range', () => {
      expect(normalizeAccelerometer(0.5)).toBe(1);
      expect(normalizeAccelerometer(-0.5)).toBe(-1);
    });
  });

  describe('normalizeGyroscope', () => {
    it('should normalize gyroscope values from ±1.0 to ±1', () => {
      expect(normalizeGyroscope(0)).toBe(0);
      expect(normalizeGyroscope(1.0)).toBe(1);
      expect(normalizeGyroscope(-1.0)).toBe(-1);
      expect(normalizeGyroscope(0.5)).toBe(0.5);
      expect(normalizeGyroscope(-0.5)).toBe(-0.5);
    });

    it('should clamp gyroscope values outside ±1.0 range', () => {
      expect(normalizeGyroscope(2.0)).toBe(1);
      expect(normalizeGyroscope(-2.0)).toBe(-1);
    });
  });

  describe('normalizedToPercentage', () => {
    it('should convert normalized values to percentages', () => {
      expect(normalizedToPercentage(0)).toBe(0);
      expect(normalizedToPercentage(1)).toBe(100);
      expect(normalizedToPercentage(-1)).toBe(100);
      expect(normalizedToPercentage(0.5)).toBe(50);
      expect(normalizedToPercentage(-0.5)).toBe(50);
    });

    it('should handle edge cases', () => {
      expect(normalizedToPercentage(0.001)).toBe(0.1);
      expect(normalizedToPercentage(0.999)).toBe(99.9);
    });
  });

  describe('smoothSensorValue', () => {
    it('should apply smoothing between current and previous values', () => {
      const current = 10;
      const previous = 5;
      
      // No smoothing (factor = 0)
      expect(smoothSensorValue(current, previous, 0)).toBe(10);
      
      // Full smoothing (factor = 1)
      expect(smoothSensorValue(current, previous, 1)).toBe(5);
      
      // Half smoothing (factor = 0.5)
      expect(smoothSensorValue(current, previous, 0.5)).toBe(7.5);
    });

    it('should clamp smoothing factor to 0-1 range', () => {
      const current = 10;
      const previous = 5;
      
      expect(smoothSensorValue(current, previous, -0.5)).toBe(10); // Clamped to 0
      expect(smoothSensorValue(current, previous, 1.5)).toBe(5);   // Clamped to 1
    });

    it('should handle edge cases', () => {
      expect(smoothSensorValue(0, 0, 0.5)).toBe(0);
      expect(smoothSensorValue(10, 10, 0.5)).toBe(10);
    });
  });
});
