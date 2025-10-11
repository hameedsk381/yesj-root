import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  AppShell,
  Text,
  Burger,
  useMantineTheme,
  Group,
  Button,
  Box
} from '@mantine/core';
import { IconHome, IconPhoto, IconCalendar, IconBook, IconSpeakerphone, IconSettings, IconLogout } from '@tabler/icons-react';

function AdminDashboard({ children }) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: IconHome, path: '/admin/dashboard' },
    { label: 'Carousel', icon: IconPhoto, path: '/admin/carousel' },
    { label: 'Announcements', icon: IconSpeakerphone, path: '/admin/announcements' },
    { label: 'Courses', icon: IconBook, path: '/admin/courses' },
    { label: 'Events', icon: IconCalendar, path: '/admin/events' },
    { label: 'Programmes', icon: IconSettings, path: '/admin/programmes' },
    { label: 'Gallery', icon: IconPhoto, path: '/admin/gallery' }
  ];

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorSchemeValue === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbar={{
        width: { sm: 200, lg: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      header={{ height: { base: 50, md: 70 } }}
      padding="md"
    >
      <AppShell.Header p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
            hiddenFrom="sm"
          />
          <Text fw={500} size="lg">Admin Dashboard</Text>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow mt="xs">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="subtle"
              leftSection={<item.icon size={16} />}
              onClick={() => navigate(item.path)}
              fullWidth
              justify="flex-start"
              mb="xs"
            >
              {item.label}
            </Button>
          ))}
        </AppShell.Section>
        <AppShell.Section>
          <Button
            variant="subtle"
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
            fullWidth
            justify="flex-start"
          >
            Logout
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box p="md">
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminDashboard;