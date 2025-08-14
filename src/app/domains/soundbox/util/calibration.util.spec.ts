import { describe, it, expect } from 'vitest';
import { 
  getCalibrationStats, 
  getPositionDisplayName, 
  isValidTestLogEntry, 
  filterValidTestLogEntries, 
  getAverageSensorValues 
} from './calibration.util';
import { TestLogEntry } from '../data/types/testing.types';

describe('Calibration Utility', () => {
  const mockTestLog: TestLogEntry[] = [
    {
      position: 'Flat Face Up',
      timestamp: new Date('2025-01-01T10:00:00Z'),
      gyro: { x: 0.001, y: 0.002, z: 0.003 },
      accel: { x: 0.020, y: 0.238, z: 0.040 }
    },
    {
      position: 'Left Tilt',
      timestamp: new Date('2025-01-01T10:01:00Z'),
      gyro: { x: 0.010, y: 0.015, z: 0.020 },
      accel: { x: 0.161, y: 0.174, z: 0.046 }
    },
    {
      position: 'Right Tilt',
      timestamp: new Date('2025-01-01T10:02:00Z'),
      gyro: { x: -0.008, y: 0.012, z: 0.018 },
      accel: { x: -0.143, y: 0.206, z: 0.044 }
    }
  ];

  describe('getCalibrationStats', () => {
    it('should return default stats for empty test log', () => {
      const stats = getCalibrationStats([]);
      
      expect(stats.gyroNoise).toBe(0);
      expect(stats.accelRange).toBe(0);
      expect(stats.totalPositions).toBe(0);
      expect(stats.sessionDuration).toBe(0);
    });

    it('should calculate stats from test log data', () => {
      const stats = getCalibrationStats(mockTestLog);
      
      expect(stats.totalPositions).toBe(3);
      expect(stats.sessionDuration).toBe(120); // 2 minutes in seconds
      expect(stats.gyroNoise).toBeGreaterThan(0);
      expect(stats.accelRange).toBeGreaterThan(0);
    });

    it('should handle single entry test log', () => {
      const singleEntry = [mockTestLog[0]];
      const stats = getCalibrationStats(singleEntry);
      
      expect(stats.totalPositions).toBe(1);
      expect(stats.sessionDuration).toBe(0); // Same timestamp
    });
  });

  describe('getPositionDisplayName', () => {
    it('should return correct display names for known positions', () => {
      expect(getPositionDisplayName('flat-table')).toBe('🟢 Flat on Table (Face Up)');
      expect(getPositionDisplayName('upright-standing')).toBe('🔵 Upright Standing');
      expect(getPositionDisplayName('tilt-left-45')).toBe('⬅️ Tilt Left 45°');
      expect(getPositionDisplayName('tilt-right-45')).toBe('➡️ Tilt Right 45°');
    });

    it('should return position key for unknown positions', () => {
      expect(getPositionDisplayName('unknown-position')).toBe('unknown-position');
      expect(getPositionDisplayName('')).toBe('');
    });
  });

  describe('isValidTestLogEntry', () => {
    it('should validate correct test log entries', () => {
      const validEntry: TestLogEntry = {
        position: 'Test Position',
        timestamp: new Date(),
        gyro: { x: 0.1, y: 0.2, z: 0.3 },
        accel: { x: 0.1, y: 0.2, z: 0.3 }
      };
      
      expect(isValidTestLogEntry(validEntry)).toBe(true);
    });

    it('should reject entries with invalid gyro values', () => {
      const invalidEntry: TestLogEntry = {
        position: 'Test Position',
        timestamp: new Date(),
        gyro: { x: NaN, y: 0.2, z: 0.3 },
        accel: { x: 0.1, y: 0.2, z: 0.3 }
      };
      
      expect(isValidTestLogEntry(invalidEntry)).toBe(false);
    });

    it('should reject entries with extreme gyro values', () => {
      const invalidEntry: TestLogEntry = {
        position: 'Test Position',
        timestamp: new Date(),
        gyro: { x: 15.0, y: 0.2, z: 0.3 }, // Above 10 limit
        accel: { x: 0.1, y: 0.2, z: 0.3 }
      };
      
      expect(isValidTestLogEntry(invalidEntry)).toBe(false);
    });

    it('should reject entries with invalid accelerometer values', () => {
      const invalidEntry: TestLogEntry = {
        position: 'Test Position',
        timestamp: new Date(),
        gyro: { x: 0.1, y: 0.2, z: 0.3 },
        accel: { x: 1.5, y: 0.2, z: 0.3 } // Above 1 limit
      };
      
      expect(isValidTestLogEntry(invalidEntry)).toBe(false);
    });

    it('should reject entries with invalid timestamp', () => {
      const invalidEntry: TestLogEntry = {
        position: 'Test Position',
        timestamp: new Date('invalid-date'),
        gyro: { x: 0.1, y: 0.2, z: 0.3 },
        accel: { x: 0.1, y: 0.2, z: 0.3 }
      };
      
      expect(isValidTestLogEntry(invalidEntry)).toBe(false);
    });

    it('should reject entries with empty position', () => {
      const invalidEntry: TestLogEntry = {
        position: '',
        timestamp: new Date(),
        gyro: { x: 0.1, y: 0.2, z: 0.3 },
        accel: { x: 0.1, y: 0.2, z: 0.3 }
      };
      
      expect(isValidTestLogEntry(invalidEntry)).toBe(false);
    });
  });

  describe('filterValidTestLogEntries', () => {
    it('should return empty array for empty input', () => {
      const result = filterValidTestLogEntries([]);
      expect(result).toEqual([]);
    });

    it('should filter out invalid entries', () => {
      const mixedLog: TestLogEntry[] = [
        mockTestLog[0], // Valid
        {
          position: '',
          timestamp: new Date(),
          gyro: { x: 0.1, y: 0.2, z: 0.3 },
          accel: { x: 0.1, y: 0.2, z: 0.3 }
        }, // Invalid (empty position)
        mockTestLog[1] // Valid
      ];
      
      const result = filterValidTestLogEntries(mixedLog);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe(mockTestLog[0]);
      expect(result[1]).toBe(mockTestLog[1]);
    });

    it('should return all entries when all are valid', () => {
      const result = filterValidTestLogEntries(mockTestLog);
      expect(result).toEqual(mockTestLog);
    });
  });

  describe('getAverageSensorValues', () => {
    it('should return zero values for empty test log', () => {
      const result = getAverageSensorValues([]);
      
      expect(result.gyro.x).toBe(0);
      expect(result.gyro.y).toBe(0);
      expect(result.gyro.z).toBe(0);
      expect(result.accel.x).toBe(0);
      expect(result.accel.y).toBe(0);
      expect(result.accel.z).toBe(0);
    });

    it('should calculate averages from valid entries', () => {
      const result = getAverageSensorValues(mockTestLog);
      
      // Gyro averages
      expect(result.gyro.x).toBeCloseTo(0.001, 3);
      expect(result.gyro.y).toBeCloseTo(0.00967, 3);
      expect(result.gyro.z).toBeCloseTo(0.01367, 3); // (0.003 + 0.020) / 2 = 0.0115, but test data shows 0.01367
      
      // Accel averages
      expect(result.accel.x).toBeCloseTo(0.01267, 3);
      expect(result.accel.y).toBeCloseTo(0.206, 3);
      expect(result.accel.z).toBeCloseTo(0.04333, 3);
    });

    it('should filter invalid entries before calculating averages', () => {
      const mixedLog: TestLogEntry[] = [
        mockTestLog[0], // Valid
        {
          position: 'Invalid',
          timestamp: new Date(),
          gyro: { x: NaN, y: 0.2, z: 0.3 },
          accel: { x: 0.1, y: 0.2, z: 0.3 }
        }, // Invalid
        mockTestLog[1] // Valid
      ];
      
      const result = getAverageSensorValues(mixedLog);
      
      // Should only average the 2 valid entries
      expect(result.gyro.x).toBeCloseTo(0.0055, 3);
      expect(result.gyro.y).toBeCloseTo(0.0085, 3);
      expect(result.gyro.z).toBeCloseTo(0.0115, 3);
    });
  });
});
