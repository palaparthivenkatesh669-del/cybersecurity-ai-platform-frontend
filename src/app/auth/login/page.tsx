'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks';
import { loginFormSchema, type LoginFormData } from '@/utils/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Hub</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {error && (
            <Alert type="error" dismissible={false} className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              placeholder="Email address"
              icon={<FiMail />}
              error={errors.email?.message}
              autoComplete="email"
              disabled={isLoading || isSubmitting}
            />

            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              icon={<FiLock />}
              error={errors.password?.message}
              autoComplete="current-password"
              disabled={isLoading || isSubmitting}
            />

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="rounded border-gray-300 text-cyber-600 focus:ring-cyber-500"
                  disabled={isLoading || isSubmitting}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-cyber-600 hover:text-cyber-700">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading || isSubmitting}
              variant="primary"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-cyber-600 hover:text-cyber-700">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
