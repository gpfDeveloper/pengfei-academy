import DragableInputListForm from 'components/UIs/DragableInputListForm';

export default function LearningObjective() {
  return (
    <DragableInputListForm
      addBtnText={'Add more to your response'}
      minItemCount={4}
    />
  );
}
