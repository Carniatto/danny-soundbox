import { SENSOR_RANGES } from '../data/constants/calibration.constants';

/**
 * Normalizes a sensor value from its raw range to a -1 to +1 range
 * @param value - The raw sensor value
 * @param min - The minimum expected value
 * @param max - The maximum expected value
 * @returns Normalized value between -1 and +1
 */
export function normalizeAxis(value: number, min: number, max: number): number {
  // Clamp value to range to prevent out-of-bounds values
  const clamped = Math.max(min, Math.min(max, value));
  
  // Normalize to -1 to +1 range
  return ((clamped - min) / (max - min)) * 2 - 1;
}

/**
 * Normalizes accelerometer values using the calibrated DualSense range
 * @param value - Raw accelerometer value (-0.25G to +0.25G)
 * @returns Normalized value between -1 and +1
 */
export function normalizeAccelerometer(value: number): number {
  return normalizeAxis(value, SENSOR_RANGES.ACCELEROMETER.min, SENSOR_RANGES.ACCELEROMETER.max);
}

/**
 * Normalizes gyroscope values using the calibrated DualSense range
 * @param value - Raw gyroscope value (-1.0 to +1.0)
 * @returns Normalized value between -1 and +1
 */
export function normalizeGyroscope(value: number): number {
  return normalizeAxis(value, SENSOR_RANGES.GYROSCOPE.min, SENSOR_RANGES.GYROSCOPE.max);
}

/**
 * Converts a normalized value to a percentage for UI display
 * @param normalizedValue - Value between -1 and +1
 * @returns Percentage between 0 and 100
 */
export function normalizedToPercentage(normalizedValue: number): number {
  return Math.abs(normalizedValue) * 100;
}

/**
 * Applies smoothing to sensor values to reduce noise
 * @param currentValue - Current sensor reading
 * @param previousValue - Previous sensor reading
 * @param smoothingFactor - Smoothing factor between 0 and 1 (0 = no smoothing, 1 = max smoothing)
 * @returns Smoothed value
 */
export function smoothSensorValue(currentValue: number, previousValue: number, smoothingFactor: number): number {
  const clampedFactor = Math.max(0, Math.min(1, smoothingFactor));
  return previousValue * clampedFactor + currentValue * (1 - clampedFactor);
}
