# DualSense-TS Library Documentation Improvements

## 📚 What We Found vs. What the Docs Said

### **1. Button Access Patterns**

**Documentation Example:**
```typescript
controller.circle.state; // false
controller.left.bumper.state; // true
```

**Actual API Structure:**
```typescript
// Face buttons - direct access
controller.triangle.on('change', (input) => input.active)
controller.circle.on('change', (input) => input.active)
controller.square.on('change', (input) => input.active)
controller.cross.on('change', (input) => input.active)

// Shoulder buttons - nested under left/right
controller.left.bumper.on('change', (input) => input.active)
controller.right.bumper.on('change', (input) => input.active)

// Triggers - nested under left/right with pressure
controller.left.trigger.on('change', (input) => input.pressure)
controller.right.trigger.on('change', (input) => input.pressure)
```

### **2. Analog Stick Structure**

**Documentation Example:**
```typescript
controller.left.analog.x.active; // true, when away from center
controller.left.analog.x.state; // 0.51, -1 to 1
```

**Actual API Structure:**
```typescript
// Analog stick positions
controller.left.analog.x.on('change', (input) => input.state) // -1 to 1
controller.left.analog.y.on('change', (input) => input.state) // -1 to 1
controller.left.analog.button.on('change', (input) => input.active) // L3/R3

// Same for right side
controller.right.analog.x.on('change', (input) => input.state)
controller.right.analog.y.on('change', (input) => input.state)
controller.right.analog.button.on('change', (input) => input.active)
```

### **3. Touchpad Structure**

**Documentation Example:**
```typescript
controller.touchpad.right.contact.state; // false
controller.touchpad.right.x; // -0.44, -1 to 1
```

**Actual API Structure:**
```typescript
// Touchpad has left/right sides, each with x, y, and contact
controller.touchpad.left.x.on('change', (input) => input.state) // -1 to 1
controller.touchpad.left.y.on('change', (input) => input.state) // -1 to 1
controller.touchpad.left.contact.on('change', (input) => input.active)

controller.touchpad.right.x.on('change', (input) => input.state)
controller.touchpad.right.y.on('change', (input) => input.state)
controller.touchpad.right.contact.on('change', (input) => input.active)
```

### **4. Motion Sensors**

**Documentation Example:**
```typescript
controller.gyroscope.on("change", ({ x, y, z }) => {
  console.log(`Gyroscope: \n\t${x}\n\t${y}\n\t${z}`)
}
```

**Actual API Structure:**
```typescript
// Motion sensors are accessed via individual Axis objects
controller.gyroscope.x.on('change', (input) => input.state)
controller.gyroscope.y.on('change', (input) => input.state)
controller.gyroscope.z.on('change', (input) => input.state)

controller.accelerometer.x.on('change', (input) => input.state)
controller.accelerometer.y.on('change', (input) => input.state)
controller.accelerometer.z.on('change', (input) => input.state)
```

## 🚨 Key Issues Found

### **1. Type Mismatches**
- **Documentation shows**: `input.x`, `input.y`, `input.z` as numbers
- **Reality**: These are `Axis` objects with a `state` property
- **Correct usage**: `input.state` to get the numeric value

### **2. Inconsistent API Patterns**
- Some inputs use direct properties (`controller.triangle`)
- Others use nested structures (`controller.left.bumper`)
- Motion sensors use individual Axis objects instead of grouped data

### **3. Missing Event Examples**
- Documentation focuses on `state` property access
- Limited examples of event-driven usage with `on('change')`
- No clear guidance on when to use events vs. direct state access

## 💡 Suggested Documentation Improvements

### **1. Add Clear API Structure Diagram**
```typescript
// Button Structure
controller.triangle        // Direct button access
controller.left.bumper     // Left side buttons
controller.right.bumper    // Right side buttons
controller.left.trigger    // Left triggers
controller.right.trigger   // Right triggers

// Analog Structure  
controller.left.analog.x   // Left stick X axis
controller.left.analog.y   // Left stick Y axis
controller.left.analog.button // Left stick button (L3)

// Touchpad Structure
controller.touchpad.left.x      // Left touch X
controller.touchpad.left.y      // Left touch Y
controller.touchpad.left.contact // Left touch contact
```

### **2. Clarify Event vs. State Usage**
```typescript
// For real-time updates (recommended)
controller.triangle.on('change', (input) => {
  console.log('Triangle:', input.active) // true/false
})

// For one-time checks
const isPressed = controller.triangle.state // true/false
```

### **3. Fix Motion Sensor Examples**
```typescript
// ❌ Current documentation (incorrect)
controller.gyroscope.on("change", ({ x, y, z }) => {
  console.log(`Gyroscope: ${x}, ${y}, ${z}`)
}

// ✅ Correct usage
controller.gyroscope.x.on('change', (input) => {
  console.log('Gyro X:', input.state)
})
controller.gyroscope.y.on('change', (input) => {
  console.log('Gyro Y:', input.state)
})
controller.gyroscope.z.on('change', (input) => {
  console.log('Gyro Z:', input.state)
})
```

### **4. Add Type Safety Examples**
```typescript
// Show the correct types
interface AxisInput {
  state: number;    // The actual numeric value
  active: boolean;  // Whether the axis is active
}

// Usage
controller.left.analog.x.on('change', (input: AxisInput) => {
  const value = input.state;    // number: -1 to 1
  const isActive = input.active; // boolean
})
```

## 🎯 Recommendations for Library Maintainers

1. **Update Examples**: Fix motion sensor examples to use individual Axis objects
2. **Add Type Definitions**: Provide better TypeScript examples with proper types
3. **Consistent Patterns**: Document the left/right nested structure more clearly
4. **Event vs. State**: Clarify when to use events vs. direct state access
5. **API Reference**: Add a comprehensive API reference section

## 📝 Our Working Implementation

Based on our findings, here's the correct way to implement controller input:

```typescript
// Button states
this.controller.triangle.on('change', (input) => {
  this._isTrianglePressed.set(input.active);
});

// Analog positions
this.controller.left.analog.x.on('change', (input) => {
  const current = this._leftStickPosition();
  this._leftStickPosition.set({ ...current, x: input.state });
});

// Trigger pressure
this.controller.left.trigger.on('change', (input) => {
  this._leftTriggerPressure.set(input.pressure);
});

// Motion sensors
this.controller.gyroscope.x.on('change', (input) => {
  const current = this._gyroscopeData();
  this._gyroscopeData.set({ ...current, x: input.state });
});
```

## 🔍 Source Code Investigation

We examined the actual source code in `node_modules/dualsense-ts/src/` to understand:

- **Dualsense class**: Main controller class with nested properties
- **Unisense class**: Left/right side controller elements
- **Analog class**: Analog stick with x, y, and button properties
- **Axis class**: Individual axis with `state` property
- **Trigger class**: Trigger with `pressure` property
- **Touchpad class**: Touchpad with left/right Touch objects
- **Gyroscope/Accelerometer**: Motion sensors with individual Axis objects

## 📅 Date of Investigation

**Investigation Date**: January 2025  
**Library Version**: dualsense-ts@5.5.0  
**Project**: Danny Soundbox - PS5 Controller Integration

---

*This document was created based on real-world implementation experience and source code investigation. It aims to help future developers avoid the same pitfalls we encountered.*
