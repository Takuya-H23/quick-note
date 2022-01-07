import { useState, useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { BiClipboard } from 'react-icons/bi'

type Props = {
  copy: string
  className?: string
}

export default function CopyText({ copy, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const type = 'text/plain'
    const blob = new Blob([copy], { type })

    navigator.clipboard.write([new ClipboardItem({ [type]: blob })]).then(
      () => handleOpen(),
      e => {
        console.error('error', e)
      }
    )
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleClose, 1000)
    }
  }, [isOpen])

  return (
    <Popover className={className}>
      <div className="flex justify-between items-center">
        <span className="truncate">{copy}</span>
        <div className="relative">
          <button type="button" onClick={onClick}>
            <BiClipboard className="w-6 h-6" />
          </button>
          {isOpen && (
            <Popover.Panel
              static
              className="absolute bg-gray-50 p-1 rounded-sm -left-4"
            >
              <span className="text-gray-900 text-sm">Copied!</span>
            </Popover.Panel>
          )}
        </div>
      </div>
    </Popover>
  )
}
