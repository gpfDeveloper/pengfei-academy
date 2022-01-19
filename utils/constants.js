export const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Blog', path: '/blog' },
  { label: 'Teach here', path: '/teaching' },
];

export const PAGES_INSTRUCTOR = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Blog', path: '/blog' },
  { label: 'Instructor', path: '/instructor' },
];

export const SESSION_EXPIRE_SEC = 60 * 60 * 24 * 365;

export const TEACHING_STATUS = {
  signup: 'signup',
  sendRequest: 'sendRequest',
  haveMeeting: 'haveMeeting',
};

export const TEACH_REQUEST_STATUS = {
  draft: 'draft',
  approved: 'approved',
  rejected: 'rejected',
};

export const NOTIFICATION_TYPES = {
  system: 'system',
  message: 'message',
};

export const CREATE_COURSE_STATUS = {
  draft: 0,
  review: 1,
  approved: 2,
  published: 3,
};

export const CREATE_COURSE_STATUS_REVERSE = {
  0: 'draft',
  1: 'review',
  2: 'approved',
  3: 'published',
};

export const COURSE_CATEGORY = {
  Development: { id: 0 },
  Business: { id: 1 },
  'Finance & Accounting': { id: 2 },
  'IT & Software': { id: 3 },
  'Office Productivity': { id: 4 },
  'Personal Development': { id: 5 },
  Design: { id: 6 },
  Marketing: { id: 7 },
  'Health & Fitness': { id: 8 },
  Music: { id: 9 },
};
