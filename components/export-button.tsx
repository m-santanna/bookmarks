import { useAtomValue } from 'jotai/react'
import { bookmarksAtom } from '@/lib/atoms'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'

export default function ExportButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const bookmarks = useAtomValue(bookmarksAtom)

  const handleExport = async () => {
    const data = JSON.stringify(bookmarks)
    await navigator.clipboard.writeText(data)
    toast('Bookmarks copied to clipboard.', {
      description: 'You can now import them in the new browser.',
      action: {
        label: 'Close',
        onClick: () => toast.dismiss(),
      },
    })
  }
  return (
    <Button {...props} variant="outline" onClick={handleExport}>
      Export <Upload className="ml-2" />
    </Button>
  )
}
