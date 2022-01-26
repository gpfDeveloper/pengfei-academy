import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCourseSectionAsync,
  dragDropCourseSectionAsync,
} from 'store/course-async';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CourseSectionItem from './CourseSectionItem';
import AddEditSectionDialog from './AddEditSectionDialog';

export default function CourseSectionItems() {
  const course = useSelector((state) => state.course);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { token } = user;
  const { sections, id: courseId } = course;

  // const [items, setItems] = useState(initialItems);
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);

  const sectionDragHandler = (e, sectionDragIdx) => {
    e.dataTransfer.setData('sectionDragIdx', sectionDragIdx);
  };
  const sectionDropHandler = (e, sectionDropIdx) => {
    const sectionLength = sections.length;
    if (sectionLength <= 1) return;
    const sectionDragIdx = +e.dataTransfer.getData('sectionDragIdx');
    if (sectionDragIdx === sectionDropIdx) return;
    dispatch(
      dragDropCourseSectionAsync({
        sectionDragIdx,
        sectionDropIdx,
        courseId,
        token,
      })
    );
  };

  // const addSectionHandler = () => {
  //   const newItem = { title: '', id: uuid() };
  //   setItems((pre) => [...pre, newItem]);
  //   setAddSectionDialogOpen(true);
  // };

  const addSectionHandler = (title) => {
    setIsAddSectionDialogOpen(false);
    dispatch(createCourseSectionAsync({ token, courseId, title }));
  };

  //Window scroll
  const onDrag = (e) => {
    const windowHeight = window.innerHeight;
    const disToTop = e.clientY;
    let disToBottom = windowHeight - disToTop;

    let speed = 1;
    if (disToTop < 120 || disToBottom < 120) {
      speed = 2;
    }
    if (disToTop < 80 || disToBottom < 80) {
      speed = 4;
    }
    if (disToTop < 40 || disToBottom < 40) {
      speed = 8;
    }
    if (disToTop < 20 || disToBottom < 20) {
      speed = 16;
    }
    if (disToTop < 10 || disToBottom < 10) {
      speed = 32;
    }

    if (disToTop < 150) {
      scrollBy({
        top: -6 * speed,
        behavior: 'smooth',
      });
    } else if (disToTop > windowHeight - 150) {
      scrollBy({
        top: 6 * speed,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <List
        onDragOver={(e) => e.preventDefault()}
        onDrag={onDrag}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {sections.map((item, idx) => (
          <CourseSectionItem
            key={item.id}
            onDrag={sectionDragHandler}
            onDrop={sectionDropHandler}
            idx={idx}
            sectionItems={sections}
            // setItems={setItems}
          />
        ))}
        <ListItem sx={{ pl: 0 }}>
          <IconButton
            onClick={() => setIsAddSectionDialogOpen(true)}
            sx={{
              borderRadius: 0,
            }}
          >
            <AddIcon fontSize="large" color="primary" />
            <Typography fontWeight="bold" color="primary.main">
              Add a new section
            </Typography>
          </IconButton>
        </ListItem>
      </List>
      {isAddSectionDialogOpen && (
        <AddEditSectionDialog
          isOpen={isAddSectionDialogOpen}
          onCancel={() => setIsAddSectionDialogOpen(false)}
          onSave={addSectionHandler}
        />
      )}
    </>
  );
}
