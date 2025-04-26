import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import { Bookmark } from '@/lib/utils'

export const bookmarksAtom = atomWithStorage<Bookmark[]>('bookmarks', [])
export const categoryAtom = atomWithStorage<string>('category', 'all')
export const isMacAtom = atomWithStorage<boolean>('isMac', false)
export const dialogOpenAtom = atom<boolean>(false)
