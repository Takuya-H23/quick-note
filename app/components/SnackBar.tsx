import { useState, useEffect, useRef } from 'react'
import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'

type Props = {
  message: string
  variant?: 'info' | 'error'
}

const icons = {
  info: <AiOutlineInfoCircle className="w-5 h-5" />,
  error: <AiOutlineWarning className="w-5 h-5" />
}

const bg = {
  info: 'bg-green-500',
  error: 'bg-red-500'
}

export default function SnackBar({ message, variant = 'info' }: Props) {
  const [shouldRender, setShouldRender] = useState(Boolean(message))
  const ref = useRef<boolean>(false)

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>

    if (!ref.current) {
      if (shouldRender) {
        timerId = setTimeout(() => setShouldRender(false), 3000)
      }
    } else {
      ref.current = true
    }

    return () => {
      clearTimeout(timerId)
      setShouldRender(false)
    }
  }, [shouldRender])

  if (!shouldRender) return null

  return (
    <div
      className={`absolute top-6 right-6 md:top-8 md:right-8 bg-green-500 px-4 py-2 rounded-sm flex gap-x-2 items-center ${bg[variant]}`}
    >
      {icons[variant]}
      <p>{message}</p>
    </div>
  )
}
