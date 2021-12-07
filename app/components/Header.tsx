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
      <Link to="/">
        <h1 className="font-bold text-3xl md:text-5xl">Quick Note</h1>
      </Link>
      <button onClick={handleOpen}>
        <BiMenu className="w-8 h-8" />
      </button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed inset-y-0 overflow-y-auto bg-gray-700 text-gray-50 right-0 w-2/3 p-6 md:w-1/3"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-70" />
        <div className="relative">
          <nav>
            <div className="flex">
              <IoMdClose onClick={handleClose} className="w-8 h-8 ml-auto" />
            </div>
            <ul className="flex flex-col gap-y-4">
              <li onClick={handleClose}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/register">Register</Link>
              </li>
              <li onClick={handleClose}>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <form method="post" action="/logout">
                  <button type="submit">Logout</button>
                </form>
              </li>
            </ul>
          </nav>
        </div>
      </Dialog>
    </header>
  )
}
