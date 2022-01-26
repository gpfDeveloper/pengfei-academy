import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCourseSectionAsync,
  editCourseSectionAsync,
  createLectureAsync,
} from 'store/course-async';
import { useState } from 'react';
import {
  Box,
  ListItem,
  IconButton,
  Tooltip,
  Typography,
  Paper,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
// import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import AddEditSectionDialog from './AddEditSectionDialog';
import DialogConfirmDelete from 'components/UIs/DialogConfirmDelete';
import AddEditLectureDialog from './CourseLecture/AddEditLectureDialog';
import CourseLectureItems from './CourseLecture/CourseLectureItems';

export default function CourseSectionItem({
  idx,
  onDrag,
  onDrop,
  sectionItems,
  // setItems,
}) {
  // const [title, setTitle] = useState(items[idx].title);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const section = sectionItems[idx];
  const sectionTitle = section.title;
  const sectionLabel = `Section ${idx + 1}:`;
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isAddLectureDialogOpen, setIsAddLectureDialogOpen] = useState(false);
  const editSectionHandler = (sectionTitle) => {
    setIsEditSectionDialogOpen(false);
    dispatch(
      editCourseSectionAsync({
        token,
        title: sectionTitle,
        sectionId: section.id,
        courseId: section.course,
      })
    );
  };

  const deleteSectionHandler = () => {
    setIsConfirmDeleteDialogOpen(false);
    dispatch(
      deleteCourseSectionAsync({
        token,
        courseId: section.course,
        sectionId: section.id,
      })
    );
  };

  const addLectureHandler = ({ title }) => {
    setIsAddLectureDialogOpen(false);
    dispatch(
      createLectureAsync({
        token,
        courseId: section.course,
        sectionId: section.id,
        title,
      })
    );
  };

  // const changeHandler = (e) => {
  //   const value = e.target.value;
  //   setTitle(value);
  //   setItems((pre) => {
  //     const newItems = [...pre];
  //     newItems[idx].title = value;
  //     return newItems;
  //   });
  // };

  // const deleteHandler = () => {
  //   setItems((pre) => {
  //     const ret = [];
  //     for (let i = 0; i < pre.length; i++) {
  //       if (i === idx) continue;
  //       ret.push(pre[i]);
  //     }
  //     return ret;
  //   });
  // };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          cursor: 'move',
        }}
        draggable
        onDragStart={(e) => onDrag(e, idx)}
        onDrop={(e) => onDrop(e, idx)}
      >
        <ListItem
          sx={{
            borderLeft: '3px solid',
            borderLeftColor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Typography variant="h6" sx={{ flex: '0 0 92px' }}>
              {sectionLabel}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              <DescriptionIcon fontSize="small" />
              <Typography>{sectionTitle}</Typography>
            </Box>
            <Box>
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
          </Box>
          <CourseLectureItems sectionIdx={idx} sectionItems={sectionItems} />
          <Box>
            <IconButton
              onClick={() => setIsAddLectureDialogOpen(true)}
              sx={{
                borderRadius: 0,
              }}
            >
              <AddIcon fontSize="small" color="primary" />
              <Typography
                fontWeight="bold"
                color="primary.main"
                variant="body2"
              >
                Add a new lecture
              </Typography>
            </IconButton>
          </Box>
        </ListItem>
      </Paper>
      {isEditSectionDialogOpen && (
        <AddEditSectionDialog
          isOpen={isEditSectionDialogOpen}
          title={sectionTitle}
          onCancel={() => setIsEditSectionDialogOpen(false)}
          onSave={editSectionHandler}
        />
      )}
      {isAddLectureDialogOpen && (
        <AddEditLectureDialog
          isOpen={isAddLectureDialogOpen}
          onCancel={() => setIsAddLectureDialogOpen(false)}
          onSave={addLectureHandler}
        />
      )}
      <DialogConfirmDelete
        isOpen={isConfirmDeleteDialogOpen}
        onClose={() => setIsConfirmDeleteDialogOpen(false)}
        onDelete={deleteSectionHandler}
        title="Delete This Section?"
        content="Are you sure you want to delete this section? 
        All the lectures in this section will also be deleted. 
        This is permanent and cannot be undone."
      />
    </>
  );
}
