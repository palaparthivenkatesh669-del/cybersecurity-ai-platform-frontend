export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error.response) {
    // API responded with error status
    return new ApiError(
      error.response.status,
      error.response.data?.message || 'An error occurred',
      error.response.data
    );
  }

  if (error.request) {
    // Request made but no response
    return new ApiError(0, 'No response from server', error);
  }

  // Something else happened
  return new ApiError(0, error.message || 'An unexpected error occurred', error);
};
