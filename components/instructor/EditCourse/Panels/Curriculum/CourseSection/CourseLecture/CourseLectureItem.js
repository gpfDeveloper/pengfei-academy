import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteLectureAsync,
  editLectureAsync,
  dragDropLectureSameSectionAsync,
} from 'store/course-async';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import DialogConfirmDelete from 'components/UIs/DialogConfirmDelete';
import AddEditLectureDialog from './AddEditLectureDialog';

export default function CourseLectureItem({
  sectionIdx,
  sectionItems,
  lectureIdx,
  // onDrag,
  // onDrop,
}) {
  // const [title, setTitle] = useState(items[idx].title);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const section = sectionItems[sectionIdx];
  const lecture = section.lectures[lectureIdx];
  const lectureTitle = lecture.title;
  const lectureLabel = `Lecture ${lectureIdx + 1}:`;
  const [isEditLectureDialogOpen, setIsEditLectureDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const editLectureTitleHandler = ({ title, contentType }) => {
    setIsEditLectureDialogOpen(false);
    const courseId = section.course;
    const lectureId = lecture.id;
    const sectionId = section.id;
    dispatch(
      editLectureAsync({
        courseId,
        lectureId,
        sectionId,
        token,
        title,
        contentType,
      })
    );
  };

  const deleteLecutureHandler = () => {
    setIsConfirmDeleteDialogOpen(false);
    const courseId = section.course;
    const lectureId = lecture.id;
    const sectionId = section.id;
    dispatch(deleteLectureAsync({ courseId, lectureId, sectionId, token }));
  };

  const lectureDragHandler = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('lectureSectionDragIdx', sectionIdx);
    e.dataTransfer.setData('lectureLectureDragIdx', lectureIdx);
  };

  const lectureDropHandler = (e) => {
    e.stopPropagation();
    if (sectionItems.length <= 1 && section.lectures.length <= 1) return;
    const sectionDropIdx = sectionIdx;
    const lectureDropIdx = lectureIdx;
    let sectionDragIdx = e.dataTransfer.getData('lectureSectionDragIdx');
    let lectureDragIdx = e.dataTransfer.getData('lectureLectureDragIdx');
    if (sectionDragIdx === '' || lectureDragIdx === '') {
      return;
    }
    sectionDragIdx = +sectionDragIdx;
    lectureDragIdx = +lectureDragIdx;
    if (sectionDragIdx === sectionDropIdx) {
      if (lectureDragIdx === lectureDropIdx) return;
      dispatch(
        dragDropLectureSameSectionAsync({
          token,
          courseId: section.course,
          sectionId: section.id,
          lectureDragIdx,
          lectureDropIdx,
          sectionIdx: sectionDropIdx,
        })
      );
    } else {
      console.log(
        sectionDragIdx,
        lectureDragIdx,
        sectionDropIdx,
        lectureDropIdx
      );
    }
  };

  return (
    <>
      <Paper
        // elevation={0}
        // variant="outlined"
        sx={{
          cursor: 'move',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
        }}
        draggable
        // onDragStart={(e) => onDrag(e, idx)}
        // onDrop={(e) => onDrop(e, idx)}
        onDragStart={lectureDragHandler}
        onDrop={lectureDropHandler}
      >
        <ListItem
          sx={{
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
            <CheckCircleIcon fontSize="small" />
            <Typography sx={{ flex: '0 0 78px', fontWeight: 'bold' }}>
              {lectureLabel}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              <DescriptionIcon fontSize="small" />
              <Typography>{lectureTitle}</Typography>
            </Box>
            <Box>
              <Tooltip title="Edit lecture">
                <IconButton
                  sx={{}}
                  onClick={() => setIsEditLectureDialogOpen(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete lecture">
                <IconButton
                  sx={{}}
                  onClick={() => setIsConfirmDeleteDialogOpen(true)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </ListItem>
      </Paper>
      {isEditLectureDialogOpen && (
        <AddEditLectureDialog
          isOpen={isEditLectureDialogOpen}
          title={lectureTitle}
          onCancel={() => setIsEditLectureDialogOpen(false)}
          onSave={editLectureTitleHandler}
        />
      )}
      <DialogConfirmDelete
        isOpen={isConfirmDeleteDialogOpen}
        onClose={() => setIsConfirmDeleteDialogOpen(false)}
        onDelete={deleteLecutureHandler}
        title="Delete This Lecture?"
        content="Are you sure you want to delete this lecture? This is permanent and
            cannot be undone."
      />
    </>
  );
}
