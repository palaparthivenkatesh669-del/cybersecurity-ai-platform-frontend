'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordFormSchema, type ResetPasswordFormData } from '@/utils/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Call reset password API
      // await authApi.resetPassword(data);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur">
            <Alert type="error" dismissible={false}>
              Invalid or missing reset token. Please request a new password reset.
            </Alert>
            <div className="mt-6">
              <Link href="/auth/forgot-password" className="text-cyber-600 hover:text-cyber-700">
                Request new reset link
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {error && (
            <Alert type="error" dismissible={false} className="mb-6">
              {error}
            </Alert>
          )}

          {isSubmitted ? (
            <div className="space-y-4">
              <Alert type="success" dismissible={false}>
                Your password has been reset successfully!
              </Alert>
              <Link href="/auth/login">
                <Button fullWidth variant="primary">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('password')}
                type="password"
                placeholder="New password"
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
                Reset Password
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
