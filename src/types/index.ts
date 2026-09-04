// User & Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  isActive: boolean;
}

export type UserRole = 'user' | 'analyst' | 'security_admin' | 'administrator';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

// Security Types
export interface SecurityEvent {
  id: string;
  timestamp: string;
  userId?: string;
  deviceId?: string;
  eventType: string;
  severity: Severity;
  source: string;
  destination?: string;
  action: string;
  result: 'success' | 'failure';
  description: string;
  metadata: Record<string, unknown>;
  ipAddress?: string;
}

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: 'open' | 'acknowledged' | 'resolved';
  relatedEventIds: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface Threat {
  id: string;
  name: string;
  category: string;
  severity: Severity;
  description: string;
  indicators: string[];
  status: 'detected' | 'contained' | 'resolved';
  detectedAt: string;
  affectedResources: string[];
  mitigationSteps?: string[];
}

export interface Device {
  id: string;
  name: string;
  type: string;
  osVersion: string;
  lastSeen: string;
  riskScore: number;
  status: 'online' | 'offline' | 'at_risk';
  owner?: string;
}

// Dashboard Types
export interface SecurityMetrics {
  securityScore: number;
  threatCount: number;
  criticalAlerts: number;
  recentEvents: number;
  anomalyCount: number;
  riskLevel: Severity;
  systemHealth: number;
}

export interface DashboardData {
  metrics: SecurityMetrics;
  recentAlerts: Alert[];
  recentEvents: SecurityEvent[];
  topThreats: Threat[];
  threatTrend: TrendDataPoint[];
  alertTrend: TrendDataPoint[];
  deviceStatus: DeviceStatus[];
}

export interface TrendDataPoint {
  timestamp: string;
  value: number;
}

export interface DeviceStatus {
  name: string;
  value: number;
}

// AI Types
export interface AIConversation {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AIMessage[];
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolCalls?: AIToolCall[];
  confidence?: number;
}

export interface AIToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  status: 'pending' | 'success' | 'error';
  executedAt: string;
  error?: string;
}

export interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: Severity;
  confidence: number;
  relatedEvents: string[];
  recommendation: string;
  createdAt: string;
}

// ML/Prediction Types
export interface Prediction {
  id: string;
  modelId: string;
  inputFeatures: Record<string, unknown>;
  prediction: number;
  confidence: number;
  probability?: Record<string, number>;
  explanation?: string;
  createdAt: string;
}

export interface AnomalyDetectionResult {
  id: string;
  eventId: string;
  anomalyScore: number;
  isAnomaly: boolean;
  anomalyType: string;
  explanation: string;
  relatedEvents: string[];
  confidence: number;
  createdAt: string;
}

export interface MLModel {
  id: string;
  name: string;
  version: string;
  type: string;
  status: 'training' | 'active' | 'archived';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  deployedAt?: string;
  metrics: Record<string, number>;
}

// Analytics Types
export interface AnalyticsReport {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  period: {
    start: string;
    end: string;
  };
  metrics: Record<string, unknown>;
  charts: ChartData[];
  insights: string[];
}

export interface ChartData {
  name: string;
  data: TrendDataPoint[];
}

// Audit Types
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changes: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  status: 'success' | 'failure';
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}
