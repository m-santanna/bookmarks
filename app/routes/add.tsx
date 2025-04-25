import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { bookmarksAtom } from '@/lib/atoms'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai/react'

export const Route = createFileRoute('/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const setBookmarks = useSetAtom(bookmarksAtom)
  const router = useRouter()
  return (
    <div className="h-[calc(100vh-160px)] flex flex-col justify-center items-center">
      <div className="w-1/3 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Bookmark</h1>
        <div className="flex flex-col gap-2 w-full">
          <Input name="url" type="url" placeholder="URL" required />
          <Input name="name" type="text" placeholder="Name" required />
          <Input name="category" type="text" placeholder="Category" required />
        </div>
        <Button
          onClick={() => {
            setBookmarks((prev) => [
              ...prev,
              {
                name: 'Google',
                url: 'https://www.google.com',
                category: 'Search Engine',
              },
            ])
            router.navigate({ to: '/' })
          }}
          className="w-1/3"
        >
          Add Bookmark
        </Button>
      </div>
    </div>
  )
}
