import { useSelector, useDispatch } from 'react-redux';
import { updateMyCourseLearningObjectivesAsync } from 'store/course-async';
import DragableInputListForm from 'components/UIs/DragableInputListForm';

export default function LearningObjective() {
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const { token } = user;
  const { id: courseId, learningObjectives } = course;
  const dispatch = useDispatch();
  const submitHandler = (learningObjectives) => {
    dispatch(
      updateMyCourseLearningObjectivesAsync({
        token,
        courseId,
        learningObjectives,
      })
    );
  };
  return (
    <DragableInputListForm
      inputItems={learningObjectives}
      onSubmit={submitHandler}
      addBtnText={'Add more to your response'}
      minItemCount={4}
    />
  );
}
