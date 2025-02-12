import React from 'react';
import { Text, VStack, Button } from '@chakra-ui/react';

const Home = () => {
    return (
        <VStack spacing={5} align="center" p={5}>
            <Text fontSize="2xl" fontWeight="bold">
                Добро пожаловать на web-приложение для работы с событиями!
            </Text>
            <Text fontSize="lg" textAlign="center">
                Здесь вы можете найти информацию о событиях и подписаться на них.
            </Text>
        </VStack>
    );
};

export default Home;