'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks';
import { registerFormSchema, type RegisterFormData } from '@/utils/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const RegisterPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.firstName, data.lastName, data.email, data.password);
    } catch (error) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our security platform</p>
          </div>

          {error && (
            <Alert type="error" dismissible={false} className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register('firstName')}
                type="text"
                placeholder="First name"
                error={errors.firstName?.message}
                disabled={isLoading || isSubmitting}
              />
              <Input
                {...register('lastName')}
                type="text"
                placeholder="Last name"
                error={errors.lastName?.message}
                disabled={isLoading || isSubmitting}
              />
            </div>

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
              autoComplete="new-password"
              disabled={isLoading || isSubmitting}
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm password"
              icon={<FiLock />}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              disabled={isLoading || isSubmitting}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading || isSubmitting}
              variant="primary"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-cyber-600 hover:text-cyber-700">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
