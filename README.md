# 🎮 Danny Soundbox

A **PS5 controller-controlled soundboard** built with Angular 20.2 and WebHID API. Control your soundboard using a DualSense controller with real-time sensor data visualization and testing capabilities.

## ✨ Features

### 🎯 **Controller Integration**
- **WebHID Support**: Connect your PS5 DualSense controller via USB or Bluetooth
- **16 Button Detection**: Full button mapping with real-time press states
- **Motion Sensors**: Gyroscope and accelerometer data visualization
- **Analog Inputs**: Stick positions, trigger pressure, and touchpad tracking

### 🧪 **Testing & Calibration**
- **Position Detection**: Real-time controller orientation recognition
- **3D Cube Visualization**: Live 3D representation of controller position
- **Calibration System**: Capture and analyze sensor data for accuracy
- **CSV Export**: Export test logs for analysis and debugging

### 🏗️ **Modern Architecture**
- **Angular 20.2**: Latest features and bleeding-edge APIs
- **Domain-Driven Design**: Clean, maintainable code organization
- **Angular Signals**: Reactive state management over RxJS
- **Standalone Components**: Modern Angular architecture

## 🚀 Live Demo

**🌐 [danny-soundbox.carniatto.dev](https://danny-soundbox.carniatto.dev)**

*Note: Requires Chrome/Edge 89+ for WebHID support*

## 📱 Screenshots

### Controller Testing Interface
![Controller Testing](docs/screenshots/controller-testing.png)

### 3D Position Cube
![3D Cube](docs/screenshots/3d-cube.png)

### Sensor Data Visualization
![Sensor Data](docs/screenshots/sensor-data.png)

## 🛠️ Tech Stack

- **Frontend**: Angular 20.2 (Bleeding Edge)
- **Build Tool**: Angular Build System
- **Package Manager**: pnpm
- **Testing**: Vitest + Angular Testing Library
- **Controller**: WebHID API + dualsense-ts
- **Styling**: SCSS with modern CSS features
- **Deployment**: GitHub Pages + GitHub Actions

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **pnpm**: 8.x or higher
- **Browser**: Chrome/Edge 89+ (WebHID support required)
- **Controller**: PS5 DualSense controller

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone git@github.com:Carniatto/danny-soundbox.git
cd danny-soundbox
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start Development Server
```bash
pnpm start
```

### 4. Open Browser
Navigate to `http://localhost:4200`

### 5. Connect Controller
- Click "Connect Controller"
- Select your DualSense controller
- Start testing!

## 🧪 Testing

### Run All Tests
```bash
pnpm test:run
```

### Run Tests with UI
```bash
pnpm test:ui
```

### Run Tests with Coverage
```bash
pnpm test:coverage
```

## 🏗️ Project Structure

```
src/app/
├── domains/
│   └── soundbox/                    # Soundbox domain
│       ├── data/                    # Models, interfaces, services
│       │   ├── types/              # Type definitions
│       │   ├── constants/           # Calibration constants
│       │   └── controller.service.ts # Core controller service
│       ├── feature-controller-test/ # Main controller test component
│       ├── ui/                     # UI components
│       └── util/                   # Utility functions
├── shared/                          # Cross-cutting concerns
└── app.*                           # Root application files
```

## 🎮 Controller Setup

### WebHID Requirements
- **Browser**: Chrome/Edge 89+ (Firefox/Safari not supported)
- **Connection**: USB or Bluetooth
- **Permission**: User must grant HID device access

### Supported Controllers
- ✅ **PS5 DualSense** (Primary target)
- 🔄 **Other WebHID-compatible controllers** (Experimental)

### Button Mapping
- **Face Buttons**: Triangle, Circle, Square, Cross
- **Shoulder Buttons**: L1, R1, L2, R2
- **D-Pad**: Up, Right, Down, Left
- **Sticks**: L3, R3
- **Special**: Touchpad, PS Button

## 📊 Development Status

| Phase | Status | Progress | Description |
|-------|--------|----------|-------------|
| **Phase 1** | ✅ **COMPLETED** | 100% | Utilities extraction & testing |
| **Phase 2** | 🎯 **IN PROGRESS** | 0% | UI components extraction |
| **Phase 3** | 🔄 **PLANNED** | 0% | Main component refactoring |
| **Phase 4** | 🔄 **PLANNED** | 0% | Testing & validation |

## 🤝 Contributing

### Development Guidelines
1. **Follow TDD**: Write tests before implementation
2. **Architecture First**: Follow `ARCHITECTURE.md` principles
3. **Small Commits**: One feature per commit
4. **Type Safety**: 100% TypeScript strict mode

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Follow TDD cycle (Red-Green-Refactor)
4. Submit a pull request

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Project architecture guidelines
- **[DEVELOPMENT_GUIDELINES.md](DEVELOPMENT_GUIDELINES.md)**: Development workflow
- **[ROADMAP.md](ROADMAP.md)**: Refactoring progress and plans
- **[docs/](docs/)**: Additional documentation and findings

## 🐛 Known Issues

### WebHID Limitations
- **Browser Support**: Limited to Chrome/Edge 89+
- **Permission Model**: Requires user interaction for device access
- **Connection Reliability**: Some devices may require reconnection

### Controller Behavior
- **Sensor Noise**: Gyroscope data may have slight noise
- **Calibration**: Position detection requires initial calibration
- **Battery**: Bluetooth connection may affect sensor accuracy

## 🔮 Roadmap

### Short Term (Phase 2)
- [ ] Extract UI components for better separation
- [ ] Improve component reusability
- [ ] Reduce main component complexity

### Medium Term (Phase 3)
- [ ] Optimize signal propagation
- [ ] Implement error boundaries
- [ ] Add loading states and error handling

### Long Term (Future)
- [ ] Sound integration and playback
- [ ] Advanced button mappings
- [ ] Category navigation
- [ ] Volume control

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team**: For the amazing framework and bleeding-edge features
- **dualsense-ts**: For the DualSense controller integration library
- **WebHID Community**: For the browser HID device support
- **PS5 Controller**: For the excellent motion sensing capabilities

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Carniatto/danny-soundbox/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Carniatto/danny-soundbox/discussions)
- **Wiki**: [Project Wiki](https://github.com/Carniatto/danny-soundbox/wiki)

---

**Made with ❤️ and lots of 🎮 by the Danny Soundbox Team**

*Last updated: January 2025*
