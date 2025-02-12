import React, { useEffect, useState } from 'react';
import {
    Card,
    CardFooter,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Text,
    Button,
    Image,
    Flex,
} from '@chakra-ui/react';
import Actions from '../Actions';
import { useNavigate } from 'react-router-dom';
import { checkSubscribing } from '../../services/participants.js';
import useAuth from "../../hooks/useAuth.js";

export default function Event({ event, isAdmin, onSubscribe, onUnsubscribe }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (user){
            const checkSubscriptionStatus = async () => {
                const status = await checkSubscribing(event.Id);
                setIsSubscribed(status);
            };
            checkSubscriptionStatus();
        }
    }, [event.Id]);

    const handleButtonClick = () => {
        if (isSubscribed) {
            onUnsubscribe(event.Id);
            setIsSubscribed(false);
        } else {
            onSubscribe(event.Id);
            setIsSubscribed(true);
        }
    };

    const handleEventClick = () => {
        navigate(`/events/${event.Id}`);
    };

    const getBase64Image = () => {
        if (event?.Image) {
            return `data:image/png;base64,${btoa(
                new Uint8Array(event.Image).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            )}`;
        }
        return null;
    };

    return (
        <Card variant={'filled'} borderWidth={1} borderColor={'gray.300'} borderRadius="lg" boxShadow="md">
            <CardHeader onClick={handleEventClick} className={"hover:text-indigo-500"}>
                <Flex direction="column" alignItems="center">
                    {event?.Image && (
                        <Image
                            borderRadius="md"
                            src={getBase64Image()}
                            alt={event.Name}
                            objectFit="cover"
                            boxSize="200px"
                        />
                    )}
                    <Heading size={"md"} pb={2}>{event.Name}</Heading>
                    <Heading size={"sm"} color="gray.600">{event.Location}</Heading>
                </Flex>
            </CardHeader>
            <Divider borderColor={'gray'}/>
            <CardBody>
                <Heading size={"sm"} color="blue.600">{event.Category}</Heading>
                <Text fontWeight="bold" color="gray.500">{new Date(event.DateTime).toLocaleString()}</Text>
                <Text color="gray.500">Максимальное количество участников: {event.MaxCountParticipants}</Text>
            </CardBody>
            <Divider borderColor={'gray'}/>
            <CardFooter>
                    {isAdmin ? <Actions link={"events"} id={event.Id} /> : ""}
                    {user ? (
                        <Button
                            colorScheme={isSubscribed ? "red" : "teal"}
                            onClick={handleButtonClick}
                            mt={2}
                        >
                            {isSubscribed ? "Отписаться от события" : "Подписаться на событие"}
                        </Button>
                    ): ""}
            </CardFooter>
        </Card>
    );
}