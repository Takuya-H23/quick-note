import { Link } from 'remix'
import type { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'Quick Note',
    description: 'Welcome to Quick Note!'
  }
}

export default function Index() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome to Quick Note👋</h2>
      <section className="mt-12 flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xl font-medium">What is Quick Note?</h3>
          <p className="leading-7">
            Quick Note makes your day-to-day tasks a littler easier. If you find
            yourself googling same things over and over again or trying to
            remember small things, then you should use Quick Note!
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xl font-medium">How to use it?</h3>
          <p className="leading-7">
            <Link to="login">
              <span className="underline">You need your account</span>
            </Link>
            . If you have your account then you can start creating your quick
            notes from{' '}
            <Link to="/dashboard">
              <span className="underline">here</span>!
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xl font-medium">Is Quick Note free?</h3>
          <p className="leading-7">
            Totally! There's no need to payment methods.
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xl font-medium">
            Are you developing a mobile app of Quick Note?
          </h3>
          <p className="leading-7">
            At this moment, my answer is no. But I'm happy to develop a mobile
            app if there is a need 👍
          </p>
        </div>
      </section>
    </div>
  )
}
