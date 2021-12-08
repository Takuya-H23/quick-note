import { useState, useRef, useEffect } from 'react'
import { Link } from 'remix'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

import { useBodyScrollControl } from '~/hooks'

import type { RefObject } from 'react'

type Props = {
  isLoggedIn?: boolean
}

export default function Header({ isLoggedIn }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const first = useRef<HTMLButtonElement>(null)
  const last = useRef<HTMLButtonElement>(null)

  useBodyScrollControl(isOpen)

  useEffect(() => {
    return () => setIsOpen(false)
  }, [])

  useEffect(() => {
    const fn = handleFocus(
      first as RefObject<HTMLButtonElement>,
      last as RefObject<HTMLButtonElement>
    )

    document.addEventListener('keydown', fn)
    return () => removeEventListener('keydown', fn)
  }, [])

  return (
    <header className="flex justify-between items-center">
      <Link to="/">
        <h1 className="font-bold text-3xl md:text-5xl">Quick Note</h1>
      </Link>
      <button onClick={handleOpen}>
        <BiMenu className="w-8 h-8" />
      </button>
      <div
        className="p-6 overflow-y-scroll fixed top-0 bottom-0 right-0  bg-gray-600 w-1/2"
        hidden={!isOpen}
      >
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-negative"
          hidden={!isOpen}
        />
        <nav className="flex flex-col gap-y-6">
          <button ref={first} onClick={handleClose} className="ml-auto">
            <IoMdClose className="w-8 h-8 ml-auto" />
          </button>
          <ul className="flex flex-col gap-y-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <form method="post" action="/logout">
                  <button ref={last} type="submit">
                    Logout
                  </button>
                </form>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function handleFocus(
  first: RefObject<HTMLButtonElement>,
  last: RefObject<HTMLButtonElement>
) {
  return function (e: any) {
    const isTabPressed = e.code === 'Tab'

    if (!isTabPressed) return

    if (e.shiftKey) {
      if (document.activeElement === first.current) {
        last.current?.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === last.current) {
        first.current?.focus()
        e.preventDefault()
      }
    }
  }
}
