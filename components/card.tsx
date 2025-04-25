import { Link } from '@tanstack/react-router'
import { Bookmark } from '@/lib/utils'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useSetAtom } from 'jotai/react'
import { bookmarksAtom } from '@/lib/atoms'

export function BookmarkCard(bookmark: Bookmark) {
  const setBookmarks = useSetAtom(bookmarksAtom)
  const handleDelete = () => {
    setBookmarks((prev) => prev.filter((b) => b.url !== bookmark.url))
  }
  return (
    <div className="relative">
      <Button
        className="bg-muted absolute top-2 right-2"
        onClick={handleDelete}
      >
        <Trash className="size-5" />
      </Button>
      <Link
        to={bookmark.url}
        key={bookmark.name}
        target="_blank"
        className="flex flex-col border rounded-xl p-4 bg-secondary text-secondary-foreground hover:bg-primary/25 transition-colors duration-300"
      >
        <h1 className="text-primary font-bold text-3xl text-center mb-4">
          {bookmark.name}
        </h1>
        <p className="font-thin text-center">{bookmark.category}</p>
        <p className="font-thin text-center truncate">{bookmark.url}</p>
      </Link>
    </div>
  )
}
