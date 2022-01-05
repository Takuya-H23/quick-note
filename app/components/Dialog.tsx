import { useState } from 'react'
import { Dialog as HeadlessDialog } from '@headlessui/react'

import type { ReactNode } from 'react'

type Props = {
  children: (_x: { handleClose: () => void }) => ReactNode
  button: (_x: { handleOpen: () => void }) => ReactNode
}

export default function Dialog({ children, button }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      {button({ handleOpen })}
      <HeadlessDialog
        onClose={handleClose}
        open={isOpen}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <HeadlessDialog.Overlay className="fixed inset-0" />
        <div className="fixed w-8/12  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {children({ handleClose })}
        </div>
      </HeadlessDialog>
    </div>
  )
}
