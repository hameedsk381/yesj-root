import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      rememberMe: event.target.checked
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(formData.username, formData.password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}>
        Admin Panel
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Sign in to manage website content
      </Text>

      {error && (
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Login Error" 
          color="red" 
          mt="md"
        >
          {error}
        </Alert>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            placeholder="admin"
            value={formData.username}
            onChange={handleChange('username')}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="admin123"
            value={formData.password}
            onChange={handleChange('password')}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox 
              label="Remember me" 
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminLogin;