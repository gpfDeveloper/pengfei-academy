import { useSelector, useDispatch } from 'react-redux';
import { updateMyCourseForWhoAsync } from 'store/course-async';
import DragableInputListForm from 'components/UIs/DragableInputListForm';

export default function CourseForWho() {
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const { token } = user;
  const { id: courseId, courseForWho } = course;
  const dispatch = useDispatch();
  const submitHandler = (courseForWho) => {
    dispatch(
      updateMyCourseForWhoAsync({
        token,
        courseId,
        courseForWho,
      })
    );
  };
  return (
    <DragableInputListForm
      inputItems={courseForWho}
      onSubmit={submitHandler}
      addBtnText={'Add more to your response'}
      minItemCount={1}
    />
  );
}
