import { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CourseSectionItem from './CourseSectionItem';
import AddEditSectionDialog from './AddEditSectionDialog';

export default function CourseSectionItems() {
  const course = useSelector((state) => state.course);
  const { sections } = course;

  // const [items, setItems] = useState(initialItems);
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);

  const dragHandler = (e, dragIdx) => {
    // e.dataTransfer.setData('dragIdx', dragIdx);
  };
  const dropHandler = (e, dropIdx) => {
    // const dragIdx = +e.dataTransfer.getData('dragIdx');
    // setItems((pre) => {
    //   const ret = [...pre];
    //   const tmp = ret[dragIdx];
    //   ret[dragIdx] = ret[dropIdx];
    //   ret[dropIdx] = tmp;
    //   return ret;
    // });
  };

  // const addSectionHandler = () => {
  //   const newItem = { title: '', id: uuid() };
  //   setItems((pre) => [...pre, newItem]);
  //   setAddSectionDialogOpen(true);
  // };

  return (
    <>
      <List
        onDragOver={(e) => e.preventDefault()}
        sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {sections.map((item, idx) => (
          <CourseSectionItem
            key={item.id}
            onDrag={dragHandler}
            onDrop={dropHandler}
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
      <AddEditSectionDialog
        isOpen={isAddSectionDialogOpen}
        onCancel={() => setIsAddSectionDialogOpen(false)}
      />
    </>
  );
}
