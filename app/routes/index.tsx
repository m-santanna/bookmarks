import { createFileRoute } from '@tanstack/react-router'
import { useAtomValue, useSetAtom } from 'jotai/react'
import {
  bookmarksAtom,
  categoryAtom,
  dialogOpenAtom,
  isMacAtom,
} from '@/lib/atoms'
import { BookmarkCard } from '@/components/card'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import Sidebar from '@/components/sidebar'
import BookmarkDialog from '@/components/bookmark-dialog'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [progress, setProgress] = useState(0)
  const setIsMacUser = useSetAtom(isMacAtom)
  const setDialogOpen = useSetAtom(dialogOpenAtom)
  const bookmarks = useAtomValue(bookmarksAtom)
  const category = useAtomValue(categoryAtom)

  useEffect(() => {
    const isMac = navigator.userAgent.toLowerCase().includes('mac')
    setIsMacUser(isMac)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 15
      })
    }, 50)
    return () => clearInterval(interval)
  }, [progress])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setDialogOpen((dialogOpen) => !dialogOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (progress < 100) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Progress value={progress} className="w-1/2" />
      </div>
    )
  }
  if (bookmarks.length === 0) {
    return (
      <div className="w-screen min-h-screen flex">
        <div className="flex flex-col justify-center items-center gap-6 w-full h-screen animation">
          <h1 className="text-5xl font-bold text-center">No bookmarks yet!</h1>
          <BookmarkDialog buttonClassName="h-12" />
        </div>
      </div>
    )
  }
  return (
    <div className="w-screen min-h-screen flex">
      <Sidebar className="animation" />
      <div className="w-full px-10 animation">
        <div className="w-full flex justify-center items-center p-8">
          <BookmarkDialog />
        </div>
        <div className="grid content-start grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookmarks.map(
            (bookmark) =>
              (category === 'all' || bookmark.category === category) && (
                <BookmarkCard key={bookmark.name} {...bookmark} />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
