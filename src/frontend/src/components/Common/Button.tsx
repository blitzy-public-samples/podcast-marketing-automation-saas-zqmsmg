import React from 'react';
import classNames from 'classnames';

// Import the ButtonProps type from the types file
import { ButtonProps } from '../../types';

/**
 * Button component for the Podcast Marketing Automation SaaS platform frontend.
 * This component provides a consistent look and feel for buttons across the application,
 * with customizable properties for different use cases.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className,
  ...rest
}) => {
  // Generate class names based on variant, size, and fullWidth props
  const buttonClasses = classNames(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--full-width': fullWidth,
    },
    className
  );

  // Return a button element with the generated class names and other props
  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;

// Human tasks:
// TODO: Review and adjust button styles to match the design system
// TODO: Consider adding additional variants or sizes if needed for specific use cases
// TODO: Implement unit tests for the Button component