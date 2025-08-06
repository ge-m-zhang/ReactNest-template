import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useId } from 'react';
import { cn } from '../../tools/classNames';

/**
 * TextArea Component
 *
 * A customizable textarea input with validation and helper text support.
 * Built with accessibility in mind and styled with Tailwind CSS.
 *
 * @features
 * - Multiple sizes: small, medium, large
 * - Error and success states
 * - Helper text support
 * - Resizable control
 * - Full width option
 * - Auto-resize functionality
 * - Accessible with proper ARIA attributes
 * - Character count support
 */

const textAreaVariants = cva(
  'border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-gray-400',
  {
    variants: {
      size: {
        small: 'px-3 py-1.5 text-sm min-h-[60px]',
        medium: 'px-3 py-2 text-base min-h-[80px]',
        large: 'px-4 py-3 text-lg min-h-[100px]',
      },
      state: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
        success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      disabled: {
        true: 'bg-gray-50 text-gray-500 cursor-not-allowed',
        false: 'bg-white hover:border-gray-400',
      },
      resizable: {
        true: 'resize-both',
        false: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
      fullWidth: false,
      disabled: false,
      resizable: 'vertical',
    },
  },
);

const helperTextVariants = cva('text-sm mt-1', {
  variants: {
    state: {
      default: 'text-gray-600',
      error: 'text-red-600',
      success: 'text-green-600',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

const characterCountVariants = cva('text-xs mt-1 text-right', {
  variants: {
    state: {
      default: 'text-gray-500',
      warning: 'text-yellow-600',
      error: 'text-red-600',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

type TextAreaBaseProps = VariantProps<typeof textAreaVariants>;

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'disabled'>,
    TextAreaBaseProps {
  error?: string;
  helperText?: string;
  label?: string;
  hiddenLabel?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  autoResize?: boolean;
  wrapperClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      state: stateProp,
      fullWidth,
      disabled,
      resizable,
      error,
      helperText,
      label,
      hiddenLabel = false,
      maxLength,
      showCharacterCount = false,
      autoResize = false,
      id,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    // Determine state based on error prop
    const state = error ? 'error' : stateProp || 'default';

    // Generate ID if not provided
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const countId = `${textareaId}-count`;

    // Character count logic
    const currentLength = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength && currentLength / maxLength > 0.8;
    const isOverLimit = maxLength && currentLength > maxLength;

    const characterCountState = isOverLimit ? 'error' : isNearLimit ? 'warning' : 'default';

    // Auto-resize functionality
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
      onChange?.(e);
    };

    // Auto-resize effect for controlled components
    React.useEffect(() => {
      if (autoResize && ref && 'current' in ref && ref.current) {
        const textarea = ref.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize, ref]);

    return (
      <div className={cn('relative', fullWidth && 'w-full', wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn('block text-sm font-medium text-gray-700 mb-1', hiddenLabel && 'sr-only')}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textAreaVariants({
              size,
              state,
              fullWidth,
              disabled,
              resizable: autoResize ? false : resizable,
            }),
            autoResize && 'overflow-hidden',
            className,
          )}
          style={{
            // Fallback for resize if Tailwind classes don't work
            ...(!autoResize && resizable === 'horizontal' && { resize: 'horizontal' }),
            ...(!autoResize && resizable === 'vertical' && { resize: 'vertical' }),
            ...(!autoResize && resizable === true && { resize: 'both' }),
            ...(!autoResize && resizable === false && { resize: 'none' }),
            ...props.style,
          }}
          disabled={!!disabled}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            [error && errorId, helperText && !error && helperId, showCharacterCount && countId]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />

        {/* Error message */}
        {error && (
          <div id={errorId} className={helperTextVariants({ state: 'error' })}>
            {error}
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <div id={helperId} className={helperTextVariants({ state })}>
            {helperText}
          </div>
        )}

        {/* Character count */}
        {showCharacterCount && (
          <div id={countId} className={characterCountVariants({ state: characterCountState })}>
            {currentLength}
            {maxLength && `/${maxLength}`}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

// Predefined TextArea variants for common use cases
export const CommentTextArea = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'placeholder'>>(
  (props, ref) => (
    <TextArea
      ref={ref}
      placeholder="Write a comment..."
      rows={3}
      autoResize
      showCharacterCount
      maxLength={500}
      {...props}
    />
  ),
);

CommentTextArea.displayName = 'CommentTextArea';

export const MessageTextArea = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'placeholder'>>(
  (props, ref) => (
    <TextArea
      ref={ref}
      placeholder="Type your message..."
      rows={4}
      autoResize
      resizable="vertical"
      {...props}
    />
  ),
);

MessageTextArea.displayName = 'MessageTextArea';

export const CodeTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => (
    <TextArea
      ref={ref}
      className={cn('font-mono text-sm', className)}
      resizable={true}
      spellCheck={false}
      {...props}
    />
  ),
);

CodeTextArea.displayName = 'CodeTextArea';
