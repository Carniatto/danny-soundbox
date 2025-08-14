import { TestLogEntry, CalibrationStats } from '../data/types/testing.types';

/**
 * Generates calibration statistics from test log data
 * @param testLog - Array of captured test positions
 * @returns Calibration statistics object
 */
export function getCalibrationStats(testLog: TestLogEntry[]): CalibrationStats {
  if (testLog.length === 0) {
    return {
      gyroNoise: 0,
      accelRange: 0,
      totalPositions: 0,
      sessionDuration: 0
    };
  }
  
  // Extract all sensor values
  const gyroValues = testLog.flatMap(entry => [entry.gyro.x, entry.gyro.y, entry.gyro.z]);
  const accelValues = testLog.flatMap(entry => [entry.accel.x, entry.accel.y, entry.accel.z]);
  
  // Calculate statistics
  const gyroNoise = Math.max(...gyroValues.map(Math.abs));
  const accelRange = Math.max(...accelValues.map(Math.abs));
  const totalPositions = testLog.length;
  
  // Calculate session duration
  const firstTimestamp = testLog[0].timestamp;
  const lastTimestamp = testLog[testLog.length - 1].timestamp;
  const sessionDuration = (lastTimestamp.getTime() - firstTimestamp.getTime()) / 1000; // in seconds
  
  return {
    gyroNoise,
    accelRange,
    totalPositions,
    sessionDuration
  };
}

/**
 * Gets the display name for a position based on its key
 * @param position - Position key from the testing system
 * @returns Human-readable position name with emoji
 */
export function getPositionDisplayName(position: string): string {
  const positionNames: { [key: string]: string } = {
    'flat-table': '🟢 Flat on Table (Face Up)',
    'flat-table-face-down': '🔴 Flat on Table (Face Down)',
    'upright-standing': '🔵 Upright Standing',
    'tilt-left-45': '⬅️ Tilt Left 45°',
    'tilt-right-45': '➡️ Tilt Right 45°',
    'tilt-forward-45': '⬇️ Tilt Forward 45°',
    'tilt-backward-45': '⬆️ Tilt Backward 45°',
    'rotate-clockwise-90': '🔄 Rotate Clockwise 90°',
    'rotate-counterclockwise-90': '🔄 Rotate Counter-clockwise 90°'
  };
  
  return positionNames[position] || position;
}

/**
 * Validates if a test log entry has valid sensor data
 * @param entry - Test log entry to validate
 * @returns True if entry has valid data
 */
export function isValidTestLogEntry(entry: TestLogEntry): boolean {
  // Check if all sensor values are numbers and within reasonable bounds
  const isValidGyro = [entry.gyro.x, entry.gyro.y, entry.gyro.z].every(
    value => typeof value === 'number' && !isNaN(value) && Math.abs(value) <= 10
  );
  
  const isValidAccel = [entry.accel.x, entry.accel.y, entry.accel.z].every(
    value => typeof value === 'number' && !isNaN(value) && Math.abs(value) <= 1
  );
  
  const isValidTimestamp = entry.timestamp instanceof Date && !isNaN(entry.timestamp.getTime());
  const isValidPosition = typeof entry.position === 'string' && entry.position.trim().length > 0;
  
  return isValidGyro && isValidAccel && isValidTimestamp && isValidPosition;
}

/**
 * Filters test log entries to only include valid data
 * @param testLog - Array of test log entries
 * @returns Filtered array with only valid entries
 */
export function filterValidTestLogEntries(testLog: TestLogEntry[]): TestLogEntry[] {
  return testLog.filter(isValidTestLogEntry);
}

/**
 * Calculates the average sensor values across all test log entries
 * @param testLog - Array of test log entries
 * @returns Average sensor values object
 */
export function getAverageSensorValues(testLog: TestLogEntry[]): {
  gyro: { x: number; y: number; z: number };
  accel: { x: number; y: number; z: number };
} {
  if (testLog.length === 0) {
    return {
      gyro: { x: 0, y: 0, z: 0 },
      accel: { x: 0, y: 0, z: 0 }
    };
  }
  
  const validEntries = filterValidTestLogEntries(testLog);
  
  const avgGyro = {
    x: validEntries.reduce((sum, entry) => sum + entry.gyro.x, 0) / validEntries.length,
    y: validEntries.reduce((sum, entry) => sum + entry.gyro.y, 0) / validEntries.length,
    z: validEntries.reduce((sum, entry) => sum + entry.gyro.z, 0) / validEntries.length
  };
  
  const avgAccel = {
    x: validEntries.reduce((sum, entry) => sum + entry.accel.x, 0) / validEntries.length,
    y: validEntries.reduce((sum, entry) => sum + entry.accel.y, 0) / validEntries.length,
    z: validEntries.reduce((sum, entry) => sum + entry.accel.z, 0) / validEntries.length
  };
  
  return { gyro: avgGyro, accel: avgAccel };
}
