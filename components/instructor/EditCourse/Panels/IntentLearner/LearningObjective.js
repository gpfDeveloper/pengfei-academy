import DragableInputListForm from 'components/UIs/DragableInputListForm';

export default function LearningObjective() {
  const inputItems = [
    { text: 'object1' },
    { text: 'object2' },
    { text: 'object3' },
    { text: 'object4' },
  ];
  return (
    <DragableInputListForm
      addText={'Add more to your response'}
      inputItems={inputItems}
    />
  );
}
