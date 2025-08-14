import { Component, inject } from '@angular/core';
import { ControllerService } from '../data/controller.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-controller-test',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  template: `
    <div class="controller-test-container">
      <h2>Controller Test Panel</h2>
      
      <!-- Connection Section -->
      <div class="connection-section">
        <button 
          data-testid="connect-button"
          (click)="connectController()"
          [disabled]="controllerService.isConnected()">
          Connect Controller
        </button>
        
        <div data-testid="connection-status" class="connection-status">
          Status: {{ controllerService.isConnected() ? 'Connected' : 'Disconnected' }}
        </div>
      </div>

      <!-- Controller Button Grid -->
      <div class="button-grid">
        <!-- Face Buttons -->
        <button data-testid="triangle-button" 
                class="controller-button face-button triangle"
                [class.pressed]="controllerService.isTrianglePressed()">
          Triangle
        </button>
        <button data-testid="circle-button" 
                class="controller-button face-button circle"
                [class.pressed]="controllerService.isCirclePressed()">
          Circle
        </button>
        <button data-testid="square-button" 
                class="controller-button face-button square"
                [class.pressed]="controllerService.isSquarePressed()">
          Square
        </button>
        <button data-testid="cross-button" 
                class="controller-button face-button cross"
                [class.pressed]="controllerService.isCrossPressed()">
          Cross
        </button>

        <!-- Shoulder Buttons -->
        <button data-testid="l1-button" 
                class="controller-button shoulder-button l1"
                [class.pressed]="controllerService.isL1Pressed()">
          L1
        </button>
        <button data-testid="r1-button" 
                class="controller-button shoulder-button r1"
                [class.pressed]="controllerService.isR1Pressed()">
          R1
        </button>
        <button data-testid="l2-button" 
                class="controller-button shoulder-button l2"
                [class.pressed]="controllerService.isL2Pressed()">
          L2
        </button>
        <button data-testid="r2-button" 
                class="controller-button shoulder-button r2"
                [class.pressed]="controllerService.isR2Pressed()">
          R2
        </button>

        <!-- D-Pad -->
        <button data-testid="d-up-button" 
                class="controller-button dpad-button d-up"
                [class.pressed]="controllerService.isDUpPressed()">
          D-Up
        </button>
        <button data-testid="d-right-button" 
                class="controller-button dpad-button d-right"
                [class.pressed]="controllerService.isDRightPressed()">
          D-Right
        </button>
        <button data-testid="d-down-button" 
                class="controller-button dpad-button d-down"
                [class.pressed]="controllerService.isDDownPressed()">
          D-Down
        </button>
        <button data-testid="d-left-button" 
                class="controller-button dpad-button d-left"
                [class.pressed]="controllerService.isDLeftPressed()">
          D-Left
        </button>

        <!-- Analog Sticks & Special -->
        <button data-testid="l3-button" 
                class="controller-button analog-button l3"
                [class.pressed]="controllerService.isL3Pressed()">
          L3
        </button>
        <button data-testid="r3-button" 
                class="controller-button analog-button r3"
                [class.pressed]="controllerService.isR3Pressed()">
          R3
        </button>
        <button data-testid="touchpad-button" 
                class="controller-button special-button touchpad"
                [class.pressed]="controllerService.isTouchpadPressed()">
          Touchpad
        </button>
        <button data-testid="ps-button" 
                class="controller-button special-button ps"
                [class.pressed]="controllerService.isPSPressed()">
          PS
        </button>
      </div>

      <!-- Enhanced Input Visualizations -->
      <div class="enhanced-inputs">
        <!-- Analog Sticks -->
        <div class="input-section">
          <h3>Analog Sticks</h3>
          <div class="analog-sticks">
            <div class="analog-stick">
              <h4>Left Stick (L3)</h4>
              <div class="stick-visualization">
                <div class="stick-base">
                  <div class="stick-position" 
                       [style.left]="getStickPositionX(controllerService.leftStickPosition())"
                       [style.top]="getStickPositionY(controllerService.leftStickPosition())">
                  </div>
                </div>
                <div class="stick-coordinates">
                  X: {{ controllerService.leftStickPosition().x.toFixed(2) }} | 
                  Y: {{ controllerService.leftStickPosition().y.toFixed(2) }}
                </div>
              </div>
            </div>
            
            <div class="analog-stick">
              <h4>Right Stick (R3)</h4>
              <div class="stick-visualization">
                <div class="stick-base">
                  <div class="stick-position" 
                       [style.left]="getStickPositionX(controllerService.rightStickPosition())"
                       [style.top]="getStickPositionY(controllerService.rightStickPosition())">
                  </div>
                </div>
                <div class="stick-coordinates">
                  X: {{ controllerService.rightStickPosition().x.toFixed(2) }} | 
                  Y: {{ controllerService.rightStickPosition().y.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trigger Pressure -->
        <div class="input-section">
          <h3>Trigger Pressure</h3>
          <div class="triggers">
            <div class="trigger">
              <h4>Left Trigger (L2)</h4>
              <div class="pressure-bar">
                <div class="pressure-fill" 
                     [style.width]="(controllerService.leftTriggerPressure() * 100) + '%'">
                </div>
              </div>
              <div class="pressure-value">{{ (controllerService.leftTriggerPressure() * 100).toFixed(0) }}%</div>
            </div>
            
            <div class="trigger">
              <h4>Right Trigger (R2)</h4>
              <div class="pressure-bar">
                <div class="pressure-fill" 
                     [style.width]="(controllerService.rightTriggerPressure() * 100) + '%'">
                </div>
              </div>
              <div class="pressure-value">{{ (controllerService.rightTriggerPressure() * 100).toFixed(0) }}%</div>
            </div>
          </div>
        </div>

        <!-- Touchpad -->
        <div class="input-section">
          <h3>Touchpad</h3>
          <div class="touchpad-visualization">
            <div class="touchpad-base" 
                 [class.active]="controllerService.touchpadPosition().active">
              <div class="touch-point" 
                   [style.left]="getTouchpadPositionX(controllerService.touchpadPosition())"
                   [style.top]="getTouchpadPositionY(controllerService.touchpadPosition())"
                   [class.visible]="controllerService.touchpadPosition().active">
              </div>
            </div>
            <div class="touchpad-info">
              <div>Active: {{ controllerService.touchpadPosition().active ? 'Yes' : 'No' }}</div>
              <div>X: {{ controllerService.touchpadPosition().x.toFixed(2) }} | 
                   Y: {{ controllerService.touchpadPosition().y.toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- Motion Sensors -->
        <div class="input-section">
          <h3>Motion Sensors</h3>
          
          <!-- Controller Testing System -->
          <div class="testing-system">
            <h4>Controller Position Testing</h4>
            
            <!-- Calibration Summary -->
            <div class="calibration-summary">
              <h5>📊 Calibration Insights</h5>
              <div class="calibration-grid">
                <div class="calibration-item">
                  <strong>Gyroscope:</strong> Excellent baseline stability (±0.05 noise)
                </div>
                <div class="calibration-item">
                  <strong>Accelerometer:</strong> Gravity range ±0.25G, dead zone ±0.05
                </div>
                <div class="calibration-item">
                  <strong>Position Detection:</strong> Active with calibrated thresholds
                </div>
                <div class="calibration-item">
                  <strong>Cube Sensitivity:</strong> 200° per unit (calibrated)
                </div>
              </div>
            </div>
            <div class="test-controls">
              <div class="position-selector">
                <label for="position-select">Test Position:</label>
                <select id="position-select" [(ngModel)]="selectedPosition">
                  <option value="flat-table">🟢 Flat on Table (Face Up)</option>
                  <option value="flat-table-face-down">🔴 Flat on Table (Face Down)</option>
                  <option value="upright-standing">🔵 Upright Standing</option>
                  <option value="tilt-left-45">⬅️ Tilt Left 45°</option>
                  <option value="tilt-right-45">➡️ Tilt Right 45°</option>
                  <option value="tilt-forward-45">⬇️ Tilt Forward 45°</option>
                  <option value="tilt-backward-45">⬆️ Tilt Backward 45°</option>
                  <option value="rotate-clockwise-90">🔄 Rotate Clockwise 90°</option>
                  <option value="rotate-counterclockwise-90">🔄 Rotate Counter-clockwise 90°</option>
                  <option value="custom">✏️ Custom Position</option>
                </select>
              </div>
              
              <div class="custom-position" *ngIf="selectedPosition === 'custom'">
                <input type="text" [(ngModel)]="customPositionName" 
                       placeholder="Describe the position (e.g., 'Held at 30° angle')"
                       class="custom-input">
              </div>
              
              <div class="current-values">
                <div class="value-display">
                  <strong>Current Gyro:</strong> X={{ controllerService.gyroscopeData().x.toFixed(3) }} Y={{ controllerService.gyroscopeData().y.toFixed(3) }} Z={{ controllerService.gyroscopeData().z.toFixed(3) }}
                </div>
                <div class="value-display">
                  <strong>Current Accel:</strong> X={{ controllerService.accelerometerData().x.toFixed(3) }} Y={{ controllerService.accelerometerData().y.toFixed(3) }} Z={{ controllerService.accelerometerData().z.toFixed(3) }}
                </div>
                <div class="position-display">
                  <strong>Detected Position:</strong> {{ detectPosition() }}
                </div>
              </div>
              
              <div class="capture-controls">
                <button class="capture-btn" (click)="capturePosition()" 
                        [disabled]="!controllerService.isConnected()">
                  📸 Capture Position
                </button>
                <button class="export-btn" (click)="exportTestLog()" 
                        [disabled]="testLog.length === 0">
                  📊 Export Test Log
                </button>
                <button class="clear-btn" (click)="clearTestLog()" 
                        [disabled]="testLog.length === 0">
                  🗑️ Clear Log
                </button>
              </div>
            </div>
            
            <div class="test-log" *ngIf="testLog.length > 0">
              <h5>Test Log ({{ testLog.length }} positions captured)</h5>
              <div class="calibration-stats">
                <strong>Session Stats:</strong> {{ getCalibrationStats() }}
              </div>
              <div class="log-entries">
                <div class="log-entry" *ngFor="let entry of testLog; let i = index">
                  <div class="entry-header">
                    <span class="entry-number">#{{ i + 1 }}</span>
                    <span class="entry-position">{{ entry.position }}</span>
                    <span class="entry-timestamp">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
                  </div>
                  <div class="entry-values">
                    <span class="value">Gyro: X={{ entry.gyro.x.toFixed(3) }} Y={{ entry.gyro.y.toFixed(3) }} Z={{ entry.gyro.z.toFixed(3) }}</span>
                    <span class="value">Accel: X={{ entry.accel.x.toFixed(3) }} Y={{ entry.accel.y.toFixed(3) }} Z={{ entry.accel.z.toFixed(3) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="motion-sensors">
            <div class="sensor">
              <h4>Controller Position Cube</h4>
              
              <div class="cube-container">
                <div class="cube" 
                     [style.transform]="getCubeTransform()">
                  <div class="face front">Front</div>
                  <div class="face back">Back</div>
                  <div class="face right">Right</div>
                  <div class="face left">Left</div>
                  <div class="face top">Top</div>
                  <div class="face bottom">Bottom</div>
                </div>
              </div>
              
              <div class="sensor-values">
                <div class="sensor-row">
                  <strong>Gyroscope:</strong> X: {{ controllerService.gyroscopeData().x.toFixed(3) }} | 
                  Y: {{ controllerService.gyroscopeData().y.toFixed(3) }} | 
                  Z: {{ controllerService.gyroscopeData().z.toFixed(3) }}
                </div>
                <div class="sensor-row">
                  <strong>Accelerometer:</strong> X: {{ controllerService.accelerometerData().x.toFixed(3) }} | 
                  Y: {{ controllerService.accelerometerData().y.toFixed(3) }} | 
                  Z: {{ controllerService.accelerometerData().z.toFixed(3) }}
                </div>
                <div class="sensor-row rest-position">
                  <strong>Calibrated Rest:</strong> X: +0.020 | Y: +0.238 | Z: +0.040 (Front face visible)
                </div>
                <div class="sensor-row current-position">
                  <strong>Current Position:</strong> {{ detectCalibratedPosition() }}
                </div>
              </div>
              
              <div class="debug-transform">
                <strong>Current Transform:</strong> {{ getCubeTransform() }}
              </div>
              
              <div class="debug-info">
                <small><strong>Calibration-Based:</strong> Uses real DualSense data for accurate mapping</small><br>
                <small><strong>Rest Position:</strong> Y=+0.238, X=+0.020, Z=+0.040 = Front face visible</small><br>
                <small><strong>Range:</strong> ±0.25G maps to ±90° rotation with real-world calibration</small>
              </div>
              
              <div class="calibration-positions">
                <h5>Calibrated Positions:</h5>
                <div class="position-grid">
                  <div class="position-item">🟢 <strong>Flat Up:</strong> Y=0.238</div>
                  <div class="position-item">🔴 <strong>Flat Down:</strong> Y=-0.243</div>
                  <div class="position-item">🔵 <strong>Upright:</strong> Z=-0.245</div>
                  <div class="position-item">⬅️ <strong>Left 45°:</strong> X=0.161</div>
                  <div class="position-item">➡️ <strong>Right 45°:</strong> X=-0.143</div>
                  <div class="position-item">⬇️ <strong>Forward 45°:</strong> Z=0.145</div>
                  <div class="position-item">⬆️ <strong>Backward 45°:</strong> Z=-0.132</div>
                </div>
              </div>
              
              <button class="test-cube-btn" (click)="testCubeRotation()">
                Test Cube Rotation
              </button>
            </div>
            
            <div class="sensor">
              <h4>Accelerometer</h4>
              <div class="accelerometer-display">
                <div class="accel-axis">
                  <span>X:</span>
                  <div class="accel-bar" [class.positive]="controllerService.accelerometerData().x > 0"
                                       [class.negative]="controllerService.accelerometerData().x < 0">
                    <div class="accel-fill" 
                         [style.width]="getAccelerometerBarWidth(controllerService.accelerometerData().x) + '%'">
                    </div>
                  </div>
                </div>
                <div class="accel-axis">
                  <span>Y:</span>
                  <div class="accel-bar" [class.positive]="controllerService.accelerometerData().y > 0"
                                       [class.negative]="controllerService.accelerometerData().y < 0">
                    <div class="accel-fill" 
                         [style.width]="getAccelerometerBarWidth(controllerService.accelerometerData().y) + '%'">
                    </div>
                  </div>
                </div>
                <div class="accel-axis">
                  <span>Z:</span>
                  <div class="accel-bar" [class.positive]="controllerService.accelerometerData().z > 0"
                                       [class.negative]="controllerService.accelerometerData().z < 0">
                    <div class="accel-fill" 
                         [style.width]="getAccelerometerBarWidth(controllerService.accelerometerData().z) + '%'">
                    </div>
                  </div>
                </div>
              </div>
              <div class="sensor-values">
                X: {{ controllerService.accelerometerData().x.toFixed(2) }} | 
                Y: {{ controllerService.accelerometerData().y.toFixed(2) }} | 
                Z: {{ controllerService.accelerometerData().z.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .controller-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }

    .connection-section {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    button[data-testid="connect-button"] {
      padding: 12px 24px;
      font-size: 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 10px;
    }

    button[data-testid="connect-button"]:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .connection-status {
      font-weight: bold;
      color: #666;
    }

    .button-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      max-width: 600px;
      margin: 0 auto;
    }

    .controller-button {
      padding: 20px 15px;
      font-size: 14px;
      font-weight: bold;
      border: 2px solid #ddd;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .controller-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .controller-button:active {
      transform: translateY(0);
    }

    /* Pressed state styling */
    .controller-button.pressed {
      background: #28a745 !important;
      color: white !important;
      border-color: #1e7e34 !important;
      transform: translateY(2px);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    }

    /* Button Type Styles */
    .face-button {
      background: #e9ecef;
      border-color: #adb5bd;
    }

    .shoulder-button {
      background: #f8f9fa;
      border-color: #ced4da;
    }

    .dpad-button {
      background: #fff3cd;
      border-color: #ffeaa7;
    }

    .analog-button {
      background: #d1ecf1;
      border-color: #bee5eb;
    }

    .special-button {
      background: #f8d7da;
      border-color: #f5c6cb;
    }

    /* Specific Button Colors */
    .triangle { color: #28a745; }
    .circle { color: #dc3545; }
    .square { color: #007bff; }
    .cross { color: #ffc107; }

    /* Enhanced Input Visualizations */
    .enhanced-inputs {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .input-section {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #dee2e6;
    }

    .input-section h3 {
      margin: 0 0 20px 0;
      color: #495057;
      text-align: center;
      font-size: 18px;
    }

    .input-section h4 {
      margin: 0 0 15px 0;
      color: #6c757d;
      font-size: 14px;
      text-align: center;
    }

    /* Analog Sticks */
    .analog-sticks {
      display: flex;
      gap: 40px;
      justify-content: center;
    }

    .analog-stick {
      text-align: center;
    }

    .stick-visualization {
      margin-bottom: 15px;
    }

    .stick-base {
      width: 120px;
      height: 120px;
      border: 3px solid #6c757d;
      border-radius: 50%;
      background: #e9ecef;
      position: relative;
      margin: 0 auto 10px;
    }

    .stick-position {
      width: 20px;
      height: 20px;
      background: #dc3545;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.1s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .stick-coordinates {
      font-family: monospace;
      font-size: 12px;
      color: #495057;
    }

    /* Triggers */
    .triggers {
      display: flex;
      gap: 40px;
      justify-content: center;
    }

    .trigger {
      text-align: center;
    }

    .pressure-bar {
      width: 200px;
      height: 20px;
      background: #e9ecef;
      border: 2px solid #6c757d;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 auto 10px;
    }

    .pressure-fill {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #20c997);
      transition: width 0.1s ease;
    }

    .pressure-value {
      font-family: monospace;
      font-size: 14px;
      color: #495057;
      font-weight: bold;
    }

    /* Touchpad */
    .touchpad-visualization {
      text-align: center;
    }

    .touchpad-base {
      width: 200px;
      height: 120px;
      border: 3px solid #6c757d;
      border-radius: 8px;
      background: #e9ecef;
      position: relative;
      margin: 0 auto 15px;
      transition: all 0.2s ease;
    }

    .touchpad-base.active {
      background: #d4edda;
      border-color: #28a745;
    }

    .touch-point {
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #dc3545 0%, #c82333 100%);
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: all 0.1s ease;
      opacity: 0;
      box-shadow: 0 2px 8px rgba(220, 53, 69, 0.6);
      border: 2px solid #fff;
    }

    .touch-point.visible {
      opacity: 1;
    }

    .touchpad-info {
      font-family: monospace;
      font-size: 12px;
      color: #495057;
    }

    /* Motion Sensors */
    .motion-sensors {
      display: flex;
      gap: 40px;
      justify-content: center;
    }

    .sensor {
      text-align: center;
    }



    .sensor-row {
      margin: 4px 0;
      font-family: monospace;
      font-size: 13px;
      color: #495057;
    }

    .rest-position {
      background: #e8f5e8;
      padding: 4px 8px;
      border-radius: 4px;
      border-left: 3px solid #28a745;
      color: #155724;
      font-weight: 500;
    }

    .current-position {
      background: #e3f2fd;
      padding: 4px 8px;
      border-radius: 4px;
      border-left: 3px solid #2196f3;
      color: #0d47a1;
      font-weight: 500;
    }

    .calibration-positions {
      margin-top: 15px;
      padding: 12px;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
    }

    .calibration-positions h5 {
      margin: 0 0 10px 0;
      font-size: 14px;
      color: #495057;
      text-align: center;
    }

    .position-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 8px;
    }

    .position-item {
      font-size: 12px;
      color: #495057;
      padding: 4px 8px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e9ecef;
      text-align: center;
    }

    .sensor-values {
      font-family: monospace;
      font-size: 12px;
      color: #495057;
      margin-top: 10px;
    }

    .debug-transform {
      font-family: monospace;
      font-size: 10px;
      color: #6c757d;
      margin-top: 5px;
      word-break: break-all;
    }

    .debug-info {
      font-size: 11px;
      color: #888;
      margin-top: 8px;
      padding: 8px;
      background: #f8f8f8;
      border-radius: 4px;
      border-left: 3px solid #007bff;
    }

    .test-cube-btn {
      margin-top: 10px;
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .test-cube-btn:hover {
      background: #0056b3;
    }

    /* 3D Cube for Gyroscope */
    .cube-container {
      width: 100px;
      height: 100px;
      margin: 0 auto 15px;
      perspective: 300px;
      /* Add debugging border */
      border: 2px dashed #ffc107;
      padding: 10px;
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.3s ease;
      /* Start with front face visible (rest position) */
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }

    .face {
      position: absolute;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: white;
      border: 2px solid rgba(255,255,255,0.5);
      backface-visibility: visible;
      /* Ensure faces are properly positioned */
      box-sizing: border-box;
    }

    .front { background: #dc3545; transform: translateZ(50px); }
    .back { background: #6f42c1; transform: translateZ(-50px) rotateY(180deg); }
    .right { background: #fd7e14; transform: translateX(50px) rotateY(90deg); }
    .left { background: #20c997; transform: translateX(-50px) rotateY(-90deg); }
    .top { background: #007bff; transform: translateY(-50px) rotateX(90deg); }
    .bottom { background: #6c757d; transform: translateY(50px) rotateX(-90deg); }

    /* Accelerometer Bars */
    .accelerometer-display {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 10px;
    }

    .accel-axis {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .accel-axis span {
      width: 20px;
      font-family: monospace;
      font-size: 12px;
      color: #495057;
    }

    .accel-bar {
      flex: 1;
      height: 12px;
      background: #e9ecef;
      border: 1px solid #6c757d;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
    }

    .accel-bar.positive .accel-fill {
      background: #28a745;
    }

    .accel-bar.negative .accel-fill {
      background: #dc3545;
    }

    .accel-fill {
      height: 100%;
      background: #6c757d;
      transition: width 0.1s ease;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    /* Testing System Styles */
    .testing-system {
      background: #f8f9fa;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .testing-system h4 {
      margin-top: 0;
      color: #495057;
      border-bottom: 2px solid #007bff;
      padding-bottom: 8px;
    }

    .calibration-summary {
      background: #e8f5e8;
      border: 1px solid #4caf50;
      border-radius: 6px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .calibration-summary h5 {
      margin-top: 0;
      color: #2e7d32;
      border-bottom: 1px solid #4caf50;
      padding-bottom: 8px;
    }

    .calibration-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 10px;
    }

    .calibration-item {
      background: white;
      padding: 8px 12px;
      border-radius: 4px;
      border: 1px solid #c8e6c9;
      font-size: 13px;
      color: #2e7d32;
    }

    .test-controls {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .position-selector {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .position-selector label {
      font-weight: bold;
      color: #495057;
      min-width: 120px;
    }

    .position-selector select {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
      background: white;
    }

    .custom-position {
      margin-left: 130px;
    }

    .custom-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
    }

    .current-values {
      background: #e9ecef;
      border: 1px solid #ced4da;
      border-radius: 4px;
      padding: 12px;
      margin: 10px 0;
    }

    .value-display {
      font-family: monospace;
      font-size: 13px;
      color: #495057;
      margin: 4px 0;
    }

    .position-display {
      font-size: 14px;
      color: #007bff;
      font-weight: bold;
      margin: 8px 0;
      padding: 8px;
      background: #e3f2fd;
      border: 1px solid #2196f3;
      border-radius: 4px;
      text-align: center;
    }

    .capture-controls {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .capture-btn, .export-btn, .clear-btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .capture-btn {
      background: #28a745;
      color: white;
    }

    .capture-btn:hover:not(:disabled) {
      background: #218838;
    }

    .export-btn {
      background: #17a2b8;
      color: white;
    }

    .export-btn:hover:not(:disabled) {
      background: #138496;
    }

    .clear-btn {
      background: #dc3545;
      color: white;
    }

    .clear-btn:hover:not(:disabled) {
      background: #c82333;
    }

    .capture-btn:disabled, .export-btn:disabled, .clear-btn:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .test-log {
      margin-top: 20px;
      border-top: 1px solid #dee2e6;
      padding-top: 15px;
    }

    .test-log h5 {
      margin-top: 0;
      color: #495057;
    }

    .calibration-stats {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 4px;
      padding: 8px 12px;
      margin-bottom: 15px;
      font-size: 13px;
      color: #856404;
    }

    .log-entries {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      background: white;
    }

    .log-entry {
      padding: 12px;
      border-bottom: 1px solid #f1f3f4;
      background: #f8f9fa;
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .entry-number {
      background: #007bff;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }

    .entry-position {
      font-weight: bold;
      color: #495057;
      flex: 1;
      margin: 0 10px;
    }

    .entry-timestamp {
      color: #6c757d;
      font-size: 12px;
      font-family: monospace;
    }

    .entry-values {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .value {
      font-family: monospace;
      font-size: 12px;
      color: #495057;
      background: white;
      padding: 4px 8px;
      border-radius: 3px;
      border: 1px solid #e9ecef;
    }
  `]
})
export class FeatureControllerTestComponent {
  // Testing system properties
  selectedPosition: string = 'flat-table';
  customPositionName: string = '';
  testLog: Array<{
    position: string;
    timestamp: Date;
    gyro: { x: number; y: number; z: number };
    accel: { x: number; y: number; z: number };
  }> = [];

