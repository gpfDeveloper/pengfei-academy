export const PAGES = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Teach here', path: '/teaching' },
  { label: 'My learing', path: '/my-course/learning' },
];

export const PAGES_INSTRUCTOR = [
  { label: 'Home', path: '/' },
  { label: 'Course', path: '/course' },
  { label: 'Instructor', path: '/instructor' },
  { label: 'My learing', path: '/my-course/learning' },
];

export const SESSION_EXPIRE_SEC = 60 * 60 * 24 * 365;

export const RESET_PASSWORD_EXPIRE_SEC = 60 * 60 * 24;

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

export const COURSE_REVIEW_STATUS = {
  reviewing: 'Reviewing',
  approved: 'Approved',
  needsFixes: 'Needs Fixes',
};

export const COURSE_CATEGORY = {
  Development: {
    id: 0,
    subcategory: {
      'Web Development': true,
      'Data Science': true,
      'Mobile Development': true,
      'Programming Languages': true,
      'Game Development': true,
      'Database Design & Development': true,
      'Software Testing': true,
      'Software Engineering': true,
      'Software Development Tools': true,
      'No-Code Development': true,
    },
  },
  Business: {
    id: 1,
    subcategory: {
      Entrepreneurship: true,
      Communication: true,
      Management: true,
      Sales: true,
      'Business Strategy': true,
      Operations: true,
      'Project Management': true,
      'Business Law': true,
      'Business Analytics & Intelligence': true,
      'Human Resources': true,
      Industry: true,
      'E-Commerce': true,
      Media: true,
      'Real Estate': true,
      'Other Business': true,
    },
  },
  'Finance & Accounting': {
    id: 2,
    subcategory: {
      'Accounting & Bookkeeping': true,
      Compliance: true,
      'Cryptocurrency & Blockchain': true,
      Economics: true,
      Finance: true,
      'Finace Cert & Exam Prep': true,
      'Financial Modeling & Analysis': true,
      'Investing & Trading': true,
      'Money Management Tools': true,
      Taxes: true,
      'Other Finance & Accounting': true,
    },
  },
  'IT & Software': {
    id: 3,
    subcategory: {
      'IT Certifications': true,
      'Network & Security': true,
      Hardware: true,
      'Operating Systems & Servers': true,
      'Other IT & Software': true,
    },
  },
  'Office Productivity': {
    id: 4,
    subcategory: {
      Microsoft: true,
      Apple: true,
      Google: true,
      SAP: true,
      Oracle: true,
      'Other Office Productivity': true,
    },
  },
  'Personal Development': {
    id: 5,
    subcategory: {
      'Personal Transformation': true,
      'Personal Productivity': true,
      Leadership: true,
      'Career Development': true,
      'Parenting & Relationships': true,
      Happiness: true,
      'Esoteric Practices': true,
      'Religion & Spirituality': true,
      'Personal Brand Building': true,
      Creativity: true,
      Influence: true,
      'Self Esteem & Confidence': true,
      'Stress Management': true,
      'Memory & Study Skills': true,
      Motivation: true,
      'Other Personal Development': true,
    },
  },
  Design: {
    id: 6,
    subcategory: {
      'Web Design': true,
      'Graphic Design & Illustration': true,
      'Design Tools': true,
      'User Experience Design': true,
      'Game Design': true,
      '3D & Animation': true,
      'Fashion Design': true,
      'Architectual Design': true,
      'Interior Design': true,
      'Other Design': true,
    },
  },
};

export const COURSE_LANGUAGE = {
  English: 0,
  日本語: 1,
  中文: 2,
};

export const COURSE_CONTENT_TYPE = {
  video: 'Video',
  article: 'Article',
};

export const S3_BUCKETS = {
  userAvatarBucket: 'pengfei-academy-user-avatar-bucket',
  lectureVideoBucket: 'pengfei-academy-lecture-video-bucket',
  courseImageBucket: 'pengfei-academy-course-image-bucket',
};
