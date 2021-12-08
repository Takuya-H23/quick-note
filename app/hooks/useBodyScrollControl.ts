import { useEffect } from 'react'

export default function useBodyScrollControl(shouldPreventScroll: boolean) {
  useEffect(() => {
    if (shouldPreventScroll) {
      document?.querySelector('body')?.classList.add('overflow-hidden')
    } else {
      document?.querySelector('body')?.classList.remove('overflow-hidden')
    }

    return () => {
      document?.querySelector('body')?.classList.remove('overflow-hidden')
    }
  }, [shouldPreventScroll])
}
