import { AccelerometerData } from '../data/types/sensor.types';
import { normalizeAccelerometer } from './sensor-normalization.util';

/**
 * Generates CSS transform string for 3D cube rotation based on accelerometer data
 * @param accel - Current accelerometer readings
 * @returns CSS transform string for cube rotation
 */
export function getCubeTransform(accel: AccelerometerData): string {
  // Normalize accelerometer values to -1 to +1 range
  const normalizedX = normalizeAccelerometer(accel.x);
  const normalizedY = normalizeAccelerometer(accel.y);
  const normalizedZ = normalizeAccelerometer(accel.z);
  
  // Map normalized values to rotation angles (±90 degrees)
  const rollX = normalizedX * 90;    // Left/Right roll
  const pitchY = normalizedY * 90;   // Forward/Back pitch
  const yawZ = normalizedZ * 90;     // Up/Down yaw
  
  // Apply smoothing and limits to prevent extreme rotations
  const smoothX = Math.max(-90, Math.min(90, rollX));
  const smoothY = Math.max(-90, Math.min(90, pitchY));
  const smoothZ = Math.max(-90, Math.min(90, yawZ));
  
  // Use CSS transform order: rotateZ (yaw) -> rotateX (roll) -> rotateY (pitch)
  // This order ensures proper 3D rotation without gimbal lock issues
  return `rotateZ(${smoothZ}deg) rotateX(${smoothX}deg) rotateY(${smoothY}deg)`;
}

/**
 * Generates a test transform for debugging cube rotation
 * @param rollX - X-axis rotation in degrees
 * @param rollY - Y-axis rotation in degrees
 * @param rollZ - Z-axis rotation in degrees
 * @returns CSS transform string for testing
 */
export function getTestTransform(rollX: number = 45, rollY: number = 45, rollZ: number = 45): string {
  return `rotateX(${rollX}deg) rotateY(${rollY}deg) rotateZ(${rollZ}deg)`;
}

/**
 * Resets cube to rest position (flat face up)
 * @returns CSS transform string for rest position
 */
export function getRestTransform(): string {
  return 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
}

/**
 * Calculates the intensity of rotation for visual feedback
 * @param accel - Current accelerometer readings
 * @returns Rotation intensity between 0 and 1
 */
export function getRotationIntensity(accel: AccelerometerData): number {
  const normalizedX = Math.abs(normalizeAccelerometer(accel.x));
  const normalizedY = Math.abs(normalizeAccelerometer(accel.y));
  const normalizedZ = Math.abs(normalizeAccelerometer(accel.z));
  
  // Return the maximum rotation intensity across all axes
  return Math.max(normalizedX, normalizedY, normalizedZ);
}
