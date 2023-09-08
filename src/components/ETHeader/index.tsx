export default function ETHeader (): JSX.Element {
  return <header>
    <div className="fixed inset-x-0 top-0 z-[9] h-[4.5rem] overflow-hidden transition-shadow duration-200 shadow-none shadow-neutral-100 dark:shadow-neutral-800/50 lg:shadow-sm">
      <div className="absolute inset-0 transform-gpu [-webkit-backdrop-filter:saturate(180%)_blur(20px)] [backdrop-filter:saturate(180%)_blur(20px)] [backface-visibility:hidden] bg-themed-bg_opacity [border-bottom:1px_solid_rgb(187_187_187_/_20%)]" >
      </div>
      <div className="relative z-[1] flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2">
            {/* <img src="/logo.svg" alt="logo" className="w-8 h-8" /> */}
            <span className="text-lg font-bold">一晌贪欢</span>
          </a>
        </div>
        <div className="hidden space-x-4 lg:flex  items-center flex-1 justify-center">
        <nav className=" space-x-4 flex  items-center ring-1 rounded-full">
            <a href="/" className="text-lg font-bold">Home</a>
            <a href="/blog" className="text-lg font-bold">Blog</a>
            <a href="/moment" className="text-lg font-bold">Moment</a>
            <a href="/about" className="text-lg font-bold">About</a>
            <a href="/contact" className="text-lg font-bold">Contact</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/search" className="text-lg font-bold">Search</a>
          <a href="/login" className="text-lg font-bold">Login</a>
          <a href="/register" className="text-lg font-bold">Register</a>
        </div>
        </div>
    </div>
  </header>
}
