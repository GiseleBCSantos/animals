import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 text-8xl opacity-5">🦎</div>
        <div className="absolute bottom-20 right-1/4 text-8xl opacity-5">🐴</div>
      </div>

      <ForgotPasswordForm />
    </div>
  )
}