  protected readonly controllerService = inject(ControllerService);

  async connectController(): Promise<void> {
    try {
      await this.controllerService.connect();
    } catch (error) {
      console.error('Failed to connect controller:', error);
    }
  }

  // Helper methods for enhanced input visualizations
  protected getStickPositionX(position: { x: number; y: number }): string {
    // Convert -1 to 1 range to 0% to 100% for CSS positioning
    const xPercent = ((position.x + 1) / 2) * 100;
    return `${Math.max(0, Math.min(100, xPercent))}%`;
  }

  protected getStickPositionY(position: { x: number; y: number }): string {
    // Convert -1 to 1 range to 0% to 100% for CSS positioning
    // Invert Y axis for natural feel (up = top of screen)
    const yPercent = ((1 - position.y) / 2) * 100;
    return `${Math.max(0, Math.min(100, yPercent))}%`;
  }

  protected getTouchpadPositionX(position: { x: number; y: number; active: boolean }): string {
    // Convert -1 to 1 range to 0% to 100% for CSS positioning
    const xPercent = ((position.x + 1) / 2) * 100;
    return `${Math.max(0, Math.min(100, xPercent))}%`;
  }

  protected getTouchpadPositionY(position: { x: number; y: number; active: boolean }): string {
    // Convert -1 to 1 range to 0% to 100% for CSS positioning
    // Don't invert Y axis for touchpad - keep natural mapping
    const yPercent = ((position.y + 1) / 2) * 100;
    return `${Math.max(0, Math.min(100, yPercent))}%`;
  }



