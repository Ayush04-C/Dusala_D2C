// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-rose/10">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-brand-rose hover:bg-brand-rose/90 text-sm normal-case",
              card: "shadow-none border-none bg-transparent",
              headerTitle: "font-heading text-brand-dark",
              headerSubtitle: "text-brand-muted",
              footerActionLink: "text-brand-rose hover:text-brand-rose/80",
            },
          }}
        />
      </div>
    </div>
  );
}
