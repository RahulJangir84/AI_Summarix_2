//for accessing the existing account
import { SignIn } from '@clerk/nextjs'
export default function Page() {
  return(
    <section className='flex items-center justify-center lg:min-h-[95vh]'>
            <div className="py-7 lg:pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SignIn />
            </div>
        </section>
  )
}