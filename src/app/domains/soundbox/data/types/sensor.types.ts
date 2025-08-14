export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

export interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

export interface SensorData {
  accelerometer: AccelerometerData;
  gyroscope: GyroscopeData;
}

export interface StickPosition {
  x: number;
  y: number;
}

export interface TouchpadPosition {
  x: number;
  y: number;
  active: boolean;
}

export interface TriggerPressure {
  left: number;
  right: number;
}
