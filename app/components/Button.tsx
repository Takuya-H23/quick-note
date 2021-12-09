import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  type?: 'button' | 'submit'
}

export default function Button({ children, type = 'button' }: Props) {
  return (
    <button
      type={type}
      className="w-full py-2 bg-yellow-400 text-gray-900 rounded-sm"
    >
      {children}
    </button>
  )
}
