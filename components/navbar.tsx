import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <header className="sticky z-20 top-0 bg-secondary">
      <nav className="h-20 w-screen flex justify-between items-center px-8">
        <Link to="/" className="text-2xl font-bold text-primary">
          Bookmarks
        </Link>
        <Link to="/add" className="bg-clip-text text-secondary-foreground">
          Add Bookmark
        </Link>
      </nav>
    </header>
  )
}
