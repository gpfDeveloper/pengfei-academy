import { List } from '@mui/material';
import CourseLectureItem from './CourseLectureItem';

export default function CourseLectureItems({ sectionIdx, sectionItems }) {
  const lectures = sectionItems[sectionIdx].lectures || [];
  return (
    <List
      onDragOver={(e) => e.preventDefault()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 4,
        pl: 4,
        width: '100%',
      }}
    >
      {lectures.map((item, idx) => (
        <CourseLectureItem
          key={item.id}
          sectionIdx={sectionIdx}
          lectureIdx={idx}
          sectionItems={sectionItems}
        />
      ))}
    </List>
  );
}
