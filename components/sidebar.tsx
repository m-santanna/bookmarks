import { useSetAtom, useAtomValue } from 'jotai/react'
import { bookmarksAtom, categoryAtom } from '@/lib/atoms'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import ImportButton from './import-button'
import ExportButton from './export-button'

export default function Sidebar({ className }: { className?: string }) {
  const bookmarks = useAtomValue(bookmarksAtom)
  const setCategory = useSetAtom(categoryAtom)
  const filteredCategories = Array.from(
    new Set(bookmarks.map((bookmark) => bookmark.category)),
  )

  return (
    <div
      className={cn(
        'min-h-screen w-[150px] md:w-1/5 border-r border-muted p-4 flex flex-col gap-4',
        className,
      )}
    >
      <h1 className="text-2xl font-bold text-center">Your Categories</h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => {
              setCategory('all')
            }}
            className="bg-muted text-muted-foreground p-2 rounded-lg"
          >
            All
          </Button>
          {filteredCategories.map((category) => (
            <Button
              key={category}
              onClick={() => {
                setCategory(category)
              }}
              className="bg-muted text-muted-foreground p-2 rounded-lg"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <ImportButton />
          <ExportButton />
        </div>
      </div>
    </div>
  )
}
