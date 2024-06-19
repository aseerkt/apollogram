import { useCallback, useState } from 'react'

export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue)

  const toggle = useCallback(() => setIsOpen((o) => !o), [])

  return { isOpen, toggle }
}
