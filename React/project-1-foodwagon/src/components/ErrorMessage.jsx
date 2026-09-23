/**
 * Section-level error / empty banner.
 * Pass title for empty states (e.g. "No meals found") vs load failures.
 */
function ErrorMessage({
  title = 'Unable to load this section',
  message = 'Something went wrong. Please try again.',
}) {
  return (
    <div
      className="rounded-2xl border border-warning/30 bg-warning-bg px-4 py-6 text-center"
      role="alert"
    >
      <p className="font-heading text-sm font-semibold text-text-dark">{title}</p>
      <p className="mt-2 text-sm text-text-gray">{message}</p>
    </div>
  )
}

export default ErrorMessage
