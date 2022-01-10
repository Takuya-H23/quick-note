import { Link } from 'remix'

import { ExclamationCircleIcon } from '@heroicons/react/outline'
export default function ErrorLayout() {
  return (
    <div>
      <h2 className="flex gap-x-2 font-medium text-2xl items-center">
        <ExclamationCircleIcon className="w-6 h-6" />
        Error
      </h2>
      <p className="text-xl my-4">
        Sorry but something went wrong. Please try it later.
      </p>
      <Link to="/">Home</Link>
    </div>
  )
}
