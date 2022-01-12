import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  variant?: 'danger' | 'info'
}

const variantStyle = {
  danger: 'bg-red-500 text-gray-50',
  info: 'bg-yellow-400'
}

export default function Button({
  children,
  type = 'button',
  onClick,
  variant = 'info'
}: Props) {
  return (
    <button
      type={type}
      className={`w-full py-2 text-gray-900 rounded-md ${variantStyle[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
