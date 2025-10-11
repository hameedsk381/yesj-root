import React from 'react';
import { Title, Text, Card, SimpleGrid, Group } from '@mantine/core';
import { IconPhoto, IconSpeakerphone, IconBook, IconCalendar, IconSettings, IconPhotoOff } from '@tabler/icons-react';

function AdminHome() {
  const stats = [
    { title: 'Carousel Slides', icon: IconPhoto, value: '8' },
    { title: 'Announcements', icon: IconSpeakerphone, value: '12' },
    { title: 'Courses', icon: IconBook, value: '15' },
    { title: 'Events', icon: IconCalendar, value: '7' },
    { title: 'Programmes', icon: IconSettings, value: '5' },
    { title: 'Gallery Images', icon: IconPhotoOff, value: '42' },
  ];

  return (
    <div>
      <Title order={2} mb="xl">Dashboard Overview</Title>
      
      <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
        {stats.map((stat) => (
          <Card key={stat.title} shadow="sm" p="lg" withBorder>
            <Group justify="space-between">
              <Text size="xl" fw={500}>{stat.value}</Text>
              <stat.icon size={32} />
            </Group>
            <Text size="sm" color="dimmed" mt="sm">
              {stat.title}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
      
      <Card mt="xl" shadow="sm" p="lg" withBorder>
        <Title order={3} mb="md">Quick Actions</Title>
        <Text mb="sm">Welcome to the YESJ Admin Panel. Here you can manage all aspects of your website:</Text>
        <ul>
          <li>Update carousel images and content</li>
          <li>Create and manage announcements</li>
          <li>Add or modify courses</li>
          <li>Schedule and update events</li>
          <li>Manage programmes and activities</li>
          <li>Upload and organize gallery images</li>
        </ul>
      </Card>
    </div>
  );
}

export default AdminHome;