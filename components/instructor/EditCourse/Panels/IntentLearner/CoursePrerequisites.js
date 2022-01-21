import { useSelector, useDispatch } from 'react-redux';
import { updateMyCoursePrerequisitesAsync } from 'store/course-async';
import DragableInputListForm from 'components/UIs/DragableInputListForm';

export default function CoursePrerequisites() {
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const { token } = user;
  const { id: courseId, prerequisites } = course;
  const dispatch = useDispatch();
  const submitHandler = (prerequisites) => {
    dispatch(
      updateMyCoursePrerequisitesAsync({
        token,
        courseId,
        prerequisites,
      })
    );
  };
  return (
    <DragableInputListForm
      inputItems={prerequisites}
      onSubmit={submitHandler}
      addBtnText={'Add more to your response'}
      minItemCount={1}
    />
  );
}
