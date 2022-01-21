import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Box,
  TextField,
  List,
  ListItem,
  IconButton,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AddIcon from '@mui/icons-material/Add';

const MAX_LENGTH = 160;

const DragableItem = ({
  idx,
  onDrag,
  onDrop,
  items,
  setItems,
  disableDelete,
}) => {
  const [value, setValue] = useState(items[idx].text);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (value.length > MAX_LENGTH) {
      setHasError(true);
    }
    if (hasError && value.length < MAX_LENGTH) {
      setHasError(false);
    }
  }, [value, hasError]);

  const changeHandler = (e) => {
    const value = e.target.value;
    setValue(value);
    setItems((pre) => {
      const newItems = [...pre];
      newItems[idx].text = value;
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
    <ListItem key={idx} sx={{ pl: 0 }}>
      <TextField
        fullWidth
        value={value}
        onChange={changeHandler}
        helperText={hasError && `Input at most have ${MAX_LENGTH} charactors.`}
        error={hasError}
      />
      <IconButton
        disabled={disableDelete}
        sx={{
          border: '1px solid',
          borderColor: 'text.disabled',
          borderRadius: 0,
        }}
        onClick={deleteHandler}
      >
        <DeleteIcon color="" fontSize="large" />
      </IconButton>
      <Tooltip title="Drag to reorder">
        <IconButton
          sx={{
            '&:hover': { backgroundColor: 'transparent' },
            cursor: 'move',
            border: '1px solid',
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
  );
};

export default function DragableInputListForm({
  onSubmit = () => {},
  addBtnText,
  inputItems,
  minItemCount = 1,
}) {
  let initialItems = [];
  if (inputItems) {
    initialItems = inputItems.map((item) => ({ id: uuid(), text: item }));
  }
  const offset = minItemCount - initialItems.length;
  if (offset > 0) {
    for (let i = 0; i < offset; i++)
      initialItems.push({ id: uuid(), text: '' });
  }
  const [items, setItems] = useState(initialItems);

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

  const addMoreHandler = () => {
    const newItem = { text: '', id: uuid() };
    setItems((pre) => [...pre, newItem]);
  };

  const checkItems = () => {
    for (const item of items) {
      if (item.text.length > MAX_LENGTH) {
        return false;
      }
    }
    return true;
  };
  const removeEmptyItems = () => {
    const ret = [];
    for (const item of items) {
      if (item.text.trim().length === 0) continue;
      ret.push(item.text);
    }
    return ret;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (checkItems()) {
      const submitItems = removeEmptyItems();
      onSubmit(submitItems);
    }
  };
  return (
    <Box component="form" onSubmit={submitHandler}>
      <List onDragOver={(e) => e.preventDefault()}>
        {items.map((item, idx) => (
          <DragableItem
            disableDelete={items.length <= minItemCount}
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
            onClick={addMoreHandler}
            sx={{
              borderRadius: 0,
            }}
          >
            <AddIcon fontSize="large" color="primary" />
            <Typography fontWeight="bold" color="primary.main">
              {addBtnText ? addBtnText : 'Add more'}
            </Typography>
          </IconButton>
        </ListItem>
        <ListItem sx={{ pl: 0 }}>
          <Button variant="contained" size="large" type="submit">
            Save
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
