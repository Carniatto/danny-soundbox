import { Injectable, input, signal } from '@angular/core';
import { Dualsense, DualsenseHID, WebHIDProvider } from 'dualsense-ts';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private readonly _isConnected = signal(false);
  
  // Button state signals for all 16 buttons
  private readonly _isTrianglePressed = signal(false);
  private readonly _isCirclePressed = signal(false);
  private readonly _isSquarePressed = signal(false);
  private readonly _isCrossPressed = signal(false);
  private readonly _isL1Pressed = signal(false);
  private readonly _isR1Pressed = signal(false);
  private readonly _isL2Pressed = signal(false);
  private readonly _isR2Pressed = signal(false);
  private readonly _isDUpPressed = signal(false);
  private readonly _isDRightPressed = signal(false);
  private readonly _isDDownPressed = signal(false);
  private readonly _isDLeftPressed = signal(false);
  private readonly _isL3Pressed = signal(false);
  private readonly _isR3Pressed = signal(false);
  private readonly _isTouchpadPressed = signal(false);
  private readonly _isPSPressed = signal(false);

  // Enhanced input signals for analog data
  private readonly _leftStickPosition = signal({ x: 0, y: 0 });
  private readonly _rightStickPosition = signal({ x: 0, y: 0 });
  private readonly _leftTriggerPressure = signal(0);
  private readonly _rightTriggerPressure = signal(0);
  private readonly _touchpadPosition = signal({ x: 0, y: 0, active: false });
  private readonly _gyroscopeData = signal({ x: 0, y: 0, z: 0 });
  private readonly _accelerometerData = signal({ x: 0, y: 0, z: 0 });

  private controller: Dualsense | null = null;
  private dualSense: Dualsense | null = null;

  // Public signals for reactive state
  readonly isConnected = this._isConnected.asReadonly();
  readonly isTrianglePressed = this._isTrianglePressed.asReadonly();
  readonly isCirclePressed = this._isCirclePressed.asReadonly();
  readonly isSquarePressed = this._isSquarePressed.asReadonly();
  readonly isCrossPressed = this._isCrossPressed.asReadonly();
  readonly isL1Pressed = this._isL1Pressed.asReadonly();
  readonly isR1Pressed = this._isR1Pressed.asReadonly();
  readonly isL2Pressed = this._isL2Pressed.asReadonly();
  readonly isR2Pressed = this._isR2Pressed.asReadonly();
  readonly isDUpPressed = this._isDUpPressed.asReadonly();
  readonly isDRightPressed = this._isDRightPressed.asReadonly();
  readonly isDDownPressed = this._isDDownPressed.asReadonly();
  readonly isDLeftPressed = this._isDLeftPressed.asReadonly();
  readonly isL3Pressed = this._isL3Pressed.asReadonly();
  readonly isR3Pressed = this._isR3Pressed.asReadonly();
  readonly isTouchpadPressed = this._isTouchpadPressed.asReadonly();
  readonly isPSPressed = this._isPSPressed.asReadonly();

  // Enhanced input signals for analog data
  readonly leftStickPosition = this._leftStickPosition.asReadonly();
  readonly rightStickPosition = this._rightStickPosition.asReadonly();
  readonly leftTriggerPressure = this._leftTriggerPressure.asReadonly();
  readonly rightTriggerPressure = this._rightTriggerPressure.asReadonly();
  readonly touchpadPosition = this._touchpadPosition.asReadonly();
  readonly gyroscopeData = this._gyroscopeData.asReadonly();
  readonly accelerometerData = this._accelerometerData.asReadonly();

  async connect(): Promise<void> {
    try {
      if (!navigator.hid) {
        throw new Error('WebHID API not supported');
      }

      // Request access to HID devices (PS5 controller)
      const devices = await navigator.hid.requestDevice({
        filters: [
          {
            vendorId: 0x054c, // Sony
            productId: 0x0ce6, // DualSense
          },
        ]
      });

      if (devices.length === 0) {
        throw new Error('No device selected');
      }

      const device = devices[0];

      const webHIDProvider = new WebHIDProvider();
      webHIDProvider.attach(device);

      const dualSenseHID = new DualsenseHID(webHIDProvider, 30);

      this.controller = new Dualsense({hid: dualSenseHID});

      this.controller.connection.on('change', (input) => {
        this._isConnected.set(input.active);
      });
      
      // Set up listeners for all buttons using the correct dualsense-ts API
      this.controller.triangle.on('change', (input) => {
        this._isTrianglePressed.set(input.active);
      });
      
      this.controller.circle.on('change', (input) => {
        this._isCirclePressed.set(input.active);
      });
      
      this.controller.square.on('change', (input) => {
        this._isSquarePressed.set(input.active);
      });
      
      this.controller.cross.on('change', (input) => {
        this._isCrossPressed.set(input.active);
      });
      
      this.controller.left.bumper.on('change', (input) => {
        this._isL1Pressed.set(input.active);
      });
      
      this.controller.right.bumper.on('change', (input) => {
        this._isR1Pressed.set(input.active);
      });
      
      this.controller.left.trigger.on('change', (input) => {
        this._isL2Pressed.set(input.active);
      });
      
      this.controller.right.trigger.on('change', (input) => {
        this._isR2Pressed.set(input.active);
      });
      
      this.controller.dpad.up.on('change', (input) => {
        this._isDUpPressed.set(input.active);
      });
      
      this.controller.dpad.right.on('change', (input) => {
        this._isDRightPressed.set(input.active);
      });
      
      this.controller.dpad.down.on('change', (input) => {
        this._isDDownPressed.set(input.active);
      });
      
      this.controller.dpad.left.on('change', (input) => {
        this._isDLeftPressed.set(input.active);
      });
      
      this.controller.left.analog.button.on('change', (input) => {
        this._isL3Pressed.set(input.active);
      });
      
      this.controller.right.analog.button.on('change', (input) => {
        this._isR3Pressed.set(input.active);
      });
      
      this.controller.touchpad.on('change', (input) => {
        this._isTouchpadPressed.set(input.active);
      });
      
      this.controller.ps.on('change', (input) => {
        this._isPSPressed.set(input.active);
      });

      // Enhanced input listeners for analog data
      // Analog stick positions
      this.controller.left.analog.x.on('change', (input) => {
        const current = this._leftStickPosition();
        this._leftStickPosition.set({ ...current, x: input.state });
      });
      
      this.controller.left.analog.y.on('change', (input) => {
        const current = this._leftStickPosition();
        this._leftStickPosition.set({ ...current, y: input.state });
      });
      
      this.controller.right.analog.x.on('change', (input) => {
        const current = this._rightStickPosition();
        this._rightStickPosition.set({ ...current, x: input.state });
      });
      
      this.controller.right.analog.y.on('change', (input) => {
        const current = this._rightStickPosition();
        this._rightStickPosition.set({ ...current, y: input.state });
      });

      // Trigger pressure
      this.controller.left.trigger.on('change', (input) => {
        this._leftTriggerPressure.set(input.pressure);
      });
      
      this.controller.right.trigger.on('change', (input) => {
        this._rightTriggerPressure.set(input.pressure);
      });

      // Touchpad position - using the correct API from documentation
      this.controller.touchpad.left.x.on('change', (input) => {
        const current = this._touchpadPosition();
        this._touchpadPosition.set({ ...current, x: input.state });
      });
      
      this.controller.touchpad.left.y.on('change', (input) => {
        const current = this._touchpadPosition();
        this._touchpadPosition.set({ ...current, y: input.state });
      });
      
      this.controller.touchpad.left.contact.on('change', (input) => {
        const current = this._touchpadPosition();
        this._touchpadPosition.set({ ...current, active: input.active });
      });

      // Motion sensors - using the correct Axis properties
      this.controller.gyroscope.x.on('change', (input) => {
        const current = this._gyroscopeData();
        this._gyroscopeData.set({ ...current, x: input.state });
      });
      
      this.controller.gyroscope.y.on('change', (input) => {
        const current = this._gyroscopeData();
        this._gyroscopeData.set({ ...current, y: input.state });
      });
      
      this.controller.gyroscope.z.on('change', (input) => {
        const current = this._gyroscopeData();
        this._gyroscopeData.set({ ...current, z: input.state });
      });
      
      this.controller.accelerometer.x.on('change', (input) => {
        const current = this._accelerometerData();
        this._accelerometerData.set({ ...current, x: input.state });
      });
      
      this.controller.accelerometer.y.on('change', (input) => {
        const current = this._accelerometerData();
        this._accelerometerData.set({ ...current, y: input.state });
      });
      
      this.controller.accelerometer.z.on('change', (input) => {
        const current = this._accelerometerData();
        this._accelerometerData.set({ ...current, z: input.state });
      });

    } catch (error) {
      console.error('Failed to connect to controller:', error);
      this._isConnected.set(false);
      throw error;
    }
  }

  disconnect(): void {
    // if (this.dualSense) {
    //   this.dualSense.disconnect();
    //   this.dualSense = null;
    // }
    // this._isConnected.set(false);
    // this._isTrianglePressed.set(false);
  }

  private setupEventListeners(): void {
    if (!this.controller) return;

    // Listen for triangle button press using dualsense-ts
    this.controller.triangle.on('change', (input) => {
      this._isTrianglePressed.set(input.active);
    });
  }
}
