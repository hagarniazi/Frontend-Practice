/**
 * Lightweight loading indicator for section-level fetches.
 */
function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-bg-cream border-t-primary"
        aria-hidden="true"
      />
      <p className="text-sm text-text-gray">{label}</p>
    </div>
  )
}

export default Spinner
