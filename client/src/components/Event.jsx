import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Image,
  Text,
  Title,
  Group,
  Badge,
  Loader,
  Container,
  Divider,
} from '@mantine/core';

export default function EventPage() {
  const { id } = useParams(); // Event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  // Fetch event details
  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`https://server.yesj.in/events/${id}`); // Replace with your API endpoint
      setEvent(response.data);
    } catch (err) {
      console.error('Error fetching event details:', err);
      setError('Failed to fetch event details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Text color="red" size="lg">
          {error}
        </Text>
      </Container>
    );
  }

  return (
    <Container size="lg" className="my-6">
      <Card shadow="lg" padding="xl" radius="lg"  withBorder>
        {/* Event Image */}
        {event.imageUrl && (
          <Image
            src={event.imageUrl}
            alt={event.title}
            radius="lg"
            className="mb-6"
          />
        )}

        {/* Event Title */}
        <Title order={1} className="mb-4 text-center">
          {event.title}
        </Title>
             {/* Category and Public/Private Badge */}
             <Group position="apart" className="my-6">
          {event.category && (
            <Badge color="blue" size="lg" radius="sm">
              {event.category.toUpperCase()}
            </Badge>
          )}
          <Badge color={event.isPublic ? 'green' : 'red'} size="lg" radius="sm">
            {event.isPublic ? 'Public' : 'Private'}
          </Badge>
        </Group>
<div className='flex flex-row justify-between my-6 mx-6'>
  
<h2>
<strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
</h2>
<h2>
<strong>Location:</strong> {new Date(event.date).toLocaleDateString()}
</h2>
</div>


        {/* Organizer */}
        <Text size="lg" className="my-4">
          <strong>Organizer:</strong> {event.organizer || 'N/A'}
        </Text>

        {/* Attendees */}
        <Text size="lg" className="mb-4">
          <strong>Attendees:</strong>{' '}
          {event.attendees.length > 0 ? event.attendees.join(', ') : 'None'}
        </Text>

   

        <Divider my="md" />

        {/* Event Description */}
        <div className="mt-4">
          <Text  variant='gradient' style={{fontSize:'30px'}} className="mb-6 text-center ">
            Event Details
          </Text>
          <div
            dangerouslySetInnerHTML={{ __html: event.description }}
            className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mt-8 "
          />
        </div>
      </Card>
    </Container>
  );
}
