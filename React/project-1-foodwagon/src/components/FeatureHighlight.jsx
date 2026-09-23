import Icon from './Icon.jsx'

function FeatureHighlight({ icon, title }) {
  return (
    <article className="flex items-center justify-center gap-3 px-4 py-5 sm:px-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light/20 text-primary">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="font-heading text-sm font-bold text-text-dark sm:text-base">{title}</span>
    </article>
  )
}

export default FeatureHighlight
