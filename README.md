# Cybersecurity AI Platform - Frontend

An advanced AI-powered cybersecurity threat detection and response platform built with Next.js, TypeScript, and modern web technologies.

## Features

- 🔐 **Secure Authentication** - JWT-based authentication with refresh tokens
- 🤖 **AI Agent Integration** - Conversational AI assistant for security analysis
- 📊 **Real-time Dashboard** - Security metrics and threat monitoring
- 🚨 **Alert Management** - Centralized alert handling and response
- 📈 **Analytics & Reporting** - Comprehensive security insights
- 👥 **User Management** - Role-based access control
- 🎨 **Modern UI** - Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
cd cybersecurity-ai-platform-frontend
npm install

# Create .env.local file
cp .env.example .env.local

# Update environment variables
# NEXT_PUBLIC_API_URL=your_backend_url
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # Dashboard pages
│   └── layout.tsx    # Root layout
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ui/          # UI components
├── hooks/           # Custom React hooks
├── stores/          # Zustand stores
├── api/             # API client configuration
├── auth/            # Authentication utilities
├── types/           # TypeScript types
├── utils/           # Utility functions
└── styles/          # Global styles
```

## API Integration

The frontend connects to the backend API defined in the Cybersecurity AI Platform Backend repository. Make sure to set the correct API URL in your environment variables.

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Cybersecurity AI Platform
```

## Authentication

- Login page: `/auth/login`
- Register page: `/auth/register`
- Forgot password: `/auth/forgot-password`
- Reset password: `/auth/reset-password?token=<token>`

## Dashboard Pages

- Main dashboard: `/dashboard`
- Alerts: `/dashboard/alerts`
- Security events: `/dashboard/events`
- Threats: `/dashboard/threats`
- Analytics: `/dashboard/analytics`
- AI Agent: `/dashboard/ai`
- Administration: `/dashboard/admin`
- Settings: `/dashboard/settings`

## Contributing

Please follow the established code style and commit conventions. All pull requests should include tests and documentation.

## License

MIT
