// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-rose/10">
        <SignIn
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
