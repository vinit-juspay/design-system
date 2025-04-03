# Checkbox Component

This document explains the architecture and design patterns of the Checkbox component, which serves as a reference for implementing other components in this design system.

## Component Structure

The Checkbox component follows a modular structure with separation of concerns:

```
src/components/Checkbox/
├── Checkbox.config.ts    # Styling tokens and configuration
├── Checkbox.types.ts     # TypeScript types and interfaces
├── Checkbox.variants.ts  # Styling logic and variants
├── Checkbox.tsx          # Component implementation
├── index.ts              # Exports
└── README.md             # Documentation (this file)
```

## Information Flow

The component follows a clear information flow pattern:

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                    │     │                 │
│ tailwind.config │────►│ Checkbox.config  │────►│ Checkbox.variants  │────►│ Checkbox.tsx   │
│                 │     │                  │     │                    │     │                 │
└─────────────────┘     └──────────────────┘     └────────────────────┘     └─────────────────┘
                                  ▲                       ▲                          ▲
                                  │                       │                          │
                                  │                       │     ┌─────────────────┐  │
                                  │                       │     │                 │  │
                                  └───────────────────────┼─────┤ Checkbox.types  │──┘
                                                          │     │                 │
                                                          │     └─────────────────┘
                                                          │
                                                          │     ┌─────────────────┐
                                                          │     │                 │
                                                          └─────┤    index.ts     │
                                                                │                 │
                                                                └─────────────────┘
```

### How Information Flows:

1. **Tailwind Config → Component Config:**
   - `tailwind.config.js` defines design system fundamentals (colors, spacing, typography)
   - `Checkbox.config.ts` references tailwind utility classes
   - Example: Mapping `text-body-sm` from tailwind to the checkbox's small label

2. **Component Config → Component Variants:**
   - The variants file imports the configuration object
   - Transforms configuration into dynamic style objects based on props
   - Uses the `cn()` utility to merge classes and handle conflicts
   - Example: Combining label styles from config with conditional styles for enabled/disabled states

3. **Component Variants → Component Implementation:**
   - The component imports the `getCheckboxStyles` function
   - Passes its props to get the appropriate styles
   - Applies these styles to the appropriate HTML/JSX elements
   - Example: `className={styles.label}` applies the styles to the label element

4. **Component Types → Component Implementation:**
   - Types file defines the component's API (props interface)
   - Component implements those props with proper typing
   - Example: The `CheckboxProps` interface defines what props the component accepts

5. **Component Implementation → Index Export:**
   - The main component is exported as the default export
   - Types are exported as named exports
   - This creates a clean public API for consuming the component

### Complete Flow Example:

1. Tailwind defines `text-body-sm` in `tailwind.config.js`
2. `Checkbox.config.ts` references it in `labelText` for the small size
3. `Checkbox.variants.ts` combines it with other styles and logic in `getCheckboxStyles`
4. `Checkbox.tsx` calls `getCheckboxStyles` with the current props
5. The styles are applied to the rendered elements
6. The component is exported through `index.ts` for use in the application

## Files Explained

### 1. `Checkbox.config.ts`

Contains all styling tokens, following these principles:
- Each design token is defined here, not in the component
- Design tokens reflect the Figma design specifications
- Layout and styling is organized by component size, state, etc.
- This is the source of truth for styling

Example:
```typescript
export const checkboxConfig: CheckboxConfig = {
  sizes: {
    sm: { /* sm size config */ },
    md: { /* md size config */ }
  },
  states: { /* state styling */ },
  label: { /* label styling */ },
  // etc.
};
```

### 2. `Checkbox.types.ts`

Contains all TypeScript type definitions:
- Component props interface
- Type definitions for states, sizes, etc.
- Properly documented with JSDoc comments

Example:
```typescript
export interface CheckboxProps {
  /**
   * Size of the checkbox
   * @default "md"
   */
  size?: CheckboxSize;
  // etc.
}
```

### 3. `Checkbox.variants.ts`

Handles component styling logic:
- Imports configuration from `config.ts`
- Contains functions that return style objects
- Uses the `cn()` utility for class composition
- Handles conditional styling based on props

Example:
```typescript
export const getCheckboxStyles = (props) => {
  // Logic to determine styles based on props
  return {
    root: /* styles */,
    label: /* styles */,
    // etc.
  };
};
```

### 4. `Checkbox.tsx`

The component implementation:
- Uses types from `types.ts`
- Gets styles from `variants.ts`
- Implements component behavior
- Handles conditional rendering
- Minimal styling logic - styling decisions live in `variants.ts`

### 5. `index.ts`

Simple export file to expose the component:
```typescript
export { default } from './Checkbox';
export * from './Checkbox.types';
```

## Key Design Patterns

### 1. Style Composition

- Use `cn()` utility for class composition
- For font styles, always ensure font properties are properly set:
  ```typescript
  label: `${config.label.fontFamily} ${config.label.fontSize[size]} ${cn(
    // Other styles
  )}`
  ```

### 2. Props API

- Boolean flags with "has" prefix for conditional features (`hasSlot`, `hasSubtext`)
- Content props without "has" prefix (`labelText`, `slotContent`)
- Default values in component destructuring

### 3. Slots Pattern

- Use React nodes for customizable slots:
  ```typescript
  slotContent?: React.ReactNode;
  ```
- Always provide sensible defaults for slots

### 4. Accessibility

- Use ARIA attributes as needed
- Handle keyboard navigation
- Ensure color contrast meets requirements

## Adding New Components

When creating a new component:

1. Create similar file structure:
   - `ComponentName.config.ts`
   - `ComponentName.types.ts`
   - `ComponentName.variants.ts`
   - `ComponentName.tsx`
   - `index.ts`
   - `README.md`

2. Extract design tokens from Figma into the config file

3. Define component props in the types file

4. Build styling logic in the variants file

5. Implement the component behavior in the main component file

6. Document component usage and architecture in the README

## Sample Usage

```tsx
// Basic usage
<Checkbox 
  labelText="Accept terms"
  state="unselected"
  onChange={handleChange}
/>

// With all features
<Checkbox 
  size="md"
  state="selected"
  enabled={true}
  labelText="Enable notifications"
  hasSubtext={true}
  subtext="You'll receive email notifications for all activity."
  hasSlot={true}
  slotContent={<CustomComponent />}
  onChange={handleChange}
/>
``` 