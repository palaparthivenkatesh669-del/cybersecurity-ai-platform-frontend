export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  SECURITY: '/api/security',
  ALERTS: '/api/alerts',
  EVENTS: '/api/events',
  THREATS: '/api/threats',
  AI: '/api/ai',
  ADMIN: '/api/admin',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ALERT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const USER_ROLES = {
  ADMIN: 'administrator',
  SECURITY_ADMIN: 'security_admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
};

export const PERMISSIONS = {
  // Alert permissions
  ALERT_READ: 'alert:read',
  ALERT_UPDATE: 'alert:update',
  ALERT_DELETE: 'alert:delete',

  // Event permissions
  EVENT_READ: 'event:read',
  EVENT_EXPORT: 'event:export',

  // Threat permissions
  THREAT_READ: 'threat:read',
  THREAT_QUARANTINE: 'threat:quarantine',

  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',

  // System settings
  SETTINGS_READ: 'settings:read',
  SETTINGS_UPDATE: 'settings:update',
};
