import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventById } from '../../services/events';
import { Box, Heading, Text, Stack, Image, Spinner } from '@chakra-ui/react';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({
        name: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        maxCountParticipants: 0,
        image: null,
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            const eventData = await fetchEventById(id);
            setEvent(eventData);
        };
        fetchEventDetails();
    }, [id]);

    if (!event.name) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box className="container mx-auto p-5">
            <Stack spacing={5} className="bg-white shadow-lg rounded-lg p-6">
                {event.image && (
                    <Image
                        src={event.image}
                        alt={event.name}
                        borderRadius="md"
                        objectFit="cover"
                        height="300px"
                    />
                )}
                <Heading as="h2" size="xl">{event.name}</Heading>
                <Text fontSize="lg" fontWeight="bold">Описание:</Text>
                <Text fontSize="lg"> {event.description}</Text>
                <Box className="meta mt-4">
                    <Text><strong>Категория:</strong> {event.category}</Text>
                    <Text><strong>Локация:</strong> {event.location}</Text>
                    <Text><strong>Дата и время:</strong> {new Date(event.dateTime).toLocaleString()}</Text>
                    <Text><strong>Максимальное количество участников:</strong> {event.maxCountParticipants}</Text>
                </Box>
            </Stack>
        </Box>
    );
};

export default EventDetails;