  // Calibration-based transform using real DualSense data
  protected getCubeTransform(): string {
    const accel = this.controllerService.accelerometerData();
    
    // Calibration data from CSV analysis:
    // 🟢 Flat Face Up: X=0.020, Y=0.238, Z=0.040
    // 🔴 Flat Face Down: X=-0.031, Y=-0.243, Z=0.053
    // 🔵 Upright Standing: X=-0.010, Y=0.054, Z=-0.245
    // ⬅️ Tilt Left 45°: X=0.161, Y=0.174, Z=0.046
    // ➡️ Tilt Right 45°: X=-0.143, Y=0.206, Z=0.044
    // ⬇️ Tilt Forward 45°: X=-0.020, Y=0.194, Z=0.145
    // ⬆️ Tilt Backward 45°: X=0.011, Y=0.215, Z=-0.132
    
    // Calculate normalized positions based on calibration ranges
    const normalizedX = this.normalizeAxis(accel.x, -0.25, 0.25); // Left/Right tilt
    const normalizedY = this.normalizeAxis(accel.y, -0.25, 0.25); // Forward/Back tilt
    const normalizedZ = this.normalizeAxis(accel.z, -0.25, 0.25); // Up/Down orientation
    
    // Map to rotation angles with calibrated sensitivity
    const rollX = normalizedX * 90;    // Left/Right roll
    const pitchY = normalizedY * 90;   // Forward/Back pitch
    const yawZ = normalizedZ * 90;     // Up/Down yaw
    
    // Apply smoothing and limits
    const smoothX = Math.max(-90, Math.min(90, rollX));
    const smoothY = Math.max(-90, Math.min(90, pitchY));
    const smoothZ = Math.max(-90, Math.min(90, yawZ));
    
    // Use CSS transform order: rotateZ (yaw) -> rotateX (roll) -> rotateY (pitch)
    return `rotateZ(${smoothZ}deg) rotateX(${smoothX}deg) rotateY(${smoothY}deg)`;
  }

