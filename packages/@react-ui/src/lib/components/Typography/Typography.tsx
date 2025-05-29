// packages/@react-ui/src/lib/components/Typography/Typography.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { cn } from '../../tools/classNames';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption';

// Variant mapping for element types
const variantElementMap: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'p',
} as const;

// Typography variants using class-variance-authority
const typographyVariants = cva(
  // Base classes - always applied
  ['font-inherit', 'text-inherit', 'transition-colors'],
  {
    variants: {
      variant: {
        h1: [
          'text-4xl md:text-5xl', // Responsive scaling
          'font-bold',
          'leading-[1.2]', // More precise line height
          'tracking-tight', // Better letter spacing for headings
        ],
        h2: ['text-3xl md:text-4xl', 'font-bold', 'leading-[1.2]', 'tracking-tight'],
        h3: ['text-2xl md:text-3xl', 'font-bold', 'leading-[1.3]', 'tracking-tight'],
        h4: ['text-xl md:text-2xl', 'font-bold', 'leading-[1.3]', 'tracking-tight'],
        h5: ['text-lg md:text-xl', 'font-bold', 'leading-[1.4]', 'tracking-tight'],
        h6: ['text-base md:text-lg', 'font-bold', 'leading-[1.4]', 'tracking-tight'],
        subtitle1: ['text-base md:text-lg', 'font-semibold', 'leading-[1.5]', 'tracking-normal'],
        subtitle2: ['text-sm md:text-base', 'font-semibold', 'leading-[1.5]', 'tracking-normal'],
        body1: [
          'text-base', // 16px - optimal for body text
          'font-normal',
          'leading-[1.6]', // Improved readability
          'tracking-normal',
        ],
        body2: ['text-sm', 'font-normal', 'leading-[1.6]', 'tracking-normal'],
        caption: ['text-xs', 'font-normal', 'leading-[1.5]', 'tracking-normal'],
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
        inherit: '',
      },
      noWrap: {
        true: ['whitespace-nowrap', 'overflow-hidden', 'text-ellipsis'],
        false: '',
      },
      bold: {
        true: 'font-bold',
        false: '',
      },
      hyperlink: {
        true: ['cursor-pointer', 'hover:underline', 'transition-all', 'duration-200'],
        false: '',
      },
      strikethrough: {
        true: 'line-through',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'body1',
      align: 'inherit',
      noWrap: false,
      bold: false,
      hyperlink: false,
      strikethrough: false,
    },
  },
);

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      align = 'inherit',
      noWrap = false,
      bold = false,
      hyperlink = false,
      strikethrough = false,
      as,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Determine the element type
    const Element = as || variantElementMap[variant || 'body1'];

    return React.createElement(
      Element,
      {
        ref,
        className: cn(
          typographyVariants({
            variant,
            align,
            noWrap,
            bold,
            hyperlink,
            strikethrough,
          }),
          className,
        ),
        ...props,
      },
      children,
    );
  },
);

Typography.displayName = 'Typography';
