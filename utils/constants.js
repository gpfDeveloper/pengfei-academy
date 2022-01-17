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