  // Helper method to normalize accelerometer values to -1 to +1 range
  private normalizeAxis(value: number, min: number, max: number): number {
    // Clamp value to range
    const clamped = Math.max(min, Math.min(max, value));
    // Normalize to -1 to +1
    return ((clamped - min) / (max - min)) * 2 - 1;
  }

  // Detect current position based on calibration data
  protected detectCalibratedPosition(): string {
    const accel = this.controllerService.accelerometerData();
    const tolerance = 0.05; // 0.05G tolerance for position detection
    
    // Check for flat face up (rest position)
    if (Math.abs(accel.x - 0.020) < tolerance && 
        Math.abs(accel.y - 0.238) < tolerance && 
        Math.abs(accel.z - 0.040) < tolerance) {
      return '🟢 Flat Face Up (Rest)';
    }
    
    // Check for flat face down
    if (Math.abs(accel.x - (-0.031)) < tolerance && 
        Math.abs(accel.y - (-0.243)) < tolerance && 
        Math.abs(accel.z - 0.053) < tolerance) {
      return '🔴 Flat Face Down';
    }
    
    // Check for upright standing
    if (Math.abs(accel.x - (-0.010)) < tolerance && 
        Math.abs(accel.y - 0.054) < tolerance && 
        Math.abs(accel.z - (-0.245)) < tolerance) {
      return '🔵 Upright Standing';
    }
    
    // Check for left tilt
    if (accel.x > 0.110 && accel.y > 0.120) {
      return '⬅️ Tilt Left (~45°)';
    }
    
    // Check for right tilt
    if (accel.x < -0.090 && accel.y > 0.160) {
      return '➡️ Tilt Right (~45°)';
    }
    
    // Check for forward tilt
    if (accel.z > 0.100 && accel.y > 0.150) {
      return '⬇️ Tilt Forward (~45°)';
    }
    
    // Check for backward tilt
    if (accel.z < -0.080 && accel.y > 0.170) {
      return '⬆️ Tilt Backward (~45°)';
    }
    
    return '🔄 Moving/Unknown';
  }

