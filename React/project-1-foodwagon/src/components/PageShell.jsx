import Footer from './Footer.jsx'

/**
 * Shared layout for footer-linked static pages (Navbar comes from App).
 * Keeps Footer on these routes without changing Home.
 */
function PageShell({ children, className = '' }) {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] flex-col bg-white">
      <div className={`mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 ${className}`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default PageShell
