/**
 * API Client for NextDoc UK Mentor Dashboard
 * 
 * This file provides a type-safe API client for communicating with the backend.
 * 
 * **Phase 1 (Current)**: This file is a placeholder template for Phase 2 integration.
 * **Phase 2**: Replace mockApi calls with this client and connect to real endpoints.
 * 
 * @see docs/API_INTEGRATION.md - Complete API specification
 * @see src/mocks/api.ts - Mock data structure reference
 * 
 * @example
 * // Before (Phase 1):
 * import { mockApi } from '@/mocks/api';
 * const { data } = useQuery({ queryKey: ['earnings'], queryFn: mockApi.getEarnings });
 * 
 * // After (Phase 2):
 * import { api } from '@/lib/api';
 * const { data } = useQuery({ queryKey: ['earnings'], queryFn: () => api.get('/mentor/earnings') });
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Get authentication token from localStorage
 * In Phase 2, replace with your auth provider (Auth0, Clerk, Supabase, etc.)
 */
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Standard API error class
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API request function
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  if (!token && !endpoint.includes('public')) {
    // Redirect to login if not authenticated
    window.location.href = '/login';
    throw new ApiError(401, 'Unauthorized', 'Authentication required');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Unknown Error',
        message: response.statusText,
      }));

      throw new ApiError(
        response.status,
        errorData.error,
        errorData.message,
        errorData.details
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or other unexpected error
    throw new ApiError(
      0,
      'Network Error',
      'Failed to connect to server. Please check your internet connection.',
      error
    );
  }
}

/**
 * API Client
 * 
 * Provides methods for all backend endpoints.
 * See docs/API_INTEGRATION.md for complete endpoint specifications.
 */
export const api = {
  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' });
  },

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' });
  },

  /**
   * Upload file (multipart/form-data)
   * Used for Instagram content submission in Phase 4
   */
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = getAuthToken();

    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'Upload Failed',
          message: response.statusText,
        }));

        throw new ApiError(
          response.status,
          errorData.error,
          errorData.message,
          errorData.details
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        0,
        'Upload Error',
        'Failed to upload file. Please try again.',
        error
      );
    }
  },
};

/**
 * Typed API endpoints for type safety
 * 
 * Usage in components:
 * const { data } = useQuery({
 *   queryKey: ['earnings'],
 *   queryFn: () => api.get<EarningsResponse>('/mentor/earnings')
 * });
 */

// Example type definitions (expand as needed)
export interface EarningsResponse {
  summary: {
    thisMonth: number;
    nextPayout: {
      amount: number;
      date: string;
    };
    lifetime: number;
  };
  history: Array<{
    id: string;
    date: string;
    type: 'Session' | 'Instagram';
    sessionType: string;
    mentorFee: number;
    platformFee: number;
    processingFee: number;
    netAmount: number;
    status: 'Paid' | 'Pending';
    payoutDate: string | null;
  }>;
  trend: Array<{
    month: string;
    sessions: number;
    instagram: number;
  }>;
}

export interface LegalConsentRequest {
  agreementType: 'mentor_agreement' | 'instagram_addendum';
  version: string;
  ipAddress?: string;
  userAgent: string;
}

export interface LegalConsentResponse {
  success: boolean;
  timestamp: string;
  id: string;
}
