import { AccelerometerData } from '../data/types/sensor.types';
import { CALIBRATED_POSITIONS, CALIBRATION_TOLERANCE } from '../data/constants/calibration.constants';

/**
 * Detects the current controller position based on calibrated accelerometer data
 * @param accel - Current accelerometer readings
 * @returns String describing the detected position with emoji
 */
export function detectCalibratedPosition(accel: AccelerometerData): string {
  // Check each calibrated position against current readings
  for (const position of CALIBRATED_POSITIONS) {
    if (isPositionMatch(accel, position.expectedValues, position.tolerance)) {
      return `${position.emoji} ${position.name}`;
    }
  }
  
  // If no exact match, try to detect approximate positions
  return detectApproximatePosition(accel);
}

/**
 * Detects approximate positions based on general patterns
 * @param accel - Current accelerometer readings
 * @returns String describing the approximate position
 */
export function detectApproximatePosition(accel: AccelerometerData): string {
  const tolerance = CALIBRATION_TOLERANCE;
  
  // Check for flat positions (Z-axis close to 0, Y-axis shows gravity)
  if (Math.abs(accel.z) < tolerance) {
    if (accel.y > 0.2) return '🟢 Flat Face Up (Approximate)';
    if (accel.y < -0.2) return '🔴 Flat Face Down (Approximate)';
  }
  
  // Check for upright position (Z-axis shows gravity, Y-axis close to 0)
  if (accel.z < -0.2 && Math.abs(accel.y) < tolerance) {
    return '🔵 Upright Standing (Approximate)';
  }
  
  // Check for left/right tilts
  if (Math.abs(accel.x) > 0.15) {
    return accel.x > 0 ? '⬅️ Tilted Left (~45°)' : '➡️ Tilted Right (~45°)';
  }
  
  // Check for forward/backward tilts
  if (Math.abs(accel.y) > 0.15) {
    if (accel.y > 0.15 && accel.z > 0.1) return '⬇️ Tilted Forward (~45°)';
    if (accel.y > 0.15 && accel.z < -0.1) return '⬆️ Tilted Backward (~45°)';
  }
  
  // Check for rotation patterns
  if (Math.abs(accel.x) > 0.2) {
    return accel.x > 0 ? '🔄 Rotated Counter-clockwise' : '🔄 Rotated Clockwise';
  }
  
  return '🔄 Moving/Unknown';
}

/**
 * Checks if current accelerometer readings match a calibrated position
 * @param current - Current accelerometer readings
 * @param expected - Expected values for the position
 * @param tolerance - Tolerance for matching
 * @returns True if position matches
 */
export function isPositionMatch(
  current: AccelerometerData, 
  expected: { x: number; y: number; z: number }, 
  tolerance: number
): boolean {
  return (
    Math.abs(current.x - expected.x) < tolerance &&
    Math.abs(current.y - expected.y) < tolerance &&
    Math.abs(current.z - expected.z) < tolerance
  );
}

/**
 * Calculates the confidence level of position detection
 * @param current - Current accelerometer readings
 * @param expected - Expected values for the position
 * @returns Confidence level between 0 and 1
 */
export function getPositionConfidence(
  current: AccelerometerData, 
  expected: { x: number; y: number; z: number }
): number {
  const maxDeviation = Math.max(
    Math.abs(current.x - expected.x),
    Math.abs(current.y - expected.y),
    Math.abs(current.z - expected.z)
  );
  
  // Higher deviation = lower confidence
  return Math.max(0, 1 - (maxDeviation / CALIBRATION_TOLERANCE));
}

/**
 * Detects if the controller is in a stable position (not moving)
 * @param accel - Current accelerometer readings
 * @param previousAccel - Previous accelerometer readings
 * @param stabilityThreshold - Threshold for considering position stable
 * @returns True if position is stable
 */
export function isPositionStable(
  accel: AccelerometerData, 
  previousAccel: AccelerometerData, 
  stabilityThreshold: number = 0.01
): boolean {
  const deltaX = Math.abs(accel.x - previousAccel.x);
  const deltaY = Math.abs(accel.y - previousAccel.y);
  const deltaZ = Math.abs(accel.z - previousAccel.z);
  
  return deltaX < stabilityThreshold && deltaY < stabilityThreshold && deltaZ < stabilityThreshold;
}
