import React from 'react';
import classNames from 'classnames';

// Define the InputProps interface
interface InputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

/**
 * A reusable Input component for forms in the Podcast Marketing Automation SaaS platform.
 * This component provides a standardized input field with customizable props for various form scenarios.
 */
const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  placeholder,
  label,
  required,
  disabled,
  className,
  onChange,
  onBlur,
  error,
}) => {
  // Generate class names based on props using classNames utility
  const inputClasses = classNames(
    'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    {
      'border-gray-300': !error,
      'border-red-500': error,
      'bg-gray-100': disabled,
    },
    className
  );

  // Generate label class names
  const labelClasses = classNames('block mb-1 font-medium', {
    'text-gray-700': !error,
    'text-red-500': error,
  });

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
```

This implementation of the Input component follows the specifications provided in the JSON representation. Here's a breakdown of the code:

1. We import the necessary dependencies: React and classNames.
2. We define the `InputProps` interface with all the properties specified in the JSON.
3. The `Input` component is created as a functional component using React.FC with InputProps.
4. We use the `classNames` utility to generate dynamic class names based on the component's props.
5. The component renders a label (if provided) and an input element with all the specified props.
6. Error handling is implemented, displaying an error message when the `error` prop is provided.
7. Accessibility attributes (aria-invalid and aria-describedby) are added to improve the component's accessibility.

Human tasks (commented within the file):

```typescript
/**
 * Human tasks:
 * 1. Ensure the Input component adheres to the design system and accessibility guidelines (Required)
 * 2. Add unit tests for the Input component (Required)
 * 3. Consider adding support for different input variants (e.g., outlined, filled) if required by the design (Optional)
 */