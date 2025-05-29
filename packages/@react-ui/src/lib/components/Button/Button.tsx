// packages/ui/src/lib/components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../tools/classNames';

/**
 * Button Component
 *
 * A fully implemented, highly customizable button component with multiple variants,
 * sizes, and colors. Built with accessibility in mind and styled with Tailwind CSS.
 *
 *
 * @features
 * - Multiple variants: contained, outlined, text
 * - Multiple sizes: tiny, small, medium, large
 * - Multiple colors: blue, shade, teal, violet, purple, green, red, gold, gray
 * - Icon support: startIcon and endIcon props
 * - Loading state with customizable loading text
 * - Full width option
 * - Accessible with proper ARIA attributes
 * - Keyboard navigation support
 * - Focus and hover states
 * - Disabled state styling
 * - Customizable through className prop
 */

export const ButtonColors = [
  'blue',
  'shade',
  'teal',
  'violet',
  'purple',
  'green',
  'red',
  'gold',
  'gray',
] as const;

export type ButtonColor = (typeof ButtonColors)[number];

// Button variants using class-variance-authority
const buttonVariants = cva(
  // Base classes - always applied
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-md',
    'text-sm',
    'font-medium',
    'transition-all',
    'duration-200',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        contained: ['text-white', 'border', 'shadow-sm', 'hover:shadow-md', 'active:shadow-inner'],
        outlined: ['bg-white', 'border', 'hover:shadow-sm', 'active:shadow-inner'],
        text: [
          'bg-transparent',
          'border',
          'border-transparent',
          'hover:shadow-sm',
          'active:shadow-inner',
        ],
      },
      size: {
        tiny: 'h-6 px-1.5 text-xs rounded',
        small: 'h-8 px-2.5 text-xs',
        medium: 'h-10 px-4 text-sm',
        large: 'h-11 px-5.5 text-base',
      },
      color: {
        blue: '',
        shade: '',
        teal: '',
        violet: '',
        purple: '',
        green: '',
        red: '',
        gold: '',
        gray: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Contained variant color combinations
      {
        variant: 'contained',
        color: 'blue',
        class: [
          'bg-blue-500',
          'border-blue-500',
          'hover:bg-blue-600',
          'hover:border-blue-600',
          'focus-visible:ring-blue-500',
          'active:bg-blue-700',
        ],
      },
      {
        variant: 'contained',
        color: 'shade',
        class: [
          'bg-indigo-600',
          'border-indigo-600',
          'hover:bg-indigo-700',
          'hover:border-indigo-700',
          'focus-visible:ring-indigo-600',
          'active:bg-indigo-800',
        ],
      },
      {
        variant: 'contained',
        color: 'teal',
        class: [
          'bg-teal-500',
          'border-teal-500',
          'hover:bg-teal-600',
          'hover:border-teal-600',
          'focus-visible:ring-teal-500',
          'active:bg-teal-700',
        ],
      },
      {
        variant: 'contained',
        color: 'violet',
        class: [
          'bg-violet-600',
          'border-violet-600',
          'hover:bg-violet-700',
          'hover:border-violet-700',
          'focus-visible:ring-violet-600',
          'active:bg-violet-800',
        ],
      },
      {
        variant: 'contained',
        color: 'purple',
        class: [
          'bg-purple-600',
          'border-purple-600',
          'hover:bg-purple-700',
          'hover:border-purple-700',
          'focus-visible:ring-purple-600',
          'active:bg-purple-800',
        ],
      },
      {
        variant: 'contained',
        color: 'green',
        class: [
          'bg-green-600',
          'border-green-600',
          'hover:bg-green-700',
          'hover:border-green-700',
          'focus-visible:ring-green-600',
          'active:bg-green-800',
        ],
      },
      {
        variant: 'contained',
        color: 'red',
        class: [
          'bg-red-600',
          'border-red-600',
          'hover:bg-red-700',
          'hover:border-red-700',
          'focus-visible:ring-red-600',
          'active:bg-red-800',
        ],
      },
      {
        variant: 'contained',
        color: 'gold',
        class: [
          'bg-yellow-500',
          'border-yellow-500',
          'hover:bg-yellow-600',
          'hover:border-yellow-600',
          'focus-visible:ring-yellow-500',
          'active:bg-yellow-700',
        ],
      },
      {
        variant: 'contained',
        color: 'gray',
        class: [
          'bg-gray-600',
          'border-gray-600',
          'hover:bg-gray-700',
          'hover:border-gray-700',
          'focus-visible:ring-gray-600',
          'active:bg-gray-800',
        ],
      },

      // Outlined variant color combinations
      {
        variant: 'outlined',
        color: 'blue',
        class: [
          'text-blue-600',
          'border-blue-600',
          'hover:bg-blue-50',
          'focus-visible:ring-blue-600',
          'active:bg-blue-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'shade',
        class: [
          'text-indigo-600',
          'border-indigo-600',
          'hover:bg-indigo-50',
          'focus-visible:ring-indigo-600',
          'active:bg-indigo-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'teal',
        class: [
          'text-teal-600',
          'border-teal-600',
          'hover:bg-teal-50',
          'focus-visible:ring-teal-600',
          'active:bg-teal-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'violet',
        class: [
          'text-violet-600',
          'border-violet-600',
          'hover:bg-violet-50',
          'focus-visible:ring-violet-600',
          'active:bg-violet-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'purple',
        class: [
          'text-purple-600',
          'border-purple-600',
          'hover:bg-purple-50',
          'focus-visible:ring-purple-600',
          'active:bg-purple-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'green',
        class: [
          'text-green-600',
          'border-green-600',
          'hover:bg-green-50',
          'focus-visible:ring-green-600',
          'active:bg-green-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'red',
        class: [
          'text-red-600',
          'border-red-600',
          'hover:bg-red-50',
          'focus-visible:ring-red-600',
          'active:bg-red-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'gold',
        class: [
          'text-yellow-600',
          'border-yellow-600',
          'hover:bg-yellow-50',
          'focus-visible:ring-yellow-600',
          'active:bg-yellow-100',
        ],
      },
      {
        variant: 'outlined',
        color: 'gray',
        class: [
          'text-gray-600',
          'border-gray-600',
          'hover:bg-gray-50',
          'focus-visible:ring-gray-600',
          'active:bg-gray-100',
        ],
      },

      // Text variant color combinations
      {
        variant: 'text',
        color: 'blue',
        class: [
          'text-blue-600',
          'hover:bg-blue-50',
          'focus-visible:ring-blue-600',
          'active:bg-blue-100',
        ],
      },
      {
        variant: 'text',
        color: 'shade',
        class: [
          'text-indigo-600',
          'hover:bg-indigo-50',
          'focus-visible:ring-indigo-600',
          'active:bg-indigo-100',
        ],
      },
      {
        variant: 'text',
        color: 'teal',
        class: [
          'text-teal-600',
          'hover:bg-teal-50',
          'focus-visible:ring-teal-600',
          'active:bg-teal-100',
        ],
      },
      {
        variant: 'text',
        color: 'violet',
        class: [
          'text-violet-600',
          'hover:bg-violet-50',
          'focus-visible:ring-violet-600',
          'active:bg-violet-100',
        ],
      },
      {
        variant: 'text',
        color: 'purple',
        class: [
          'text-purple-600',
          'hover:bg-purple-50',
          'focus-visible:ring-purple-600',
          'active:bg-purple-100',
        ],
      },
      {
        variant: 'text',
        color: 'green',
        class: [
          'text-green-600',
          'hover:bg-green-50',
          'focus-visible:ring-green-600',
          'active:bg-green-100',
        ],
      },
      {
        variant: 'text',
        color: 'red',
        class: [
          'text-red-600',
          'hover:bg-red-50',
          'focus-visible:ring-red-600',
          'active:bg-red-100',
        ],
      },
      {
        variant: 'text',
        color: 'gold',
        class: [
          'text-yellow-600',
          'hover:bg-yellow-50',
          'focus-visible:ring-yellow-600',
          'active:bg-yellow-100',
        ],
      },
      {
        variant: 'text',
        color: 'gray',
        class: [
          'text-gray-600',
          'hover:bg-gray-50',
          'focus-visible:ring-gray-600',
          'active:bg-gray-100',
        ],
      },
    ],
    defaultVariants: {
      variant: 'contained',
      size: 'medium',
      color: 'blue',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth,
      startIcon,
      endIcon,
      loading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // Get gap classes based on size
    const getGapClass = (size: ButtonProps['size']) => {
      if (size === 'tiny') return 'gap-1';
      return 'gap-2.5';
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, color, fullWidth }),
          getGapClass(size),
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText || children}
          </>
        ) : (
          <>
            {startIcon && <span className="flex items-center">{startIcon}</span>}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
