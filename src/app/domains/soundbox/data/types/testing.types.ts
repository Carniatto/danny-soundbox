export interface TestLogEntry {
  position: string;
  timestamp: Date;
  gyro: {
    x: number;
    y: number;
    z: number;
  };
  accel: {
    x: number;
    y: number;
    z: number;
  };
}

export interface CalibrationStats {
  gyroNoise: number;
  accelRange: number;
  totalPositions: number;
  sessionDuration: number;
}

export interface CalibratedPosition {
  name: string;
  emoji: string;
  expectedValues: {
    x: number;
    y: number;
    z: number;
  };
  tolerance: number;
  description: string;
}
