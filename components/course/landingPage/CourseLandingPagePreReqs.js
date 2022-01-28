import { Typography, List, ListItem, Box } from '@mui/material';

const PreReqItem = ({ item }) => {
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

export default function CourseLandingPagePreReqs({ preReqs }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" mb={2}>
        Requirements
      </Typography>
      <List>
        {preReqs.map((item) => (
          <PreReqItem key={item} item={item} />
        ))}
      </List>
    </Box>
  );
}
