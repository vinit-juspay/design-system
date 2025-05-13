# System Patterns: Juspay Design System

## System Architecture

The Juspay Design System is built with a modular architecture that separates concerns and promotes reusability:

```
design-system/
├── lib/                  # Core library code
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── themeConfig.ts    # Theme configuration
│   └── main.ts           # Entry point for exports
├── src/                  # Development environment
├── .storybook/           # Storybook configuration
└── public/               # Static assets
```

## Core Design Patterns

### Component Pattern

- All components use the React forwardRef pattern
- Component props defined in separate types.ts files
- Component variants defined as enums
- Components have displayName set for debugging
- Utility functions for class name generation in utils.ts
- Components export from an index.ts file

### Composition Pattern

- Components built to be composable with other components
- Use of compound components for complex UIs (e.g., Select.Option, Tabs.Panel)
- Slot pattern for flexible component composition

### Theming Pattern

- Theme configured in centralized themeConfig.ts
- TailwindCSS for styling with utility classes
- Consistent naming convention for theme values
- Design tokens mapped to TailwindCSS configuration

## Technical Decisions

### State Management

- React hooks for local component state
- Props for component configuration
- Context API for theme and global state when needed

### Styling Approach

- TailwindCSS for utility-first styling
- clsx/cn utility for conditional class names
- CSS variables for theming and dynamic styles

### Performance Considerations

- Memoization of complex operations with useMemo and useCallback
- Lazy loading for complex components
- Tree-shakable exports
- Side effects isolated to useEffect hooks

### Accessibility Standards

- ARIA attributes for accessibility
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Packaging and Distribution

- Package published to npm
- Tree-shakable exports for optimized bundle size
- TypeScript declarations included
- CSS bundled with components
