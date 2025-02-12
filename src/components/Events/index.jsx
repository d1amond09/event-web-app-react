import React, { useContext, useEffect, useState } from 'react';
import Event from './Event.jsx';
import Pagination from '../Pagination';
import { AuthContext } from '../../context/AuthContext.jsx';
import Filters from './Filters';
import CreateButton from '../Actions/CreateButton.jsx';
import { defaultFilters } from './Filters/data.js';
import Loading from '../Loading/index.jsx';
import { subscribeToEvent, unsubscribeFromEvent } from '../../services/participants.js';
import { useToast } from '@chakra-ui/react';

export default function Events({ fetchEvents }) {
    const toast = useToast();
    const { isAdmin } = useContext(AuthContext);
    const [filter, setFilter] = useState(defaultFilters);
    const [totalPages, setTotalPages] = useState(0);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const { events, totalPages } = await fetchEvents({ ...filter, pageNumber: filter.pageNumber });
        setEvents(events);
        setTotalPages(totalPages);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const handleSearch = async () => {
        await fetchData();
    };

    const handlePageChange = (page) => {
        setFilter((prev) => ({ ...prev, pageNumber: page }));
    };

    const handleSubscribe = async (eventId) => {
        const status = await subscribeToEvent(eventId);
        if (status === 200) {
            toast({
                title: 'Успех!',
                description: 'Вы успешно подписаны на событие!',
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left'
            });
        } else {
            toast({
                title: 'Ошибка',
                description: 'Ошибка при подписке на событие.',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left'
            });
        }
    };

    const handleUnsubscribe = async (eventId) => {
        const status = await unsubscribeFromEvent(eventId);
        if (status === 200) {
            toast({
                title: 'Успех!',
                description: 'Вы успешно отписались от события!',
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left'
            });
        } else {
            toast({
                title: 'Ошибка',
                description: 'Ошибка при отписке от события.',
                status: 'error',
                duration: 1000,
                isClosable: true,
                position: 'bottom-left'
            });
        }
    };

    const admin = isAdmin();

    return (
        <section className='container flex flex-row justify-start items-start gap-12'>
            <div className='flex flex-col w-1/3 gap-10'>
                <Filters filter={filter} setFilter={setFilter} onSearch={handleSearch} />
                {admin && <CreateButton link={"events"} />}
            </div>
            <div className='flex-1 w-2/3'>
                <ul className='grid grid-cols-2 gap-5'>
                    {loading ? (
                        <h1 className='text-4xl col-span-2 text-center mt-56'><Loading/></h1>
                    ) : (
                        events.length > 0 ? (
                            events.map((event) => (
                                <li key={event.Id}>
                                    <Event
                                        event={event}
                                        isAdmin={admin}
                                        onSubscribe={handleSubscribe}
                                        onUnsubscribe={handleUnsubscribe}
                                    />
                                </li>
                            ))
                        ) : (
                            <h1 className='text-4xl col-span-2 text-center mt-56'>Не найдено событий.</h1>
                        )
                    )}
                </ul>
                {events.length > 0 && (
                    <Pagination
                        currentPage={filter.pageNumber}
                        totalPages={totalPages || 0}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
}