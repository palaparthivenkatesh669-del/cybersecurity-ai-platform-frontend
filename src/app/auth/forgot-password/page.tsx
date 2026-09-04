'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordFormSchema, type ForgotPasswordFormData } from '@/utils/validators';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Call forgot password API
      // await authApi.forgotPassword(data);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-900 via-cyber-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/95 backdrop-blur">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">
              {isSubmitted
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive a password reset link'}
            </p>
          </div>

          {error && (
            <Alert type="error" dismissible={false} className="mb-6">
              {error}
            </Alert>
          )}

          {isSubmitted ? (
            <Alert type="success" dismissible={false} className="mb-6">
              We've sent a password reset link to <strong>{getValues('email')}</strong>. Please check your email
              and follow the instructions.
            </Alert>
          ) : (
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

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading || isSubmitting}
                variant="primary"
              >
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/auth/login"
              className="text-sm text-cyber-600 hover:text-cyber-700 flex items-center gap-2"
            >
              <FiArrowLeft /> Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
