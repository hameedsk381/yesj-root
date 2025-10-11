import React, { useState } from 'react';
import { Container, Group, Tabs, Button, Modal, Avatar, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import Register from './Register';
import classes from './HeaderTabs.module.css';
import logo1 from '../assets/YESJ_Logo_Black.png'
const tabs = [
  'Home',
  'About Us',
  'Programmes',
  'YESJ Echoes',
  'Gallery',
  'Courses',
  'Events',
  'Contribute',
];

function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const [login, setLogin] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // or 'register'
  const [menuOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false); // Drawer state

  const showLogin = () => {
    setCurrentView('login');
  };

  const showRegister = () => {
    setCurrentView('register');
  };

  const items = tabs.map((tab) => {
    const to = tab === 'Home' ? '/' : `/${tab.replace(/\s+/g, '').toLowerCase()}`;
    return (
      <Tabs.Tab  value={tab} key={tab} component={Link} to={to} onClick={closeDrawer}>
        {tab}
      </Tabs.Tab>
    );
  });

  return (
    <>
      <Modal opened={opened} onClose={close}>
        {currentView === 'login' ? <Login onRegisterClick={showRegister} /> : <Register onLoginClick={showLogin} />}
      </Modal>

      <Drawer
        opened={menuOpened}
        onClose={closeDrawer}
        title="Navigation Menu"
        padding="xl"
        size="md"
        classNames={{
          drawer: classes.drawer,
        }}
      >
        <Tabs
         

        
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Drawer>

      <header className={classes.header}>
        <nav className="hidden md:flex justify-around py-2">
          <Tabs
            defaultValue="Home"
            variant="default"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List >{items}</Tabs.List>
          </Tabs>
          {/* {login ? <ProfileMenu /> : <Button variant="gradient" gradient={{ from: 'blue', to: 'pink' }} onClick={open}>Login / Register</Button>} */}
        </nav>
        <div className="flex md:hidden justify-between w-full pb-3 pr-3">
          <Avatar src={logo1} alt="Yesj" radius="xl" size="3.5rem" />
          <Burger size={'md'}  opened={menuOpened} onClick={openDrawer} className='mt-3' />
        </div>
      </header>

      <div className="hidden md:block">
        <div className={classes.avatarContainer}>
          <Avatar src={logo1} alt="Yesj" radius="xl" size="5.5rem" />
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Header;
