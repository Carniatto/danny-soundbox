import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureControllerTestComponent } from './feature-controller-test.component';
import { ControllerService } from '../../data/controller.service';
import { signal } from '@angular/core';

describe('FeatureControllerTestComponent', () => {
  let component: FeatureControllerTestComponent;
  let fixture: ComponentFixture<FeatureControllerTestComponent>;
  let mockControllerService: jasmine.SpyObj<ControllerService>;

  beforeEach(async () => {
    const controllerServiceSpy = jasmine.createSpyObj('ControllerService', ['connect', 'disconnect'], {
      isConnected: signal(false),
      isTrianglePressed: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [FeatureControllerTestComponent],
      providers: [
        { provide: ControllerService, useValue: controllerServiceSpy }
      ]
    }).compileComponents();

    mockControllerService = TestBed.inject(ControllerService) as jasmine.SpyObj<ControllerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureControllerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 16 controller buttons in a grid', () => {
    const buttonElements = fixture.nativeElement.querySelectorAll('button');
    expect(buttonElements.length).toBe(16);
  });

  it('should have a connect button', () => {
    const connectButton = fixture.nativeElement.querySelector('button[data-testid="connect-button"]');
    expect(connectButton).toBeTruthy();
    expect(connectButton.textContent).toContain('Connect Controller');
  });

  it('should call controller service connect method when connect button is clicked', () => {
    const connectButton = fixture.nativeElement.querySelector('button[data-testid="connect-button"]');
    connectButton.click();
    
    expect(mockControllerService.connect).toHaveBeenCalled();
  });

  it('should display connection status', () => {
    const statusElement = fixture.nativeElement.querySelector('[data-testid="connection-status"]');
    expect(statusElement).toBeTruthy();
  });

  it('should show all 16 button names', () => {
    const expectedButtons = [
      'Triangle', 'Circle', 'Square', 'Cross',
      'L1', 'R1', 'L2', 'R2',
      'D-Up', 'D-Right', 'D-Down', 'D-Left',
      'L3', 'R3', 'Touchpad', 'PS'
    ];

    expectedButtons.forEach(buttonName => {
      const buttonElement = fixture.nativeElement.querySelector(`button[data-testid="${buttonName.toLowerCase()}-button"]`);
      expect(buttonElement).toBeTruthy();
      expect(buttonElement.textContent).toContain(buttonName);
    });
  });
});