  protected getAccelerometerBarWidth(value: number): number {
    // Convert accelerometer value to bar width percentage
    // Based on calibration data: typical range is -0.25 to +0.25 G
    const normalized = Math.abs(value) / 0.25;
    return Math.min(100, normalized * 100);
  }

  // Position detection based on calibration data
  protected detectPosition(): string {
    const accel = this.controllerService.accelerometerData();
    
    // Dead zone threshold based on calibration noise levels
    const deadZone = 0.05;
    
    // Flat positions (Z-axis close to 0, Y-axis shows gravity)
    if (Math.abs(accel.z) < deadZone) {
      if (accel.y > 0.2) return '🟢 Flat Face Up';
      if (accel.y < -0.2) return '🔴 Flat Face Down';
    }
    
    // Upright position (Z-axis shows gravity, Y-axis close to 0)
    if (accel.z < -0.2 && Math.abs(accel.y) < deadZone) {
      return '🔵 Upright Standing';
    }
    
    // Tilt detection based on calibration patterns
    if (Math.abs(accel.x) > 0.15) {
      return accel.x > 0 ? '⬅️ Tilted Left' : '➡️ Tilted Right';
    }
    
    if (Math.abs(accel.y) > 0.15) {
      if (accel.y > 0.15 && accel.z > 0.1) return '⬇️ Tilted Forward';
      if (accel.y > 0.15 && accel.z < -0.1) return '⬆️ Tilted Backward';
    }
    
    // Rotation detection (X-axis shows significant change)
    if (Math.abs(accel.x) > 0.2) {
      return accel.x > 0 ? '🔄 Rotated Counter-clockwise' : '🔄 Rotated Clockwise';
    }
    
    return '🔄 Unknown Position';
  }

