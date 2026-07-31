import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-headline text-2xl font-bold text-primary-container">
            DT Trucks
          </p>
          <h1 className="mt-2 font-headline text-xl font-semibold text-on-surface">
            Admin sign in
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Content management for dttrucks.com
          </p>
        </div>

        <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-industrial">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-secondary">
          <a href="/" className="hover:text-primary-container">
            Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
