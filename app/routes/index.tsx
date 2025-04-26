import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAtomValue, useSetAtom } from 'jotai/react'
import { bookmarksAtom, categoryAtom, isMacAtom } from '@/lib/atoms'
import { BookmarkCard } from '@/components/card'
import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [progress, setProgress] = useState(0)
  const setIsMacUser = useSetAtom(isMacAtom)
  const bookmarks = useAtomValue(bookmarksAtom)
  const category = useAtomValue(categoryAtom)
  const navigate = useNavigate()

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
        navigate({ to: '/add' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (progress < 100) {
    return (
      <div className="h-[calc(100vh-160px)] flex flex-col justify-center items-center">
        <Progress value={progress} className="w-1/2" />
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="w-screen min-h-[calc(100vh-80px)] flex">
        {bookmarks.length === 0 && (
          <h1 className="text-3xl font-bold flex justify-center items-center w-full h-[calc(100vh-160px)]">
            No bookmarks yet!
          </h1>
        )}
        {bookmarks.length > 0 && (
          <>
            <Sidebar />
            <div className="grid content-start grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-8">
              {bookmarks.map(
                (bookmark) =>
                  (category === 'all' || bookmark.category === category) && (
                    <BookmarkCard key={bookmark.name} {...bookmark} />
                  ),
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
