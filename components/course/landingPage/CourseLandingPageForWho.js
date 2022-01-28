import { Typography, List, ListItem, Box } from '@mui/material';

const ForWhoItem = ({ item }) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Box
        coponent="span"
        sx={{
          height: 8,
          width: 8,
          borderRadius: '50%',
          backgroundColor: 'text.secondary',
        }}
      ></Box>
      <Typography>{item}</Typography>
    </ListItem>
  );
};

export default function CourseLandingPageForWho({ forWho }) {
  return (
    <Box>
      <Typography variant="h4" mb={1}>
        Who this course is for:
      </Typography>
      <List>
        {forWho.map((item) => (
          <ForWhoItem key={item} item={item} />
        ))}
      </List>
    </Box>
  );
}
