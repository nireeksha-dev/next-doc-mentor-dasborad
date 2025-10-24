# Backend API Integration Guide

This document specifies the contract between the NextDoc UK Mentor Dashboard frontend and the backend API. Use this as the source of truth when building API endpoints.

## Table of Contents
1. [Authentication](#authentication)
2. [Core Endpoints](#core-endpoints)
3. [Request/Response Formats](#requestresponse-formats)
4. [Error Handling](#error-handling)
5. [Database Schema](#database-schema)
6. [Migration from Mock Data](#migration-from-mock-data)

---

## Authentication

All API requests (except public endpoints) require a valid JWT token in the `Authorization` header:

```http
Authorization: Bearer <jwt_token>
```

### Token Claims
```json
{
  "sub": "mentor-uuid",
  "email": "mentor@example.com",
  "role": "mentor",
  "exp": 1735574400,
  "iat": 1735488000
}
```

### Unauthorized Response (401)
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token",
  "statusCode": 401
}
```

---

## Core Endpoints

### Priority 1 (Phase 2) - Required for Launch

#### `GET /api/mentor/overview`
Returns dashboard overview data.

**Response:**
```typescript
{
  todaysSessions: Array<{
    id: string;
    type: 'CV Clinic' | 'Interview Drill' | 'Career Roadmap' | 'Trust Matching';
    startTime: string; // ISO 8601
    endTime: string;
    googleMeetLink: string;
    menteeId: string;
  }>;
  queueCounts: {
    cvproReviews: number;
    interviewsimFeedback: number;
    sponsormatchReviews: number;
    gapmapCheckpoints: number;
    generalTasks: number;
  };
  unreadMessages: Array<{
    id: string;
    menteeId: string;
    unreadCount: number;
    lastMessage: {
      content: string;
      timestamp: string;
    };
  }>;
  atRiskMentees: Array<{
    id: string;
    name: string;
    cvReadiness: number; // 0-100
    interviewSimBand: number; // 1-9
    lastActivity: string; // ISO 8601
  }>;
}
```

---

#### `GET /api/mentor/earnings`
Returns earnings summary and transaction history.

**Response:**
```typescript
{
  summary: {
    thisMonth: number;
    nextPayout: {
      amount: number;
      date: string; // ISO 8601
    };
    lifetime: number;
  };
  history: Array<{
    id: string;
    date: string; // ISO 8601
    type: 'Session' | 'Instagram';
    sessionType: string; // e.g., 'CV Clinic', 'Interview Drill'
    mentorFee: number; // Gross amount before fees
    platformFee: number; // 20% platform fee
    processingFee: number; // Stripe 3% + £0.20
    netAmount: number; // Final payout to mentor
    status: 'Paid' | 'Pending';
    payoutDate: string | null; // ISO 8601 when paid
  }>;
  trend: Array<{
    month: string; // 'Jan', 'Feb', etc.
    sessions: number; // Earnings from sessions
    instagram: number; // Earnings from Instagram
  }>;
}
```

**Example Request:**
```bash
curl -H "Authorization: Bearer <token>" \
  https://api.nextdocuk.com/api/mentor/earnings
```

---

#### `POST /api/mentor/legal/accept`
Logs mentor's acceptance of legal agreement.

**Request Body:**
```typescript
{
  agreementType: 'mentor_agreement' | 'instagram_addendum';
  version: string; // e.g., 'v1.0', 'v1.1'
  ipAddress?: string; // Optional, requires GDPR consent
  userAgent: string; // Browser user agent
}
```

**Response:**
```typescript
{
  success: true;
  timestamp: string; // ISO 8601
  id: string; // Consent record UUID
}
```

**Example Request:**
```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "agreementType": "mentor_agreement",
    "version": "v1.0",
    "userAgent": "Mozilla/5.0..."
  }' \
  https://api.nextdocuk.com/api/mentor/legal/accept
```

---

#### `GET /api/mentor/legal/consents`
Retrieves mentor's legal consent history.

**Response:**
```typescript
{
  mentor_agreement: {
    version: string;
    status: 'accepted' | 'pending' | 'declined';
    timestamp: string | null;
  };
  instagram_addendum?: {
    version: string;
    status: 'accepted' | 'pending' | 'declined';
    timestamp: string | null;
  };
}
```

---

#### `GET /api/mentor/mentees`
Returns list of assigned mentees.

**Query Parameters:**
- `status` (optional): `active` | `at-risk` | `completed`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20)

**Response:**
```typescript
{
  mentees: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    specialty: string;
    currentGoal: string;
    cvReadiness: number; // 0-100
    interviewSimBand: number; // 1-9
    sponsorMatchStatus: 'Not Started' | 'In Progress' | 'Matched';
    gapMapProgress: number; // 0-100
    lastActivity: string; // ISO 8601
    riskLevel: 'Low' | 'Medium' | 'High';
    nextSession?: {
      date: string;
      type: string;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

#### `GET /api/mentor/tasks`
Returns task queue (CV reviews, feedback, etc.).

**Query Parameters:**
- `type` (optional): `cvpro` | `interviewsim` | `sponsormatch` | `gapmap` | `general`
- `status` (optional): `pending` | `completed`

**Response:**
```typescript
{
  tasks: Array<{
    id: string;
    type: 'CVPro' | 'InterviewSim+' | 'SponsorMatch' | 'GapMap' | 'General';
    title: string;
    menteeId: string;
    menteeName: string;
    dueDate: string; // ISO 8601
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Completed';
    details: string;
    attachments?: Array<{
      name: string;
      url: string;
    }>;
  }>;
}
```

---

#### `PATCH /api/mentor/tasks/:id`
Updates task status.

**Request Body:**
```typescript
{
  status: 'Completed';
  notes?: string; // Completion notes
}
```

**Response:**
```typescript
{
  success: true;
  task: {
    id: string;
    status: 'Completed';
    completedAt: string; // ISO 8601
  };
}
```

---

#### `GET /api/mentor/sessions`
Returns scheduled sessions.

**Query Parameters:**
- `from` (optional): Start date (ISO 8601)
- `to` (optional): End date (ISO 8601)
- `status` (optional): `upcoming` | `completed` | `cancelled`

**Response:**
```typescript
{
  sessions: Array<{
    id: string;
    title: string;
    type: 'CV Clinic' | 'Interview Drill' | 'Career Roadmap' | 'Trust Matching';
    startTime: string; // ISO 8601
    endTime: string;
    menteeId: string;
    menteeName: string;
    googleMeetLink: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    notes?: string;
  }>;
}
```

---

#### `POST /api/mentor/sessions`
Creates a new session.

**Request Body:**
```typescript
{
  title: string;
  type: 'CV Clinic' | 'Interview Drill' | 'Career Roadmap' | 'Trust Matching';
  startTime: string; // ISO 8601
  endTime: string;
  menteeId: string;
  googleMeetLink?: string; // Auto-generated if not provided
  notes?: string;
}
```

**Response:**
```typescript
{
  success: true;
  session: {
    id: string;
    googleMeetLink: string;
    // ... all session fields
  };
}
```

---

#### `GET /api/mentor/messages/:threadId`
Retrieves message thread with a mentee.

**Response:**
```typescript
{
  thread: {
    id: string;
    menteeId: string;
    menteeName: string;
    messages: Array<{
      id: string;
      senderId: string;
      senderRole: 'mentor' | 'mentee';
      content: string;
      timestamp: string; // ISO 8601
      read: boolean;
    }>;
  };
}
```

---

#### `POST /api/mentor/messages/:threadId`
Sends a message in a thread.

**Request Body:**
```typescript
{
  content: string; // Max 2000 characters
}
```

**Response:**
```typescript
{
  success: true;
  message: {
    id: string;
    timestamp: string;
  };
}
```

---

### Priority 2 (Phase 3) - Stripe Connect

#### `POST /api/mentor/stripe/onboard`
Initiates Stripe Connect onboarding.

**Response:**
```typescript
{
  url: string; // Stripe Connect onboarding URL
  accountId: string; // Stripe Connect account ID
}
```

---

#### `GET /api/mentor/stripe/status`
Checks Stripe Connect onboarding status.

**Response:**
```typescript
{
  status: 'not_started' | 'pending' | 'active' | 'restricted';
  accountId: string;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}
```

---

#### `POST /api/mentor/stripe/payout`
Triggers manual payout (admin only).

**Request Body:**
```typescript
{
  amount: number; // In GBP
  description: string;
}
```

---

#### `GET /api/mentor/stripe/balance`
Returns current Stripe balance.

**Response:**
```typescript
{
  available: number; // GBP
  pending: number; // GBP
  nextPayoutDate: string; // ISO 8601
}
```

---

### Priority 3 (Phase 4) - Instagram Creator

#### `POST /api/mentor/instagram/waitlist`
Captures email for Instagram beta waitlist.

**Request Body:**
```typescript
{
  email: string;
  timestamp: string; // ISO 8601
}
```

**Response:**
```typescript
{
  success: true;
}
```

---

#### `POST /api/mentor/instagram/submit`
Submits content for review.

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `video`: File (max 100MB, .mp4, .mov)
- `title`: string (max 100 chars)
- `description`: string (max 500 chars)
- `category`: `Career Tip` | `PLAB Insight` | `Interview Prep` | `Work-Life Balance` | `Portfolio Advice`

**Response:**
```typescript
{
  success: true;
  submission: {
    id: string;
    status: 'pending';
    estimatedReviewTime: string; // e.g., '48-72 hours'
  };
}
```

---

#### `GET /api/mentor/instagram/submissions`
Returns mentor's content submissions.

**Response:**
```typescript
{
  submissions: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'pending' | 'approved' | 'rejected' | 'live' | 'archived';
    rejectionReason?: string;
    submittedAt: string; // ISO 8601
    reviewedAt?: string;
    views?: number;
    engagement?: number;
    earnings?: number;
  }>;
}
```

---

#### `DELETE /api/mentor/instagram/:id`
Withdraws submitted content.

**Response:**
```typescript
{
  success: true;
  message: 'Content withdrawn. Will be archived in 30 days.';
}
```

---

#### `GET /api/mentor/instagram/analytics`
Returns engagement metrics.

**Response:**
```typescript
{
  totalViews: number;
  totalEarnings: number;
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    saves: number;
    shares: number;
    earnings: number;
  }>;
}
```

---

## Error Handling

### Standard Error Response
```typescript
{
  error: string; // Error type
  message: string; // Human-readable message
  statusCode: number;
  details?: any; // Optional validation errors
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

### Example Validation Error (400)
```json
{
  "error": "Validation Error",
  "message": "Invalid request body",
  "statusCode": 400,
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## Database Schema

### Table: `mentor_earnings`
```sql
CREATE TABLE mentor_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'Session' or 'Instagram'
  session_type VARCHAR(100), -- 'CV Clinic', 'Interview Drill', etc.
  mentor_fee DECIMAL(10,2) NOT NULL, -- Gross amount
  platform_fee DECIMAL(10,2) NOT NULL, -- 20% platform fee
  processing_fee DECIMAL(10,2) NOT NULL, -- Stripe 3% + £0.20
  net_amount DECIMAL(10,2) NOT NULL, -- Final payout
  status VARCHAR(20) NOT NULL DEFAULT 'Pending', -- 'Pending', 'Paid'
  payout_date TIMESTAMPTZ,
  stripe_transfer_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mentor_earnings_mentor_date ON mentor_earnings(mentor_id, date DESC);
CREATE INDEX idx_mentor_earnings_status ON mentor_earnings(status);
```

### Table: `mentor_legal_consents`
```sql
CREATE TABLE mentor_legal_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  agreement_type VARCHAR(100) NOT NULL, -- 'mentor_agreement', 'instagram_addendum'
  version VARCHAR(20) NOT NULL, -- 'v1.0', 'v1.1', etc.
  status VARCHAR(20) NOT NULL, -- 'accepted', 'pending', 'declined'
  accepted_at TIMESTAMPTZ,
  ip_address INET, -- Optional, requires GDPR consent
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(mentor_id, agreement_type) -- Only one active consent per type
);

CREATE INDEX idx_mentor_legal_consents_mentor ON mentor_legal_consents(mentor_id);
```

### Table: `instagram_content` (Phase 4)
```sql
CREATE TABLE instagram_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  video_url TEXT NOT NULL, -- S3/storage URL
  thumbnail_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'live', 'archived'
  rejection_reason TEXT,
  instagram_post_id VARCHAR(255), -- After posting to @nextdocuk
  views INT DEFAULT 0,
  saves INT DEFAULT 0,
  shares INT DEFAULT 0,
  engagement_score DECIMAL(3,1) DEFAULT 0.0,
  earnings DECIMAL(10,2) DEFAULT 0.00,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES admins(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_instagram_content_mentor ON instagram_content(mentor_id);
CREATE INDEX idx_instagram_content_status ON instagram_content(status);
```

---

## Migration from Mock Data

### Step 1: Create API Client
Replace `src/mocks/api.ts` calls with real API client:

**Before:**
```typescript
import { mockApi } from '@/mocks/api';
const { data } = useQuery({
  queryKey: ['earnings'],
  queryFn: mockApi.getEarnings,
});
```

**After:**
```typescript
import { api } from '@/lib/api';
const { data } = useQuery({
  queryKey: ['earnings'],
  queryFn: () => api.get('/mentor/earnings'),
});
```

### Step 2: Update Environment Variables
Add `.env.local`:
```env
VITE_API_BASE_URL=https://api.nextdocuk.com
```

### Step 3: Test Authentication
```typescript
// src/lib/api.ts
const token = localStorage.getItem('auth_token');
if (!token) {
  window.location.href = '/login';
  throw new Error('Not authenticated');
}
```

### Step 4: Handle Loading States
All API calls should show loading skeletons (already implemented in components).

### Step 5: Error Boundaries
Wrap top-level components with error boundaries to catch API failures gracefully.

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Maintained By**: NextDoc UK Backend Team
