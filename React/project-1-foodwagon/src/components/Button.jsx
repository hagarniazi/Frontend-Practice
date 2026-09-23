import Icon from './Icon.jsx'

function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  icon,
  type = 'button',
  disabled = false,
}) {
  const variants = {
    primary:
      'bg-primary text-white shadow-cta hover:bg-warning active:scale-[0.98]',
    outline:
      'border border-primary bg-white text-primary hover:bg-bg-cream active:scale-[0.98]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-heading text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </button>
  )
}

export default Button
