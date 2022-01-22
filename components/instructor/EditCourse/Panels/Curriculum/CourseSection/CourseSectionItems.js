import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CourseSectionItem from './CourseSectionItem';
import AddEditSectionDialog from './AddEditSectionDialog';

export default function CourseSectionItems() {
  let initialItems = [
    {
      id: uuid(),
      title: 'Getting Started',
      lectures: [
        { id: uuid(), title: 'Welcome to the Course!' },
        { id: uuid(), title: 'What is Next.js? And Why Would you Use it?' },
        { id: uuid(), title: 'Key Features: Sever-side Page (Pre-)Rendering' },
        { id: uuid(), title: 'Key Feature: File-based Routing.' },
        { id: uuid(), title: 'Key Feature: Build Fullstack React Apps!' },
      ],
    },
    {
      id: uuid(),
      title:
        'Project Time2: Page Pre-rendering & Data Fetching,Pre-rendering & Data Fetching',
    },
    { id: uuid(), title: 'Project Time3: Page Pre-rendering & Data Fetching' },
  ];

  const [items, setItems] = useState(initialItems);
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);

  const dragHandler = (e, dragIdx) => {
    e.dataTransfer.setData('dragIdx', dragIdx);
  };
  const dropHandler = (e, dropIdx) => {
    const dragIdx = +e.dataTransfer.getData('dragIdx');
    setItems((pre) => {
      const ret = [...pre];
      const tmp = ret[dragIdx];
      ret[dragIdx] = ret[dropIdx];
      ret[dropIdx] = tmp;
      return ret;
    });
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
        {items.map((item, idx) => (
          <CourseSectionItem
            key={item.id}
            onDrag={dragHandler}
            onDrop={dropHandler}
            idx={idx}
            sectionItems={items}
            setItems={setItems}
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
