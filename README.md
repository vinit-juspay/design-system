# Juspay Design System

A comprehensive design system for Juspay that provides a consistent and scalable design language across all products and platforms.

## Overview

This design system is built using React, TypeScript, and Vite, providing a robust foundation for creating reusable UI components and maintaining design consistency. The system includes:

- Design tokens (colors, typography, spacing, etc.)
- Component library
- Documentation
- Development guidelines

## Project Structure

```
design-system/
├── src/
│   ├── tokens/         # Design tokens from Figma
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and theme
│   └── utils/          # Utility functions and helpers
├── docs/              # Documentation
└── examples/          # Example implementations
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build
```

## Design Tokens

The design system includes tokens extracted from Figma, including:

- Colors
- Typography
- Spacing
- Shadows
- Border radius
- Breakpoints
- And more...

## Component Library

Our component library includes:

- Basic UI elements (buttons, inputs, etc.)
- Complex components (forms, modals, etc.)
- Layout components
- Navigation components
- Data display components

## Usage

```jsx
import { Button, Input } from '@juspay/design-system';

function MyComponent() {
  return (
    <div>
      <Input placeholder="Enter text" />
      <Button>Click me</Button>
    </div>
  );
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow the established component patterns
- Write tests for new components
- Update documentation for any changes
- Ensure accessibility compliance
- Follow the naming conventions

## License

This project is proprietary and confidential. All rights reserved.
