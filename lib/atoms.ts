import { atomWithStorage } from 'jotai/utils'
import { Bookmark } from '@/lib/utils'

export const bookmarksAtom = atomWithStorage<Bookmark[]>('bookmarks', [])
export const categoryAtom = atomWithStorage<string>('category', 'all')
export const isMacAtom = atomWithStorage<boolean>('isMac', false)
