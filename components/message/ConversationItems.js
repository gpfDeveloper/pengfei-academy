import List from '@mui/material/List';
import Spinner from 'components/UIs/Spinner';

import ConversationItem from './ConversationItem';

export default function ConversationItems({
  items,
  onSelectItem,
  current,
  isLoading,
}) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {isLoading && <Spinner />}
      {!isLoading &&
        items.map((item) => (
          <ConversationItem
            key={item.id}
            userName={item.userName}
            lastMsg={item.lastMsg}
            isSendByMe={item.isSendByMe}
            lastMsgTime={item.lastMsgTime}
            id={item.id}
            current={current}
            onClick={onSelectItem}
          />
        ))}
    </List>
  );
}
