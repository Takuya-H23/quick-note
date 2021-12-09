import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  legend: string
}
export default function Fieldset({ children, legend }: Props) {
  return (
    <fieldset className="border-2 border-gray-50 px-8 py-10 rounded-md max-w-xl mx-auto">
      <legend className="text-center font-medium text-2xl px-2">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}
