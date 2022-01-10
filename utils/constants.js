export const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Article', path: '/article' },
  { label: 'Teach here', path: '/teaching' },
];

export const PAGES_INSTRUCTOR = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Article', path: '/article' },
  { label: 'Instructor', path: '/instructor' },
];

export const SESSION_EXPIRE_SEC = 60 * 60 * 24 * 365;

export const TEACHING_STATUS = {
  signup: 'signup',
  sendRequest: 'sendRequest',
  haveMeeting: 'haveMeeting',
  complete: 'complete',
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
