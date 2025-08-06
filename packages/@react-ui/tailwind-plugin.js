const plugin = require('tailwindcss/plugin');
const path = require('path');

/**
 * Tailwind plugin for @gmzh/react-ui.
 *
 * @param {Object} [options] - Plugin options.
 * @param {string|string[]} [options.contentPath] - Optional: Override the default content path(s) to scan for Tailwind classes.
 */
module.exports = plugin.withOptions(
  // Plugin function - adds utilities/components
  function (options = {}) {
    return function ({ addUtilities, addComponents, theme }) {
      // Only add utilities that components specifically need
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
    };
  },
  // Plugin config - extends user's existing config
  function (options = {}) {
    // Allow user to override content path via options.contentPath
    let contentPaths;
    if (options.contentPath) {
      contentPaths = Array.isArray(options.contentPath)
        ? options.contentPath
        : [options.contentPath];
    } else {
      try {
        // Only scan package files
        contentPaths = [
          path.join(path.dirname(require.resolve('@gmzh/react-ui')), '**/*.{js,ts,jsx,tsx}'),
        ];
      } catch (e) {
        // @gmzh/react-ui not found; skip adding its content path
        console.warn(
          '[react-ui/tailwind-plugin] Warning: @gmzh/react-ui not found. Skipping content path.',
        );
        contentPaths = [];
      }
    }
    return {
      // IMPORTANT: Use content, not replace
      content: contentPaths,
      theme: {
        // Use 'extend' to avoid conflicts
        extend: {
          // Only add what's truly needed for components
          animation: {
            'spin-slow': 'spin 2s linear infinite',
          },
          // Don't override core theme values unless absolutely necessary
        },
      },
    };
  },
);
