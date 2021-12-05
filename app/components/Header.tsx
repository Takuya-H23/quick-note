import { useState } from 'react'
import { Link } from 'remix'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { Dialog } from '@headlessui/react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <header className="flex justify-between items-center">
      <h1 className="font-bold text-3xl">Quick Note</h1>
      <button onClick={handleOpen}>
        <BiMenu className="w-8 h-8" />
      </button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed inset-y-0 overflow-y-auto bg-gray-700 text-gray-50 right-0 w-2/3 p-6"
      >
        <Dialog.Overlay />
        <div className="relative">
          <nav>
            <button className="absolute inset-y-0 right-0">
              <IoMdClose onClick={handleClose} className="w-8 h-8" />
            </button>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Dialog>
    </header>
  )
}
