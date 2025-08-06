const plugin = require('tailwindcss/plugin');
const path = require('path');

module.exports = plugin(
  // Plugin function - adds utilities/components
  function ({ addUtilities, addComponents, theme }) {
    // Only add utilities that your components specifically need
    // Don't override existing Tailwind utilities
    addComponents({
      // Custom component styles if needed
      '.react-ui-focus-ring': {
        '&:focus-visible': {
          outline: '2px solid theme("colors.blue.500")',
          outlineOffset: '2px',
        },
      },
    });
  },

  // Plugin config - extends user's existing config
  {
    // IMPORTANT: Use content, not replace
    content: [
      // Only scan your package files
      path.join(path.dirname(require.resolve('@gmzh/react-ui')), '**/*.{js,ts,jsx,tsx}'),
    ],

    theme: {
      // Use 'extend' to avoid conflicts
      extend: {
        // Only add what's truly needed for your components
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        },
        // Don't override core theme values unless absolutely necessary
      },
    },
  },
);
