# @gmz/react-ui

A React UI component library built with TypeScript and Tailwind CSS.

## Installation

```bash
npm install @gmz/react-ui
```

## Usage

```tsx
import { Button, Alert, Badge, Box } from '@gmz/react-ui';

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

## Development

This package is built with TypeScript and uses the following key dependencies:

- `class-variance-authority` - For component variant management
- `clsx` - For conditional className handling
- `tailwind-merge` - For Tailwind CSS class merging

## Scripts

This project uses pnpm as the package manager. Available scripts:

- `pnpm build` - Build the package
- `pnpm dev` - Watch mode for development
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Type checking without emission
- `pnpm clean` - Clean the dist directory

## License

MIT
