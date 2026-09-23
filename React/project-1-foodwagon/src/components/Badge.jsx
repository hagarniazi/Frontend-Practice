import Icon from './Icon.jsx'

function Badge({ text, type = 'discount' }) {
  const styles = {
    discount: { className: 'bg-primary text-white', icon: 'tag' },
    fast: { className: 'bg-primary-light text-text-dark', icon: 'bolt' },
    open: { className: 'bg-success-bg text-success', icon: 'clock' },
    tomorrow: { className: 'bg-warning-bg text-warning', icon: 'clock' },
    info: { className: 'bg-bg-cream text-text-dark', icon: 'tag' },
  }
  const style = styles[type] || styles.discount
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-heading text-xs font-semibold ${style.className}`}
    >
      <Icon name={style.icon} className="h-3.5 w-3.5" />
      {text}
    </span>
  )
}

export default Badge
