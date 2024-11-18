import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Select, Checkbox, Button, Group, Box, Grid, Container, Title, Avatar, Radio } from '@mantine/core';
import logo from '../assets/YESJ_Logo_Black.png'
const CourseRegistrationForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      contactNumber: '',
      whatsappNumber: '',
      highestEducation: '',
      currentEducation: '',
      institutionName: '',
      courseAppearingFor: '',
      termsAccepted: false,
      isStudying: 'no',
      howDidYouKnowAboutCourse: '',
      PCown: false,
      preferredBatch: '',
    },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      contactNumber: (value) => (value.length < 10 ? 'Invalid contact number' : null),
      whatsappNumber: (value) => (value.length < 10 ? 'Invalid WhatsApp number' : null),
      highestEducation: (value) => (value ? null : 'Please select your highest education'),
      currentEducation: (value) => (value ? null : 'Please enter your current education'),
      institutionName: (value) => (form.values.isStudying === 'yes' && !value ? 'Please enter your institution name' : null),
      courseAppearingFor: (value) => (value ? null : 'Please enter the course you are appearing for'),
      termsAccepted: (value) => (value ? null : 'You must accept the terms and conditions'),
      howDidYouKnowAboutCourse: (value) => (value ? null : 'Please select how you knew about the course'),
      PCown: (value) => (value ? null : 'Do you have laptop/PC'),
      preferredBatch: (value) => (value ? null : 'Please select your preferred batch'),
    },
  });

  const [isStudying, setIsStudying] = useState(form.values.isStudying);

  const handleSubmit = (values) => {
    fetch('https://example.com/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <Container>
      <Avatar m="auto" mb={10} src={logo} alt="Yesj" radius="xl" size="4rem" />
      <Title ta="center" mb={20} size="h1" style={{ fontSize: 'clamp(29px, 5vw, 42px)' }}>
        Course Registration Form
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <TextInput mt="sm" label="Name" placeholder="Your name" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <TextInput mt="sm" label="Email" placeholder="Your email" {...form.getInputProps('email')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NumberInput
              mt="sm"
              label="Contact Number"
              placeholder="Your contact number"
              {...form.getInputProps('contactNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NumberInput
              mt="sm"
              label="WhatsApp Number"
              placeholder="Your WhatsApp number"
              {...form.getInputProps('whatsappNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Select
              mt="sm"
              label="Highest Education Qualification"
              placeholder="Select your highest education"
              data={['Primary School', 'High School', 'Intermediate', 'Bachelors', 'Masters', 'PhD']}
              {...form.getInputProps('highestEducation')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <TextInput
              mt="sm"
              label="Course Appearing For"
              placeholder="Course you are appearing for"
              {...form.getInputProps('courseAppearingFor')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Radio.Group withAsterisk
              mt="sm"
              label="Are you currently studying?"
              value={form.values.isStudying}
              onChange={(value) => {
                form.setFieldValue('isStudying', value);
                setIsStudying(value);
              }}
            >
              <Group mt="xs">
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </Group>
            </Radio.Group>
          </Grid.Col>
          
          {form.values.isStudying === 'yes' && (
            <>
             <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <TextInput
              mt="sm"
              label="Current Education"
              placeholder="Your current education"
              {...form.getInputProps('currentEducation')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
              <TextInput
                mt="sm"
                label="Institution Name"
                placeholder="Your institution name"
                {...form.getInputProps('institutionName')}
              />
            </Grid.Col>
            </>
           
          )}
         
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Select
              mt="sm"
              label="How did you know about the course?"
              placeholder="Select an option"
              data={['Online', 'Friends', 'College', 'Other']}
              {...form.getInputProps('howDidYouKnowAboutCourse')}
            />
          </Grid.Col>
         
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <Select
              mt="sm"
              label="Preferred Batch"
              placeholder="Select your preferred batch"
              data={['3pm to 4 pm', '4pm to 5 pm']}
              {...form.getInputProps('preferredBatch')}
            />
          </Grid.Col>
        
          <Grid.Col span={12}>
            <Radio.Group withAsterisk
              mt="sm"
              label="Do you have laptop/PC?"
              value={form.values.PCown ? 'yes' : 'no'}
              onChange={(value) => form.setFieldValue('PCown', value === 'yes')}
            >
              <Group mt="xs">
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </Group>
            </Radio.Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Checkbox
              mt="sm"
              label="I accept the terms and conditions"
              {...form.getInputProps('termsAccepted', { type: 'checkbox' })}
            />
          </Grid.Col>
        </Grid>
        
        <Group position="right" mt="md">
          <Button type="submit" m={'auto'} mt={10}>Submit</Button>
        </Group>
      </form>
    </Container>
  );
};

export default CourseRegistrationForm;
