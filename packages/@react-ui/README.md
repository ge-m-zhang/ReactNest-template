# @gmzh/react-ui

A comprehensive React UI component library built with TypeScript, Tailwind CSS, and designed for modern web applications. Features a complete set of accessible, customizable components with full Storybook documentation.

## Installation

```bash
npm install @gmzh/react-ui
# or
pnpm add @gmzh/react-ui
# or
yarn add @gmzh/react-ui
```

## Quick Start

```tsx
import { Button, Alert, TextField, Switch, Tooltip } from '@gmzh/react-ui';

function App() {
  return (
    <div className="p-6 space-y-4">
      {/* Buttons with different variants */}
      <Button variant="contained" color="primary">
        Primary Action
      </Button>

      {/* Form inputs */}
      <TextField label="Email" type="email" placeholder="Enter your email" fullWidth />

      {/* Interactive components */}
      <div className="flex items-center gap-3">
        <Switch defaultChecked />
        <span>Enable notifications</span>
      </div>

      {/* Feedback components */}
      <Alert variant="success">Account created successfully!</Alert>

      {/* Enhanced with tooltips */}
      <Tooltip content="Click to save your changes">
        <Button variant="outlined">Save Draft</Button>
      </Tooltip>
    </div>
  );
}
```

## 🧩 Available Components

### Layout & Structure - Flexible layout system

- **Box** - Universal container with spacing, colors, layout utilities, borders, and shadows
- **Flex** - Powerful flexbox component with direction, gap, alignment, wrapping, and responsive controls

### Navigation - User-friendly navigation

- **Tabs** - Tabbed interfaces with 3 variants (outlined, underlined, pills) and compound component pattern

### Form Controls - Complete form solution

- **Button** - Multiple variants (contained, outlined, text), sizes, colors, icon support, and loading states
- **TextField** - Text inputs with validation, symbols, helper text, and multiple input types
- **TextArea** - Multi-line inputs with auto-resize, character counting, and flexible resizing
- **Checkbox** - Customizable checkboxes with indeterminate state support and custom icons
- **Switch** - Modern toggle switches with multiple sizes and colors

### Typography - Rich text system

- **Typography** - Comprehensive text component with heading levels (h1-h6), variants, alignment, and styling options

### Feedback & Information - Rich user interaction

- **Alert** - Contextual feedback messages (success, error, warning, info) with proper styling
- **Badge** - Status indicators and color-coded labels

- **Tooltip** - Contextual information with 12 placement options, multiple triggers, and variants
- **Spinner** - Loading indicators with multiple sizes, colors, and text positioning

### 🚧 Future Components (Planned)

Additional components are planned for future releases, including Card, Modal, Table, Select, Radio, and more navigation components. All placeholder components marked with `@todo` in the codebase are not yet implemented.

### Theme & System

- **ThemeProvider** - Dark/light mode support with system preference detection

## 🎨 Component Features

### Accessibility First

- Full ARIA support and keyboard navigation
- Screen reader optimized
- Focus management and visible focus indicators
- Color contrast compliance

### Customization

- **Variants**: Multiple visual styles for each component
- **Sizes**: Consistent sizing scale (xs, sm, md, lg, xl)
- **Colors**: Full color palette with semantic meanings
- **States**: Error, success, warning, disabled, loading states

### Developer Experience

- **TypeScript**: Full type safety and IntelliSense support
- **Storybook**: Interactive documentation and component playground
- **Consistent API**: Predictable prop patterns across all components
- **Tree-shakable**: Import only what you need

## 📚 Documentation

Explore all components interactively in Storybook:

```bash
# Run Storybook locally
pnpm --filter storybook-react-ui dev
```

Each component includes:

- **Interactive examples** with all variants and states
- **Code snippets** for easy copy-paste
- **Props documentation** with TypeScript definitions
- **Accessibility guidelines** and usage patterns

## 🎯 Advanced Usage

### Form Integration

```tsx
import { TextField, TextArea, Checkbox, Switch, Button, Alert } from '@gmzh/react-ui';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', message: '', terms: false });
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        helperText="Enter your full name"
        fullWidth
      />

      <TextArea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={4}
        maxLength={500}
        showCharacterCount
        autoResize
        fullWidth
      />

      <div className="flex items-center gap-3">
        <Checkbox
          checked={formData.terms}
          onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
          required
        />
        <span>I agree to the terms and conditions</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch defaultChecked />
        <span>Subscribe to newsletter</span>
      </div>

      {showSuccess && <Alert variant="success">Your message has been sent successfully!</Alert>}

      <Button type="submit" variant="contained" fullWidth>
        Send Message
      </Button>
    </form>
  );
}
```

### Layout Composition

```tsx
import { Box, Flex, Typography, Button, Badge, Tabs } from '@gmzh/react-ui';

function Dashboard() {
  return (
    <Box padding="lg" background="white" rounded="lg" shadow="md">
      <Flex direction="column" gap="lg">
        <Flex justify="between" align="center">
          <Typography variant="h2">Dashboard</Typography>
          <Badge variant="success">Online</Badge>
        </Flex>

        <Tabs.Context defaultValue="overview" variant="underlined">
          <Tabs.List>
            <Tabs value="overview">Overview</Tabs>
            <Tabs value="analytics">Analytics</Tabs>
            <Tabs value="settings">Settings</Tabs>
          </Tabs.List>

          <Tabs.Content>
            <Tabs.Panel value="overview">
              <Flex direction="column" gap="md">
                <Typography variant="body1">Welcome to your dashboard</Typography>
                <Button variant="contained" color="primary">
                  Get Started
                </Button>
              </Flex>
            </Tabs.Panel>

            <Tabs.Panel value="analytics">
              <Typography variant="body1">Analytics content goes here</Typography>
            </Tabs.Panel>

            <Tabs.Panel value="settings">
              <Typography variant="body1">Settings panel</Typography>
            </Tabs.Panel>
          </Tabs.Content>
        </Tabs.Context>
      </Flex>
    </Box>
  );
}
```

## 🔧 Development

This package is built with modern tools and best practices:

### Core Technologies

- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling system
- **Class Variance Authority** - Component variant management
- **Storybook** - Component documentation and testing

### Key Dependencies

- `class-variance-authority` - Variant-based component styling
- `tailwind-merge` - Intelligent Tailwind class merging
- `@headlessui/react` - Unstyled accessible components

### Scripts

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Run linting
pnpm lint

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean

# Run Storybook
pnpm storybook
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:

- Component design principles
- Code style and conventions
- Testing requirements
- Documentation standards

## 📝 License

MIT - see LICENSE file for details
