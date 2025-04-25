import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAtomValue } from 'jotai/react'
import { bookmarksAtom } from '@/lib/atoms'
import { BookmarkCard } from '@/components/card'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [progress, setProgress] = useState(0)
  const bookmarks = useAtomValue(bookmarksAtom)

  useEffect(() => {
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

  if (progress < 100) {
    return (
      <div className="h-[calc(100vh-160px)] flex flex-col justify-center items-center">
        <Progress value={progress} className="w-1/2" />
      </div>
    )
  }
  return (
    <div className="w-full p-10 flex flex-col gap-4">
      {bookmarks.length === 0 && (
        <h1 className="text-2xl font-bold text-center">No bookmarks yet!</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.name} {...bookmark} />
        ))}
      </div>
    </div>
  )
}
