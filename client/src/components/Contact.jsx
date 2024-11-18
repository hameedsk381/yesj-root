import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Box,
  Anchor,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandFacebook } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';
import classes from './ContactUs.module.css';

const social = [
  {
    link: 'https://www.facebook.com/p/Yesj-India-100064349035932/',
    icon: IconBrandFacebook,
  },
  {
    link: 'https://www.youtube.com/channel/UCTSkz72_2ss_e8u33rqmZvQ',
    icon: IconBrandYoutube,
  },
  {
    link: 'https://www.instagram.com/explore/locations/105637734587280/yesj-india/',
    icon: IconBrandInstagram,
  },
];


export function Contact() {
  const icons = social.map((socialItem, index) => (
    <Anchor href={socialItem.link} key={index} target="_blank">
      <ActionIcon size={28} className={classes.social} variant="transparent">
        <socialItem.icon size="1.4rem" stroke={1.5} />
      </ActionIcon>
    </Anchor>
  ))

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.inner}>
        <div className={classes.contactDetails}>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>
          <ContactIconsList />
          <Group mt="xl">{icons}</Group>
        </div>
        <Box className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Group position="right" mt="md">
            <Button className={classes.control}>Send message</Button>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}

export default Contact;
