import { Component, inject } from '@angular/core';
import { ControllerService } from '../data/controller.service';

@Component({
  selector: 'app-connect-button',
  standalone: true,
  template: `
    <div class="connect-container">
      <button 
        (click)="onConnectClick()" 
        [disabled]="controllerService.isConnected()"
        class="connect-button">
        {{ controllerService.isConnected() ? 'Connected!' : 'Connect Controller' }}
      </button>
      
      <div class="status">
        Status: {{ controllerService.isConnected() ? 'Connected' : 'Disconnected' }}
      </div>
      
      @if (controllerService.isConnected()) {
        <div class="button-status">
          Triangle Button: {{ controllerService.isTrianglePressed() ? 'Pressed' : 'Not Pressed' }}
        </div>
      }
    </div>
  `,
  styles: [`
    .connect-container {
      padding: 20px;
      text-align: center;
    }
    
    .connect-button {
      padding: 12px 24px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 16px;
    }
    
    .connect-button:hover:not(:disabled) {
      background-color: #0056b3;
    }
    
    .connect-button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    .status {
      margin-bottom: 8px;
      font-weight: bold;
    }
    
    .button-status {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class ConnectButtonComponent {
  protected readonly controllerService = inject(ControllerService);

  async onConnectClick(): Promise<void> {
    try {
      await this.controllerService.connect();
      console.log('Controller connected successfully!');
    } catch (error) {
      console.error('Failed to connect controller:', error);
      alert('Failed to connect controller. Please check if WebHID is supported and try again.');
    }
  }
}
