import { Link } from '@tanstack/react-router'
import { useAtomValue } from 'jotai/react'
import { isMacAtom } from '@/lib/atoms'
import { CommandIcon } from 'lucide-react'

export default function Navbar() {
  const isMacUser = useAtomValue(isMacAtom)
  return (
    <header className="sticky z-20 top-0 bg-secondary">
      <nav className="h-20 w-screen flex justify-between items-center px-8">
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:text-primary/70"
        >
          Bookmarks
        </Link>
        <Link
          to="/add"
          className="group text-secondary-foreground hover:text-secondary-foreground/70 flex items-center gap-2"
        >
          Add Bookmark
          {isMacUser ? (
            <div className="flex items-center text-secondary-foreground/60 group-hover:text-secondary-foreground/40">
              <CommandIcon className="size-4" />K
            </div>
          ) : (
            <div className="flex items-center text-secondary-foreground/60">
              Ctrl+K
            </div>
          )}
        </Link>
      </nav>
    </header>
  )
}
