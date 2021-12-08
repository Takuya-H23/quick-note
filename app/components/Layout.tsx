import Header from './Header'

type Props = {
  children: React.ReactNode
  isLoggedIn?: boolean
}

export default function Layout({ children, isLoggedIn }: Props) {
  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto w-11/12  py-6 md:py-12">
        <Header isLoggedIn={isLoggedIn} />
        <main className="mt-16 md:mt-24">{children}</main>
      </main>
    </div>
  )
}
