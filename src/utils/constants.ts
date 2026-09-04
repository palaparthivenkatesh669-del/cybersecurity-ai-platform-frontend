// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',
  
  // User
  USERS_ME: '/users/me',
  USERS_LIST: '/users',
  USERS_DETAIL: '/users/:id',
  USERS_UPDATE: '/users/:id',
  USERS_DELETE: '/users/:id',
  
  // Security
  SECURITY_EVENTS: '/security/events',
  SECURITY_ALERTS: '/security/alerts',
  SECURITY_THREATS: '/security/threats',
  SECURITY_DEVICES: '/security/devices',
  SECURITY_METRICS: '/security/metrics',
  SECURITY_ANALYTICS: '/security/analytics',
  
  // AI
  AI_CHAT: '/ai/chat',
  AI_CONVERSATIONS: '/ai/conversations',
  AI_PREDICT: '/ai/predict',
  AI_ANOMALY: '/ai/anomaly',
  AI_SEARCH: '/ai/search',
  AI_STATUS: '/ai/status',
  AI_INSIGHTS: '/ai/insights',
  
  // ML
  ML_MODELS: '/ml/models',
  ML_PREDICTIONS: '/ml/predictions',
  ML_ANOMALIES: '/ml/anomalies',
  
  // Reports
  REPORTS_LIST: '/reports',
  REPORTS_GENERATE: '/reports/generate',
  REPORTS_DETAIL: '/reports/:id',
  
  // Audit
  AUDIT_LOGS: '/audit/logs',
  
  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_PERMISSIONS: '/admin/permissions',
  ADMIN_SETTINGS: '/admin/settings',
};

// Severity Levels
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const SEVERITY_COLORS = {
  low: 'bg-blue-100 text-blue-800 border-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
} as const;

export const SEVERITY_BADGE_COLORS = {
  low: 'cyber-100',
  medium: 'warning-100',
  high: 'orange-100',
  critical: 'danger-100',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ANALYST: 'analyst',
  SECURITY_ADMIN: 'security_admin',
  ADMINISTRATOR: 'administrator',
} as const;

// Permissions
export const PERMISSIONS = {
  SECURITY_EVENTS_READ: 'security.events.read',
  SECURITY_EVENTS_WRITE: 'security.events.write',
  SECURITY_ALERTS_READ: 'security.alerts.read',
  SECURITY_ALERTS_MANAGE: 'security.alerts.manage',
  SECURITY_THREATS_READ: 'security.threats.read',
  SECURITY_THREATS_MANAGE: 'security.threats.manage',
  AI_CHAT: 'ai.chat',
  AI_PREDICT: 'ai.predict',
  AI_ANOMALY: 'ai.anomaly',
  USERS_MANAGE: 'users.manage',
  AUDIT_READ: 'audit.read',
  SYSTEM_ADMIN: 'system.admin',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Time Formats
export const TIME_FORMATS = {
  DATE: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
  DATE_TIME: 'yyyy-MM-dd HH:mm:ss',
  RELATIVE: 'relative',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  PREFERENCES: 'preferences',
  THEME: 'theme',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  MOCK_API: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
  AI_CHAT: process.env.NEXT_PUBLIC_ENABLE_AI_CHAT === 'true',
};

// Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please check your email.',
  UPDATE_SUCCESS: 'Update successful!',
  DELETE_SUCCESS: 'Delete successful!',
  ACTION_SUCCESS: 'Action completed successfully!',
};
