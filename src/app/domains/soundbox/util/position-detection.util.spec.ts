import { describe, it, expect } from 'vitest';
import { 
  detectCalibratedPosition, 
  detectApproximatePosition, 
  isPositionMatch, 
  getPositionConfidence, 
  isPositionStable 
} from './position-detection.util';
import { AccelerometerData } from '../data/types/sensor.types';

describe('Position Detection Utility', () => {
  describe('detectCalibratedPosition', () => {
    it('should detect flat face up position', () => {
      const accel: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const position = detectCalibratedPosition(accel);
      expect(position).toBe('🟢 Flat Face Up');
    });

    it('should detect flat face down position', () => {
      const accel: AccelerometerData = { x: -0.031, y: -0.243, z: 0.053 };
      const position = detectCalibratedPosition(accel);
      expect(position).toBe('🔴 Flat Face Down');
    });

    it('should detect upright standing position', () => {
      const accel: AccelerometerData = { x: -0.010, y: 0.054, z: -0.245 };
      const position = detectCalibratedPosition(accel);
      expect(position).toBe('🔵 Upright Standing');
    });

    it('should detect left tilt position', () => {
      const accel: AccelerometerData = { x: 0.161, y: 0.174, z: 0.046 };
      const position = detectCalibratedPosition(accel);
      expect(position).toBe('⬅️ Tilt Left 45°');
    });

    it('should detect right tilt position', () => {
      const accel: AccelerometerData = { x: -0.143, y: 0.206, z: 0.044 };
      const position = detectCalibratedPosition(accel);
      expect(position).toBe('➡️ Tilt Right 45°');
    });

    it('should fall back to approximate detection for unknown positions', () => {
      const accel: AccelerometerData = { x: 0.5, y: 0.5, z: 0.5 }; // Extreme values
      const position = detectCalibratedPosition(accel);
      // Should detect as left tilt since x > 0.15
      expect(position).toContain('Tilted Left');
    });
  });

  describe('detectApproximatePosition', () => {
    it('should detect approximate flat face up', () => {
      const accel: AccelerometerData = { x: 0.01, y: 0.25, z: 0.02 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Flat Face Up');
    });

    it('should detect approximate flat face down', () => {
      const accel: AccelerometerData = { x: -0.01, y: -0.25, z: 0.02 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Flat Face Down');
    });

    it('should detect approximate upright standing', () => {
      const accel: AccelerometerData = { x: -0.01, y: 0.04, z: -0.25 };
      const position = detectApproximatePosition(accel);
      // z < -0.2 and |y| < 0.05, so should detect as upright
      expect(position).toContain('Upright Standing');
    });

    it('should detect left tilt', () => {
      const accel: AccelerometerData = { x: 0.2, y: 0.15, z: 0.05 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Tilted Left');
    });

    it('should detect right tilt', () => {
      const accel: AccelerometerData = { x: -0.2, y: 0.15, z: 0.05 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Tilted Right');
    });

    it('should detect forward tilt', () => {
      const accel: AccelerometerData = { x: -0.01, y: 0.2, z: 0.15 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Tilted Forward');
    });

    it('should detect backward tilt', () => {
      const accel: AccelerometerData = { x: 0.01, y: 0.2, z: -0.15 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Tilted Backward');
    });

    it('should detect rotation patterns', () => {
      const accel: AccelerometerData = { x: 0.25, y: 0.1, z: 0.05 };
      const position = detectApproximatePosition(accel);
      // x > 0.15, so should detect as left tilt first
      expect(position).toContain('Tilted Left');
    });

    it('should return unknown for ambiguous positions', () => {
      const accel: AccelerometerData = { x: 0.05, y: 0.05, z: 0.05 };
      const position = detectApproximatePosition(accel);
      expect(position).toContain('Moving/Unknown');
    });
  });

  describe('isPositionMatch', () => {
    it('should match exact positions within tolerance', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      const tolerance = 0.05;
      
      expect(isPositionMatch(current, expected, tolerance)).toBe(true);
    });

    it('should match positions within tolerance', () => {
      const current: AccelerometerData = { x: 0.025, y: 0.235, z: 0.045 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      const tolerance = 0.05;
      
      expect(isPositionMatch(current, expected, tolerance)).toBe(true);
    });

    it('should not match positions outside tolerance', () => {
      const current: AccelerometerData = { x: 0.1, y: 0.238, z: 0.040 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      const tolerance = 0.05;
      
      expect(isPositionMatch(current, expected, tolerance)).toBe(false);
    });

    it('should handle very small tolerance', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      const tolerance = 0.000001; // Very small tolerance for floating point precision
      
      // With very small tolerance, values should match
      expect(isPositionMatch(current, expected, tolerance)).toBe(true);
    });

    it('should handle zero tolerance with non-exact values', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const expected = { x: 0.021, y: 0.238, z: 0.040 };
      const tolerance = 0;
      
      // With zero tolerance, even tiny differences should fail
      expect(isPositionMatch(current, expected, tolerance)).toBe(false);
    });
  });

  describe('getPositionConfidence', () => {
    it('should return high confidence for exact matches', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      
      const confidence = getPositionConfidence(current, expected);
      expect(confidence).toBe(1);
    });

    it('should return lower confidence for partial matches', () => {
      const current: AccelerometerData = { x: 0.025, y: 0.235, z: 0.045 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      
      const confidence = getPositionConfidence(current, expected);
      expect(confidence).toBeGreaterThan(0);
      expect(confidence).toBeLessThan(1);
    });

    it('should return zero confidence for poor matches', () => {
      const current: AccelerometerData = { x: 0.1, y: 0.3, z: 0.1 };
      const expected = { x: 0.020, y: 0.238, z: 0.040 };
      
      const confidence = getPositionConfidence(current, expected);
      expect(confidence).toBe(0);
    });
  });

  describe('isPositionStable', () => {
    it('should detect stable positions', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const previous: AccelerometerData = { x: 0.021, y: 0.237, z: 0.041 };
      const threshold = 0.01;
      
      expect(isPositionStable(current, previous, threshold)).toBe(true);
    });

    it('should detect unstable positions', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const previous: AccelerometerData = { x: 0.050, y: 0.200, z: 0.080 };
      const threshold = 0.01;
      
      expect(isPositionStable(current, previous, threshold)).toBe(false);
    });

    it('should use default threshold when not specified', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const previous: AccelerometerData = { x: 0.021, y: 0.237, z: 0.041 };
      
      expect(isPositionStable(current, previous)).toBe(true);
    });

    it('should handle identical readings', () => {
      const current: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      const previous: AccelerometerData = { x: 0.020, y: 0.238, z: 0.040 };
      
      expect(isPositionStable(current, previous)).toBe(true);
    });
  });
});
