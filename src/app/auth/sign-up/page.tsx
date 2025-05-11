import Footer1 from '@/app/components/subFooter'
import Header1 from '@/app/components/subHeader'
import { SignUpForm } from '@/components/sign-up-form'

export default function Page() {
  return (
    <section>
      <Header1/>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
    <Footer1/>
    </section>
  )
}
