import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAtomValue, useAtom, useSetAtom } from 'jotai/react'
import { isMacAtom, dialogOpenAtom, bookmarksAtom } from '@/lib/atoms'
import { CommandIcon } from 'lucide-react'
import { KeyboardEvent } from 'react'

export default function BookmarkDialog({
  buttonClassName,
}: {
  buttonClassName?: string
}) {
  const isMacUser = useAtomValue(isMacAtom)
  const [dialogOpen, setDialogOpen] = useAtom(dialogOpenAtom)
  const setBookmarks = useSetAtom(bookmarksAtom)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

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
    setDialogOpen(false)
  }

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger asChild>
        <Button size={'lg'} className={buttonClassName}>
          Add Bookmark
          {isMacUser ? (
            <div className="flex items-center">
              <CommandIcon className="size-4" />K
            </div>
          ) : (
            <div className="flex items-center">Ctrl+K</div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bookmark Info</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 w-full">
          <Input
            name="url"
            type="url"
            placeholder="URL"
            required
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <Input
            name="name"
            type="text"
            placeholder="Name"
            required
            onKeyDown={handleKeyDown}
          />
          <Input
            name="category"
            type="text"
            placeholder="Category"
            required
            onKeyDown={handleKeyDown}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Bookmark</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
