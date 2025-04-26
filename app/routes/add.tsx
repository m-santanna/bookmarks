import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { bookmarksAtom } from '@/lib/atoms'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai/react'
import Navbar from '@/components/navbar'

export const Route = createFileRoute('/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const setBookmarks = useSetAtom(bookmarksAtom)
  const router = useRouter()

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  })

  function handleSubmit() {
    setBookmarks((prev) => [
      ...prev,
      {
        name: (document.querySelector('input[name="name"]') as HTMLInputElement)
          .value,
        url: (document.querySelector('input[name="url"]') as HTMLInputElement)
          .value,
        category: (
          document.querySelector('input[name="category"]') as HTMLInputElement
        ).value,
      },
    ])
    router.navigate({ to: '/' })
  }

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-160px)] flex flex-col justify-center items-center">
        <div className="w-1/3 flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Bookmark</h1>
          <div className="flex flex-col gap-2 w-full">
            <Input name="url" type="url" placeholder="URL" required autoFocus />
            <Input name="name" type="text" placeholder="Name" required />
            <Input
              name="category"
              type="text"
              placeholder="Category"
              required
            />
          </div>
          <Button onClick={handleSubmit} className="w-full md:w-1/3">
            Add Bookmark
          </Button>
        </div>
      </div>
    </>
  )
}
