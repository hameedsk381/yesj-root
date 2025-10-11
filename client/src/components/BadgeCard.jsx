import { IconHeart } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BadgeCard.module.css';
import { CourseDetailsModal } from './animated-model';

export function BadgeCard({ image, title,  description, badges, duration }) {
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card} style={{ height: '400px' }}>
      <Card.Section style={{ height: '180px' }}>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md" style={{ height: '100px' }}>
        <Text fz="lg" fw={500}>
          {title}
        </Text>
        <Text fz="xs" my="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button variant='gradient' bg={'red'} radius="md" style={{ flex: 1 }}>
          <CourseDetailsModal title={title} description={description} duration={duration} />
        </Button>
      </Group>
    </Card>
  );
}