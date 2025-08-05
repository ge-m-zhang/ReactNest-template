# @react-ui

A React UI component library built with TypeScript and Tailwind CSS.

## Installation

```bash
pnpm add github:ge-m-zhang/ReactNest-template#main
```

## Usage

```tsx
import { Button, Alert, Badge, Box } from '@react-ui';

function App() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Click me
      </Button>

      <Alert variant="success">This is a success message</Alert>

      <Badge variant="primary">New</Badge>

      <Box padding="md" background="gray" rounded="lg">
        Content here
      </Box>
    </div>
  );
}
```

## Available Components

- **Button** - Multiple variants, sizes, and colors
- **Alert** - Success, error, warning, and info variants
- **Badge** - Color-coded badges
- **Box** - Flexible layout component
- **ThemeProvider** - Dark/light mode support

## License

MIT
