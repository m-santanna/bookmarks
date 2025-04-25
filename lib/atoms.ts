import { atomWithStorage } from 'jotai/utils'
import { Bookmark } from '@/lib/utils'

export const bookmarksAtom = atomWithStorage<Bookmark[]>('bookmarks', [])
