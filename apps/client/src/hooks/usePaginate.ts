import { useEffect, useState } from 'react'

const useScrollPaginate = <T extends { id: string }>(
  items: T[] | undefined,
  hasMore: boolean | undefined,
  onLoadMore: () => void,
  threshold = 0.5
) => {
  const [observedPost, setObservedPost] = useState<string>('')

  useEffect(() => {
    if (items) {
      if (items.length === 0) return

      const id = items[items.length - 1].id
      if (!hasMore) return

      if (id && id !== observedPost) {
        setObservedPost(id)
        observeElement(document.getElementById(String(id))!)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const observeElement = (element: HTMLElement) => {
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          onLoadMore()
          observer.unobserve(element)
        }
      },
      { threshold }
    )
    observer.observe(element)
  }
}

export default useScrollPaginate