  protected testCubeRotation(): void {
    // Test method to verify cube rotation is working
    console.log('Testing cube rotation...');
    
    // Get the cube element and apply a test transform
    const cubeElement = document.querySelector('.cube') as HTMLElement;
    if (cubeElement) {
      const testTransform = 'rotateX(45deg) rotateY(45deg) rotateZ(45deg)';
      cubeElement.style.transform = testTransform;
      console.log('Applied test transform:', testTransform);
      
      // Reset after 2 seconds to current position
      setTimeout(() => {
        cubeElement.style.transform = this.getCubeTransform();
        console.log('Reset cube transform to current position');
      }, 2000);
    } else {
      console.error('Cube element not found!');
    }
  }

  // Testing system methods
  protected capturePosition(): void {
    const positionName = this.selectedPosition === 'custom' 
      ? this.customPositionName || 'Custom Position'
      : this.getPositionDisplayName(this.selectedPosition);

    const entry = {
      position: positionName,
      timestamp: new Date(),
      gyro: { ...this.controllerService.gyroscopeData() },
      accel: { ...this.controllerService.accelerometerData() }
    };

    this.testLog.push(entry);
    console.log('Position captured:', entry);
  }

  protected exportTestLog(): void {
    if (this.testLog.length === 0) return;

    // Create CSV content
    const csvContent = this.generateCSV();
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dualsense-test-log-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  protected clearTestLog(): void {
    this.testLog = [];
  }

  protected getCalibrationStats(): string {
    if (this.testLog.length === 0) return 'No data captured yet';
    
    const gyroValues = this.testLog.flatMap(entry => [entry.gyro.x, entry.gyro.y, entry.gyro.z]);
    const accelValues = this.testLog.flatMap(entry => [entry.accel.x, entry.accel.y, entry.accel.z]);
    
    const gyroNoise = Math.max(...gyroValues.map(Math.abs));
    const accelRange = Math.max(...accelValues.map(Math.abs));
    
    return `Gyro Noise: ±${gyroNoise.toFixed(3)}, Accel Range: ±${accelRange.toFixed(3)}`;
  }

  private getPositionDisplayName(position: string): string {
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

  private generateCSV(): string {
    const headers = ['Position', 'Timestamp', 'Gyro_X', 'Gyro_Y', 'Gyro_Z', 'Accel_X', 'Accel_Y', 'Accel_Z'];
    const rows = this.testLog.map(entry => [
      entry.position,
      entry.timestamp.toISOString(),
      entry.gyro.x.toFixed(6),
      entry.gyro.y.toFixed(6),
      entry.gyro.z.toFixed(6),
      entry.accel.x.toFixed(6),
      entry.accel.y.toFixed(6),
      entry.accel.z.toFixed(6)
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}
