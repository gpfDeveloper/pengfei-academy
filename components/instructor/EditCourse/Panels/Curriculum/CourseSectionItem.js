import { useState } from 'react';
import { Box, ListItem, IconButton, Tooltip, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import AddEditSectionDialog from './AddEditSectionDialog';
import DialogConfirmDelete from 'components/UIs/DialogConfirmDelete';

export default function CourseSectionItem({
  idx,
  onDrag,
  onDrop,
  items,
  setItems,
}) {
  const [title, setTitle] = useState(items[idx].title);
  const sectionLabel = `Section ${idx + 1}:`;
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const editSectionHandler = (inputTitle) => {
    console.log(inputTitle);
  };

  const deleteSectionHandler = () => {};

  const changeHandler = (e) => {
    const value = e.target.value;
    setTitle(value);
    setItems((pre) => {
      const newItems = [...pre];
      newItems[idx].title = value;
      return newItems;
    });
  };

  const deleteHandler = () => {
    setItems((pre) => {
      const ret = [];
      for (let i = 0; i < pre.length; i++) {
        if (i === idx) continue;
        ret.push(pre[i]);
      }
      return ret;
    });
  };

  return (
    <>
      <ListItem
        key={idx}
        sx={{
          borderLeft: '3px solid',
          borderLeftColor: 'primary.main',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6">{sectionLabel}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DescriptionIcon fontSize="small" />
            <Typography>{title}</Typography>
          </Box>
          <Tooltip title="Edit section title">
            <IconButton
              sx={{}}
              onClick={() => setIsEditSectionDialogOpen(true)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete section">
            <IconButton
              sx={{}}
              onClick={() => setIsConfirmDeleteDialogOpen(true)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Tooltip title="Drag to reorder">
          <IconButton
            sx={{
              '&:hover': { backgroundColor: 'transparent' },
              cursor: 'move',
              borderColor: 'text.disabled',
              borderRadius: 0,
            }}
            draggable
            onDragStart={(e) => onDrag(e, idx)}
            onDrop={(e) => onDrop(e, idx)}
          >
            <DragHandleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </ListItem>
      <AddEditSectionDialog
        isOpen={isEditSectionDialogOpen}
        title={title}
        onCancel={() => setIsEditSectionDialogOpen(false)}
        onSave={editSectionHandler}
      />
      <DialogConfirmDelete
        isOpen={isConfirmDeleteDialogOpen}
        onClose={() => setIsConfirmDeleteDialogOpen(false)}
        onDelete={deleteSectionHandler}
        title="Delete This Section?"
        content="Are you sure you want to delete this section? This is permanent and
            cannot be undone."
      />
    </>
  );
}
