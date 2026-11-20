import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckSquare, Eye, EyeOff } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';

const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  username: z
    .string()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or less'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain uppercase, lowercase, number and special character',
    ),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
    } catch {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-950">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          style: { background: '#1e293b', color: '#f1f5f9' },
        }}
      />

      {/* Theme toggle */}
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      {/* Left side — branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-primary-600 p-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <CheckSquare className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">{APP_NAME}</h1>
          <p className="mt-4 text-lg text-primary-100">
            Join thousands of productive people who manage their daily tasks with TaskFlow.
          </p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600 text-white">
              <CheckSquare className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              {APP_NAME}
            </h1>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Start organizing your tasks today
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Username"
              placeholder="Choose a username"
              autoComplete="username"
              error={errors.username?.message}
              {...register('username')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Already have an account?{' '}
            <a
              href="/login.html"
              className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
