// Mock API endpoints for NextDoc UK Mentor Dashboard
import { faker } from '@faker-js/faker/locale/en_GB';

// UK-specific data for healthcare context
const UK_TRUSTS = [
  'NHS Foundation Trust London',
  'Oxford University Hospitals NHS FT',
  'Cambridge University Hospitals NHS FT', 
  'Manchester University NHS FT',
  'Birmingham and Solihull NHS FT',
  'Liverpool University Hospitals NHS FT',
  'Sheffield Teaching Hospitals NHS FT',
  'Leeds Teaching Hospitals NHS Trust',
  'Newcastle Upon Tyne Hospitals NHS FT',
  'Bristol, North Somerset and South Gloucestershire CCG'
];

const UK_SPECIALTIES = [
  'Internal Medicine',
  'General Practice',
  'Emergency Medicine', 
  'Anaesthetics',
  'Surgery (General)',
  'Psychiatry',
  'Paediatrics',
  'Obstetrics & Gynaecology',
  'Radiology',
  'Pathology'
];

const VISA_TYPES = [
  'Skilled Worker Visa',
  'Health and Care Worker Visa',
  'Tier 2 (General)',
  'Student Visa',
  'Other'
];

const PATHWAYS = [
  'PLAB Preparation',
  'NHS Job Ready', 
  'Postgraduate Training'
];

