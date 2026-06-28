import { useMagnetic } from '../hooks/useMagnetic.js';

/**
 * Premium magnetic CTA. Renders an <a> by default (for tel:/wa.me/anchor links)
 * or a <button> when `as="button"`. The magnetic pull is pointer-only.
 */
export default function MagneticButton({
  as = 'a',
  className = '',
  variant = 'primary',
  strength,
  children,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(
    strength ? { strength } : undefined
  );
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`btn btn-${variant} magnetic ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <span className="magnetic-label">{children}</span>
    </Tag>
  );
}
