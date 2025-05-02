import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { useSetAtom } from 'jotai/react'
import { bookmarksAtom } from '@/lib/atoms'
import { toast } from 'sonner'
import { bookmarkArraySchema } from '@/lib/utils'

export default function ImportButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const setBookmarks = useSetAtom(bookmarksAtom)

  const handleImport = () => {
    navigator.clipboard
      .readText()
      .then((data) => {
        try {
          const parsed = JSON.parse(data)
          const bookmarks = bookmarkArraySchema.parse(parsed)

          toast('Bookmarks imported successfully.', {
            description: 'You can now use them in the new browser.',
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          })

          setBookmarks((prevState) => [...prevState, ...bookmarks])
        } catch (error) {
          toast.error('Failed to import bookmarks.', {
            description:
              'We currently only support imports from our own website.',
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          })
        }
      })
      .catch(() => {
        toast.error('Clipboard read failed.', {
          description: 'Please allow clipboard access and try again.',
          action: {
            label: 'Close',
            onClick: () => toast.dismiss(),
          },
        })
      })
  }
  return (
    <Button {...props} variant={'outline'} onClick={handleImport}>
      Import <Download className="ml-2" />
    </Button>
  )
}
