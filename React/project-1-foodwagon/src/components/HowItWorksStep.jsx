import Icon from './Icon.jsx'

function HowItWorksStep({ icon, title, description }) {
  return (
    <article className="mx-auto flex max-w-[14rem] flex-col items-center text-center">
      <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-primary-light/25 text-primary">
        <Icon name={icon} className="h-10 w-10" />
      </div>
      <h3 className="mt-5 font-heading text-lg font-bold text-text-dark">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-gray">{description}</p>
    </article>
  )
}

export default HowItWorksStep
