import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type Bookmark = {
  name: string
  url: string
  category: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
