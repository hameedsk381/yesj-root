import { Container, Title, Text, Group } from '@mantine/core';
import classes from './errorpage.module.css';
import { Illustration } from '../components/Illustration';


export default function ErrorPage() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description} m={25}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
        
           <Group justify='center'>
           <a  href={'/'}>  Take me back to home page</a>
           </Group>
        
          
        </div>
      </div>
    </Container>
  );
}