// Generate realistic mentee data
export const generateMentees = (count: number = 6) => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const specialty = faker.helpers.arrayElement(UK_SPECIALTIES);
    
    return {
      id: `mentee-${i + 1}`,
      name: `Dr. ${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      pathway: faker.helpers.arrayElement(PATHWAYS),
      trust: faker.helpers.arrayElement(UK_TRUSTS),
      specialty,
      visaStatus: faker.helpers.arrayElement(VISA_TYPES),
      examDate: faker.date.future(),
      cvReadiness: faker.number.int({ min: 45, max: 95 }),
      interviewSimBand: faker.number.int({ min: 1, max: 9 }),
      sponsorMatchShortlist: faker.number.int({ min: 2, max: 12 }),
      gapMapStage: faker.helpers.arrayElement(['Planning', 'In Progress', 'Review', 'Complete']),
      riskLevel: faker.helpers.arrayElement(['low', 'medium', 'high']),
      lastActivity: faker.date.recent(),
      notes: []
    };
  });
};

// Generate tasks data
export const generateTasks = (count: number = 12) => {
  const taskTypes = ['CVPro™', 'InterviewSim+™', 'SponsorMatch™', 'GapMap™', 'General'];
  const priorities = ['low', 'medium', 'high'];
  const statuses = ['new', 'in-progress', 'waiting-mentee', 'done'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `task-${i + 1}`,
    title: faker.company.catchPhrase(),
    type: faker.helpers.arrayElement(taskTypes),
    menteeId: `mentee-${faker.number.int({ min: 1, max: 6 })}`,
    priority: faker.helpers.arrayElement(priorities),
    status: faker.helpers.arrayElement(statuses),
    dueDate: faker.date.future(),
    createdAt: faker.date.recent(),
    description: faker.lorem.paragraph(),
    checklist: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
      id: faker.string.uuid(),
      text: faker.lorem.sentence(),
      completed: faker.datatype.boolean()
    }))
  }));
};

// Generate sessions data
export const generateSessions = () => {
  const sessionTypes = ['CV Clinic', 'Interview Drill', 'Career Consult', 'GapMap Review'];
  
  return [
    {
      id: 'session-1',
      type: 'CV Clinic',
      menteeIds: ['mentee-1', 'mentee-2'],
      startTime: new Date('2024-09-25T10:00:00Z'),
      endTime: new Date('2024-09-25T11:00:00Z'),
      googleMeetLink: 'https://meet.google.com/abc-defg-hij',
      objectives: 'Review CV structure and ATS optimization for NHS applications',
      status: 'scheduled'
    },
    {
      id: 'session-2', 
      type: 'Interview Drill',
      menteeIds: ['mentee-3'],
      startTime: new Date('2024-09-25T14:00:00Z'),
      endTime: new Date('2024-09-25T15:00:00Z'),
      googleMeetLink: 'https://meet.google.com/xyz-uvwx-lmn',
      objectives: 'Practice clinical scenarios and NHS values-based questions',
      status: 'scheduled'
    },
    {
      id: 'session-3',
      type: 'Career Consult', 
      menteeIds: ['mentee-4'],
      startTime: new Date('2024-09-26T09:00:00Z'),
      endTime: new Date('2024-09-26T10:00:00Z'),
      googleMeetLink: 'https://meet.google.com/opq-rstu-vwx',
      objectives: 'Discuss specialty training pathways and Trust preferences',
      status: 'scheduled'
    }
  ];
};

// Generate messages data
export const generateMessages = () => {
  return [
    {
      id: 'thread-1',
      menteeId: 'mentee-1',
      lastMessage: {
        id: 'msg-1',
        content: 'Thank you for the CV feedback! I\'ve updated the clinical experience section.',
        timestamp: new Date('2024-09-24T16:30:00Z'),
        senderId: 'mentee-1',
        senderType: 'mentee'
      },
      unreadCount: 0
    },
    {
      id: 'thread-2',
      menteeId: 'mentee-2', 
      lastMessage: {
        id: 'msg-2',
        content: 'Could you help me prepare for the Trust interview next week?',
        timestamp: new Date('2024-09-24T15:45:00Z'),
        senderId: 'mentee-2',
        senderType: 'mentee'
      },
      unreadCount: 1
    },
    {
      id: 'thread-3',
      menteeId: 'mentee-3',
      lastMessage: {
        id: 'msg-3',
        content: 'My InterviewSim+ score improved to Band 7! Thank you for the practice sessions.',
        timestamp: new Date('2024-09-24T11:20:00Z'),
        senderId: 'mentee-3',
        senderType: 'mentee'
      },
      unreadCount: 0
    },
    {
      id: 'thread-4',
      menteeId: 'mentee-4',
      lastMessage: {
        id: 'msg-4',
        content: 'I need guidance on the GapMap milestone requirements.',
        timestamp: new Date('2024-09-23T14:15:00Z'),
        senderId: 'mentee-4',
        senderType: 'mentee'
      },
      unreadCount: 2
    }
  ];
};

// Generate analytics data
export const generateAnalytics = () => {
  return {
    cohortKpis: {
      avgCvReadiness: 73,
      avgInterviewImprovmement: 15,
      gapMapOnTrack: 82,
      sponsorMatchCleared: 68
    },
    individualMetrics: [
      {
        menteeId: 'mentee-1',
        cvReadinessTrend: [45, 52, 61, 68, 75, 78],
        interviewBandTrend: [3, 4, 5, 6, 6, 7],
        gapMapProgress: ['Planning', 'Planning', 'In Progress', 'In Progress', 'Review', 'Review']
      },
      {
        menteeId: 'mentee-2',
        cvReadinessTrend: [38, 45, 58, 65, 71, 73],
        interviewBandTrend: [2, 3, 4, 5, 6, 6],
        gapMapProgress: ['Planning', 'In Progress', 'In Progress', 'In Progress', 'Review', 'Complete']
      }
    ]
  };
};

// Generate resources data
export const generateResources = () => {
  return [
    {
      id: 'resource-1',
      title: 'NHS CV Template 2024',
      description: 'Official NHS application CV template with ATS optimization',
      tags: ['CVPro™', 'Templates', 'NHS'],
      url: 'https://nextdocuk.co.uk/resources/nhs-cv-template',
      type: 'template'
    },
    {
      id: 'resource-2',
      title: 'Interview Rubrics (SBAR Framework)', 
      description: 'Structured approach to clinical scenario interviews',
      tags: ['InterviewSim+™', 'SBAR', 'Clinical'],
      url: 'https://nextdocuk.co.uk/resources/sbar-rubrics',
      type: 'guide'
    },
    {
      id: 'resource-3',
      title: 'NHS Trust Directory & Contacts',
      description: 'Comprehensive list of NHS Trusts with contact information',
      tags: ['SponsorMatch™', 'Trusts', 'Contacts'],
      url: 'https://nextdocuk.co.uk/resources/trust-directory.csv',
      type: 'data'
    },
    {
      id: 'resource-4',
      title: 'Skilled Worker Visa Overview',
      description: 'Complete guide to UK healthcare worker visa requirements',
      tags: ['SponsorMatch™', 'Visa', 'Legal'],
      url: 'https://nextdocuk.co.uk/resources/visa-guide',
      type: 'guide'
    },
    {
      id: 'resource-5',
      title: 'Portfolio & CPD Requirements',
      description: 'GMC portfolio requirements and CPD tracking templates',
      tags: ['GapMap™', 'GMC', 'Portfolio'],
      url: 'https://nextdocuk.co.uk/resources/portfolio-cpd',
      type: 'template'
    }
  ];
};

// Generate earnings data
const generateEarnings = () => {
  return {
    summary: {
      thisMonth: 202.40,
      nextPayout: { amount: 145.60, date: '2025-10-30' },
      lifetime: 1847.20
    },
    history: [
      {
        id: 'earning-1',
        date: new Date('2025-10-19'),
        type: 'Session',
        sessionType: 'CV Clinic',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Paid',
        payoutDate: new Date('2025-10-25')
      },
      {
        id: 'earning-2',
        date: new Date('2025-10-15'),
        type: 'Session',
        sessionType: 'Interview Drill',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Paid',
        payoutDate: new Date('2025-10-20')
      },
      {
        id: 'earning-3',
        date: new Date('2025-10-10'),
        type: 'Session',
        sessionType: 'Career Planning',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Pending',
        payoutDate: null
      },
      {
        id: 'earning-4',
        date: new Date('2025-09-28'),
        type: 'Session',
        sessionType: 'PLAB Preparation',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Paid',
        payoutDate: new Date('2025-10-05')
      },
      {
        id: 'earning-5',
        date: new Date('2025-09-20'),
        type: 'Session',
        sessionType: 'Portfolio Review',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Paid',
        payoutDate: new Date('2025-09-27')
      },
      {
        id: 'earning-6',
        date: new Date('2025-09-12'),
        type: 'Session',
        sessionType: 'Mock Interview',
        mentorFee: 80.00,
        platformFee: 20.00,
        processingFee: 2.40,
        netAmount: 57.60,
        status: 'Paid',
        payoutDate: new Date('2025-09-19')
      }
    ],
    trend: [
      { month: 'May', sessions: 120, instagram: 0 },
      { month: 'Jun', sessions: 180, instagram: 0 },
      { month: 'Jul', sessions: 240, instagram: 0 },
      { month: 'Aug', sessions: 200, instagram: 0 },
      { month: 'Sep', sessions: 160, instagram: 0 },
      { month: 'Oct', sessions: 202, instagram: 0 }
    ]
  };
};

// Mock API delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockApi = {
  // Overview data
  async getOverview() {
    await delay(500);
    const mentees = generateMentees();
    const tasks = generateTasks();
    const sessions = generateSessions();
    const messages = generateMessages();
    
    return {
      todaysSessions: sessions.filter(s => 
        new Date(s.startTime).toDateString() === new Date().toDateString()
      ),
      queueCounts: {
        cvproReviews: tasks.filter(t => t.type === 'CVPro™' && t.status !== 'done').length,
        interviewsimFeedback: tasks.filter(t => t.type === 'InterviewSim+™' && t.status !== 'done').length,
        sponsormatchReviews: tasks.filter(t => t.type === 'SponsorMatch™' && t.status !== 'done').length,
        gapmapCheckpoints: tasks.filter(t => t.type === 'GapMap™' && t.status !== 'done').length,
        generalTasks: tasks.filter(t => t.type === 'General' && t.status !== 'done').length
      },
      unreadMessages: messages.filter(m => m.unreadCount > 0).slice(0, 5),
      atRiskMentees: mentees.filter(m => m.riskLevel === 'high').slice(0, 3)
    };
  },

  // Mentees
  async getMentees() {
    await delay(300);
    return generateMentees();
  },

  // Tasks
  async getTasks() {
    await delay(400);
    return generateTasks();
  },

  async updateTaskStatus(taskId: string, status: string) {
    await delay(200);
    return { success: true, taskId, status };
  },

  // Sessions
  async getSessions() {
    await delay(300);
    return generateSessions();
  },

  async createSession(sessionData: any) {
    await delay(500);
    return { ...sessionData, id: `session-${Date.now()}` };
  },

  // Messages
  async getMessages() {
    await delay(300);
    return generateMessages();
  },

  async getThread(threadId: string) {
    await delay(200);
    return {
      id: threadId,
      messages: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, (_, i) => ({
        id: `msg-${threadId}-${i}`,
        content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
        timestamp: faker.date.recent(),
        senderId: i % 3 === 0 ? 'mentor-1' : threadId.replace('thread-', 'mentee-'),
        senderType: i % 3 === 0 ? 'mentor' : 'mentee'
      }))
    };
  },

  // Analytics
  async getAnalytics() {
    await delay(600);
    return generateAnalytics();
  },

  // Resources
  async getResources() {
    await delay(200);
    return generateResources();
  },

  // Earnings
  async getEarnings() {
    await delay(400);
    return generateEarnings();
  }
};