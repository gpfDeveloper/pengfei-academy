import List from '@mui/material/List';
import Spinner from 'components/UIs/Spinner';

import ConversationItemMobile from './ConversationItemMobile';

export default function ConversationItemsMobile({ items, isLoading }) {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        padding: 2,
      }}
    >
      {isLoading && <Spinner />}
      {!isLoading &&
        items.map((item) => (
          <ConversationItemMobile
            key={item.id}
            userName={item.userName}
            userAvatar={item.userAvatar}
            lastMsg={item.lastMsg}
            isSendByMe={item.isSendByMe}
            lastMsgTime={item.lastMsgTime}
            id={item.id}
          />
        ))}
    </List>
  );
}
