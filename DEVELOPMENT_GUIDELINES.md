# Danny Soundbox - Development Guidelines

## 🎯 Project Vision
A soundboard that can be controlled by a PS5 controller to play songs for each button press.

## 🚀 Development Approach

### 1. **TDD (Test-Driven Development)**
* **Step by step** - One small feature at a time
* **Test first** - Write test, make it fail, implement, make it pass
* **Red-Green-Refactor** cycle for every feature

### 2. **Angular 20.2 Bleeding Edge**
* Use latest Angular features and experimental APIs
* Learn new and exciting capabilities
* Zoneless by default
* Modern component APIs (`input()`, `output()`, `model()`)
* Prefer Signals over Rxjs (`signal`, `computed`, `linkedSignal`, `resource`, etc)

### 3. **Architecture-First Development**
* Follow `ARCHITECTURE.md` principles strictly
* **Ask before creating** new files or folders
* Domain-driven design approach
* Standalone components only

## 🏗️ Technical Requirements

### Phase 1: PS5 Controller Integration
* **WebHID connection** to DualSense controller
* **Button press detection** (start with triangle button only)
* **Callback approach** → signal value → console log
* **Minimal UI** - just connect button

### Phase 2: Sound Integration
* **16 cartoon sounds** from existing curation
* **Simple button mapping** (not in specific order)
* **Sound playback** on button press

### Phase 3: Enhanced Features
* **Category navigation**
* **Volume control**
* **Advanced button mappings**

## 📁 File Structure Principles

### Before Creating Any New File/Folder:
1. **Check with CTO/PO** (that's you!)
2. **Verify against ARCHITECTURE.md**
3. **Ensure domain boundaries are respected**
4. **Follow established naming conventions**

### Current Structure (Reference):
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

## 🧪 Testing Strategy

### Test Structure:
* **Unit tests** for services and utilities
* **Component tests** with Angular Testing Library
* **Integration tests** for features
* **Test files** alongside source files (`.spec.ts`)

### Test Naming:
* `describe('ComponentName', () => {})`
* `it('should do something specific', () => {})`
* Clear, descriptive test names

## 🔧 Development Workflow

### 1. **Before Starting Any Work:**
* Read this document
* Check `ARCHITECTURE.md`
* Confirm approach with CTO/PO

### 2. **For Each Feature:**
* Write test first
* Implement minimal functionality
* Verify against requirements
* Check with CTO/PO before expanding

### 3. **Code Quality:**
* TypeScript strict mode
* Angular style guide compliance
* Clean, readable code
* Proper error handling

## 📝 Git Commit Strategy

### **Conventional Commits Specification**

We follow the [Conventional Commits 1.0.0 specification](https://www.conventionalcommits.org/en/v1.0.0/#specification) for all commit messages.

### **Commit Message Structure**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### **Commit Types**
* **feat:** A new feature (correlates with MINOR in SemVer)
* **fix:** A bug fix (correlates with PATCH in SemVer)
* **docs:** Documentation only changes
* **style:** Changes that do not affect the meaning of the code
* **refactor:** A code change that neither fixes a bug nor adds a feature
* **perf:** A code change that improves performance
* **test:** Adding missing tests or correcting existing tests
* **chore:** Changes to the build process or auxiliary tools
* **BREAKING CHANGE:** A breaking API change (correlates with MAJOR in SemVer)

### **Atomic Commits for Clean History**
* **One feature per commit** - Each commit should deliver one small, working increment
* **Tell a story** - Commit history should show the evolution of the project
* **Red-Green-Refactor commits** - Commit after each TDD cycle
* **Meaningful messages** - Use conventional commit format with proper types

### **Suggested Commit Points:**
* **After scaffolding** - `feat: scaffold Angular 20.2 project`
* **After first test** - `test: add component creation test`
* **After component creation** - `feat: create basic component structure`
* **After connect button** - `feat: add connect button to component`
* **After WebHID request** - `feat: implement WebHID device request`
* **After triangle button detection** - `feat: detect triangle button press`

### **Commit Message Examples:**
```
feat(controller): add triangle button detection
test(controller): add WebHID connection test
fix(controller): resolve button press callback issue
docs: update development guidelines
refactor(service): simplify controller connection logic
BREAKING CHANGE: controller API now requires explicit initialization
```

## 🎮 Controller Integration Details

### WebHID Requirements:
* Chrome/Edge 89+ (Firefox/Safari not supported)
* USB or Bluetooth connection
* User permission for HID device access

### Button Mapping (Future):
* Triangle, Circle, Square, Cross
* L1/R1 bumpers
* L2/R2 triggers
* D-pad directions
* Analog sticks
* Touchpad

## 📚 Learning Goals

### New Angular APIs to Explore:
* `resource()` for data fetching
* `rxResource()` for RxJS integration
* `httpResource()` for HTTP requests
* New component APIs
* Advanced signal patterns

## 🚫 What NOT to Do
* **Don't assume requirements** - Always ask CTO/PO
* **Don't create files/folders** without approval
* **Don't skip tests** - TDD is mandatory
* **Don't over-engineer** - Start simple, iterate
* **Don't ignore architecture** - Follow established patterns

## ✅ Success Criteria

### Phase 1 Complete When:
* [ ] Triangle button press detected
* [ ] Console logs button press
* [ ] WebHID connection established
* [ ] Tests passing
* [ ] CTO/PO approval

### Overall Success:
* Working PS5 controller integration
* Quality sound playback
* Clean, maintainable code
* Full test coverage
* Architecture compliance

---

**Remember: When in doubt, ASK the CTO/PO!**

This document should be referenced at the start of every development session.
