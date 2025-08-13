# Danny Soundbox - Architecture Guide

## 🏗️ Architecture Principles

### 1. **Domain-Driven Design (DDD)**
* Organize code by business domains, not technical concerns
* Each domain is self-contained with its own models, services, and components
* Clear boundaries between domains

### 2. **Feature-First Organization**
* Group related functionality into feature modules
* Each feature is a complete, working unit
* Features can be developed and tested independently

### 3. **Component Architecture**
* **Smart Components** (`feature-*`): Handle business logic and state
* **UI Components** (`ui-*`): Reusable, presentational components
* **Utility Components** (`util-*`): Specialized functionality

### 4. **Standalone Components**
* Use Angular's standalone component architecture
* No NgModules required
* Explicit dependencies and imports

## 📁 Project Structure

```
src/app/
├── domains/                    # Business domains
│   └── soundbox/             # Soundbox domain
│       ├── data/             # Models, interfaces, services
│       ├── feature-*/        # Smart components with business logic
│       ├── ui-*/            # Reusable UI components
│       └── util-*/          # Domain-specific utilities
├── shared/                    # Cross-cutting concerns
│   ├── ui/                  # Shared UI components (Angular Material)
│   └── util/                # Common utilities and helpers
└── app.*                     # Root application files
```

## 🎯 Domain Structure

### **Soundbox Domain**
* **Purpose**: Handle all soundboard functionality
* **Responsibilities**: 
  * Controller integration
  * Sound management
  * Audio playback
  * User interface

### **Core Features**
1. **PS5 Controller Integration** (`feature-controller`)
2. **Sound Player** (`feature-sound-player`)
3. **Sound Library** (`data/sound-library`)
4. **Audio Utilities** (`util-audio`)

## 🔧 Technical Guidelines

### **Component Naming**
* **Feature Components**: `feature-{name}`
* **UI Components**: `ui-{name}`
* **Utility Components**: `util-{name}`
* **Files**: kebab-case (e.g., `sound-player.component.ts`)

### **Service Organization**
* **Domain Services**: Business logic specific to soundbox
* **Shared Services**: Cross-cutting functionality
* **Utility Services**: Helper functions and utilities

### **State Management**
* Use Angular Signals for reactive state
* Keep state close to where it's used
* Avoid global state when possible
* Prefer computed signals over manual subscriptions

## 🧪 Testing Strategy

### **Test Organization**
* Tests alongside source files
* Feature tests for business logic
* Unit tests for services and utilities
* Integration tests for component interactions

### **Test Naming**
* `describe('ComponentName', () => {})`
* `it('should do something specific', () => {})`
* Clear, descriptive test names

## 🚀 Development Workflow

### **Before Creating New Files/Folders**
1. **Check with CTO/PO** for approval
2. **Verify against this architecture**
3. **Ensure domain boundaries are respected**
4. **Follow established naming conventions**

### **Component Creation Order**
1. **Data Layer**: Models, interfaces, services
2. **Feature Components**: Business logic
3. **UI Components**: Presentation layer
4. **Utilities**: Helper functions

## 📚 Technology Stack

### **Core Technologies**
* **Angular 20.2**: Latest features and APIs
* **TypeScript**: Strict typing and modern syntax
* **SCSS**: Advanced styling capabilities
* **Vitest**: Fast testing framework

### **Key Libraries**
* **Angular Signals**: Reactive state management
* **WebHID API**: Controller integration
* **Web Audio API**: Sound playback

## 🔒 Security & Performance

### **Security**
* Input validation and sanitization
* Secure audio file handling
* Controller permission management

### **Performance**
* Lazy loading for features
* Signal-based reactivity
* Efficient audio processing
* Minimal bundle size

## 📋 Implementation Checklist

### **Phase 1: Foundation**
- [ ] Project structure setup
- [ ] Basic routing
- [ ] Core services
- [ ] Testing framework

### **Phase 2: Controller Integration**
- [ ] WebHID service
- [ ] Controller detection
- [ ] Button input handling
- [ ] Basic UI

### **Phase 3: Sound System**
- [ ] Audio service
- [ ] Sound library
- [ ] Playback controls
- [ ] Volume management

---

**Remember**: This architecture is a living document. Update it as the project evolves, but always maintain the core principles.
