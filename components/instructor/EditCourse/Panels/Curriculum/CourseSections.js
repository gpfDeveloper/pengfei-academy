import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { List, ListItem, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CourseSectionItem from './CourseSectionItem';
import AddEditSectionDialog from './AddEditSectionDialog';

export default function CourseSections() {
  let initialItems = [{ id: uuid(), title: 'Introduction' }];

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

  const addSectionHandler = () => {
    // const newItem = { title: '', id: uuid() };
    // setItems((pre) => [...pre, newItem]);
    // setAddSectionDialogOpen(true);
  };

  return (
    <>
      <List onDragOver={(e) => e.preventDefault()}>
        {items.map((item, idx) => (
          <CourseSectionItem
            key={item.id}
            onDrag={dragHandler}
            onDrop={dropHandler}
            idx={idx}
            items={items}
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
