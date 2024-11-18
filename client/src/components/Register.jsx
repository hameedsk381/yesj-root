import  { useState } from 'react';
import {
  TextInput,
  Button,
  Checkbox,
  Paper,
  Text,
  Group,
  Anchor,
} from '@mantine/core';

function Register({onLoginClick}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (field) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>

     
        <Paper padding="md">
          <Group spacing="xs" style={{ justifyContent: 'space-between' }}>
            <TextInput
              label="First name *"
              placeholder="Your first name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              style={{ flex: '1', marginRight: 10 }}
            />
            <TextInput
              label="Last name *"
              placeholder="Your last name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              style={{ flex: '1' }}
            />
          </Group>

          <TextInput
            style={{ marginTop: 10 }}
            label="Email *"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange('email')}
          />

          <TextInput
            style={{ marginTop: 10 }}
            label="Password *"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
          />

          <TextInput
            style={{ marginTop: 10 }}
            label="Confirm Password *"
            placeholder="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />

<Checkbox label="i agree to terms and conditions " mt="xl" size="md"  checked={formData.agree}
    onChange={handleChange('agree')} />

          <Button style={{ marginTop: 20 }} fullWidth>
            Register
          </Button>

          <Text align="center" style={{ marginTop: 15 }}>
            Have an account?   <Anchor  fw={700} onClick={onLoginClick}>
            Register
          </Anchor>
          </Text>
        </Paper>
    </div>
  );
}

export default Register;
