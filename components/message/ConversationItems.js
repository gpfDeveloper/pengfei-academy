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
        borderRight: 1,
        borderColor: 'divider',
        padding: 2,
      }}
    >
      {isLoading && <Spinner />}
      {!isLoading &&
        items.map((item) => (
          <ConversationItem
            key={item.id}
            userName={item.userName}
            userAvatar={item.userAvatar}
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
