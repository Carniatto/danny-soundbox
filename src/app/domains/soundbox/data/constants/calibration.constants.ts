import { CalibratedPosition } from '../types/testing.types';

export const CALIBRATION_TOLERANCE = 0.05; // 0.05G tolerance for position detection

export const CALIBRATED_POSITIONS: CalibratedPosition[] = [
  {
    name: 'Flat Face Up',
    emoji: '🟢',
    expectedValues: { x: 0.020, y: 0.238, z: 0.040 },
    tolerance: 0.05,
    description: 'Controller lying flat on table, face up'
  },
  {
    name: 'Flat Face Down',
    emoji: '🔴',
    expectedValues: { x: -0.031, y: -0.243, z: 0.053 },
    tolerance: 0.05,
    description: 'Controller lying flat on table, face down'
  },
  {
    name: 'Upright Standing',
    emoji: '🔵',
    expectedValues: { x: -0.010, y: 0.054, z: -0.245 },
    tolerance: 0.05,
    description: 'Controller standing upright on its edge'
  },
  {
    name: 'Tilt Left 45°',
    emoji: '⬅️',
    expectedValues: { x: 0.161, y: 0.174, z: 0.046 },
    tolerance: 0.05,
    description: 'Controller tilted 45° to the left'
  },
  {
    name: 'Tilt Right 45°',
    emoji: '➡️',
    expectedValues: { x: -0.143, y: 0.206, z: 0.044 },
    tolerance: 0.05,
    description: 'Controller tilted 45° to the right'
  },
  {
    name: 'Tilt Forward 45°',
    emoji: '⬇️',
    expectedValues: { x: -0.020, y: 0.194, z: 0.145 },
    tolerance: 0.05,
    description: 'Controller tilted 45° forward'
  },
  {
    name: 'Tilt Backward 45°',
    emoji: '⬆️',
    expectedValues: { x: 0.011, y: 0.215, z: -0.132 },
    tolerance: 0.05,
    description: 'Controller tilted 45° backward'
  }
];

export const SENSOR_RANGES = {
  ACCELEROMETER: { min: -0.25, max: 0.25 },
  GYROSCOPE: { min: -1.0, max: 1.0 }
} as const;
