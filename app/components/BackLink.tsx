import { Link } from 'remix'
import { ChevronDoubleLeftIcon } from '@heroicons/react/outline'

type Props = {
  label: string
  to: string
}

export default function BackLink({ label, to }: Props) {
  return (
    <Link to={to} className="flex items-center gap-x-2 mb-2">
      <ChevronDoubleLeftIcon className="w-6 h-6" />
      <span className="text-lg">{label}</span>
    </Link>
  )
}
