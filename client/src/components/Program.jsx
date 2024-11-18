import { Box, Flex, Paper, Text, ThemeIcon, rem } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons-react';
import classes from './CardGradient.module.css';
import { Link } from 'react-router-dom';

export default function Program({title,desc,poster,eventnum}) {
  return (
    <Paper withBorder  radius="md" className={classes.card} component={Link} to={`/event/${eventnum}`} >
  <Box>
  <img src={poster} className='mx-auto' alt="poster" style={{width:'75%'}}/>
      <Text size="md" fw={500} mt="md" ta={'center'}>
      {desc}
      </Text>
  </Box>
    </Paper>
  );
}