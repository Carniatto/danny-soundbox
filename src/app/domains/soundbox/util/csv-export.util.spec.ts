import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  generateCSV, 
  escapeCSVField, 
  generateCSVFilename, 
  validateCSVContent,
  exportTestLogToCSV 
} from './csv-export.util';
import { TestLogEntry } from '../data/types/testing.types';

// Mock DOM APIs for testing
const mockDownload = vi.fn();
const mockCreateObjectURL = vi.fn(() => 'mock-url');
const mockRevokeObjectURL = vi.fn();

Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL
  }
});

Object.defineProperty(document, 'createElement', {
  value: vi.fn(() => ({
    href: '',
    download: '',
    click: mockDownload
  }))
});

Object.defineProperty(document.body, 'appendChild', { value: vi.fn() });
Object.defineProperty(document.body, 'removeChild', { value: vi.fn() });

describe('CSV Export Utility', () => {
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
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    console.warn = vi.fn();
    console.log = vi.fn();
    console.error = vi.fn();
  });

  describe('generateCSV', () => {
    it('should return empty string for empty test log', () => {
      const result = generateCSV([]);
      expect(result).toBe('');
    });

    it('should generate CSV with headers and data', () => {
      const result = generateCSV(mockTestLog);
      
      expect(result).toContain('Position,Timestamp,Gyro_X,Gyro_Y,Gyro_Z,Accel_X,Accel_Y,Accel_Z');
      expect(result).toContain('Flat Face Up');
      expect(result).toContain('Left Tilt');
      expect(result).toContain('0.001000');
      expect(result).toContain('0.020000');
    });

    it('should format numbers to 6 decimal places', () => {
      const result = generateCSV(mockTestLog);
      
      expect(result).toContain('0.001000');
      expect(result).toContain('0.238000');
      expect(result).toContain('0.046000');
    });

    it('should handle multiple entries correctly', () => {
      const result = generateCSV(mockTestLog);
      const lines = result.split('\n');
      
      expect(lines).toHaveLength(3); // Headers + 2 data rows
      expect(lines[0]).toContain('Position,Timestamp');
      expect(lines[1]).toContain('Flat Face Up');
      expect(lines[2]).toContain('Left Tilt');
    });
  });

  describe('escapeCSVField', () => {
    it('should return field unchanged when no special characters', () => {
      expect(escapeCSVField('normal text')).toBe('normal text');
      expect(escapeCSVField('123')).toBe('123');
    });

    it('should escape fields containing commas', () => {
      expect(escapeCSVField('text,with,commas')).toBe('"text,with,commas"');
    });

    it('should escape fields containing quotes', () => {
      expect(escapeCSVField('text with "quotes"')).toBe('"text with ""quotes"""');
    });

    it('should escape fields containing newlines', () => {
      expect(escapeCSVField('text\nwith\nnewlines')).toBe('"text\nwith\nnewlines"');
    });

    it('should handle multiple special characters', () => {
      expect(escapeCSVField('text, with "quotes" and\nnewlines')).toBe('"text, with ""quotes"" and\nnewlines"');
    });
  });

  describe('generateCSVFilename', () => {
    it('should generate filename with default prefix', () => {
      const filename = generateCSVFilename();
      
      expect(filename).toMatch(/^dualsense-test-log-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.csv$/);
    });

    it('should generate filename with custom prefix', () => {
      const filename = generateCSVFilename('custom-prefix');
      
      expect(filename).toMatch(/^custom-prefix-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.csv$/);
    });

    it('should format timestamp correctly', () => {
      const filename = generateCSVFilename();
      const timestamp = filename.match(/\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/)?.[0];
      
      expect(timestamp).toBeTruthy();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/);
    });
  });

  describe('validateCSVContent', () => {
    it('should validate empty content as invalid', () => {
      expect(validateCSVContent('')).toBe(false);
      expect(validateCSVContent('   ')).toBe(false);
    });

    it('should validate CSV with headers only as invalid', () => {
      const csv = 'Position,Timestamp,Gyro_X,Gyro_Y,Gyro_Z,Accel_X,Accel_Y,Accel_Z';
      expect(validateCSVContent(csv)).toBe(false);
    });

    it('should validate valid CSV content', () => {
      const csv = `Position,Timestamp,Gyro_X,Gyro_Y,Gyro_Z,Accel_X,Accel_Y,Accel_Z
Flat Face Up,2025-01-01T10:00:00.000Z,0.001000,0.002000,0.003000,0.020000,0.238000,0.040000`;
      
      expect(validateCSVContent(csv)).toBe(true);
    });

    it('should reject CSV with mismatched column counts', () => {
      const csv = `Position,Timestamp,Gyro_X
Flat Face Up,2025-01-01T10:00:00.000Z,0.001000,0.002000`; // Headers: 3, Data: 4
      
      expect(validateCSVContent(csv)).toBe(false);
    });

    it('should handle CSV with quoted fields', () => {
      const csv = `Position,Timestamp,Gyro_X
"Flat Face Up",2025-01-01T10:00:00.000Z,0.001000`;
      
      // Headers: 3 columns, Data: 3 columns (quoted field without comma)
      expect(validateCSVContent(csv)).toBe(true);
    });

    it('should handle CSV with fields containing commas in quotes', () => {
      const csv = `Position,Timestamp,Gyro_X
"Flat, Face Up",2025-01-01T10:00:00.000Z,0.001000`;
      
      // Note: Simple split(',') doesn't handle quoted commas correctly
      // This is a limitation of the current implementation
      expect(validateCSVContent(csv)).toBe(false);
    });
  });

  describe('exportTestLogToCSV', () => {
    it('should warn and not export empty test log', () => {
      exportTestLogToCSV([]);
      
      expect(console.warn).toHaveBeenCalledWith('No test log data to export');
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
    });

    it('should export test log with default filename', () => {
      exportTestLogToCSV(mockTestLog);
      
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockDownload).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('exported successfully'));
    });

    it('should export test log with custom filename', () => {
      exportTestLogToCSV(mockTestLog, 'custom-filename.csv');
      
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockDownload).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('custom-filename.csv'));
    });

    it('should handle export errors gracefully', () => {
      mockCreateObjectURL.mockImplementationOnce(() => {
        throw new Error('Mock error');
      });
      
      expect(() => exportTestLogToCSV(mockTestLog)).toThrow('CSV export failed');
      expect(console.error).toHaveBeenCalledWith('Failed to export test log:', expect.any(Error));
    });

    it('should clean up resources after export', () => {
      exportTestLogToCSV(mockTestLog);
      
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('mock-url');
    });
  });
});
