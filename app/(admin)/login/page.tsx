import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mt-[10%] flex items-center justify-center bg-white-1 dark:bg-black-2 px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-black-0 dark:text-white-0 mb-2">
            Admin Access
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please enter your credentials to continue.
          </p>
        </div>

        <LoginForm />

      </div>
    </div>
  );
}