import { Button, Input, InputGroup, Select, InputRightElement, Textarea, HStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { createEvent, updateEvent } from "../../services/events.js";
import { useNavigate } from "react-router-dom";

export default function EventForm({ initialData }) {
    const [event, setEvent] = useState(initialData || {
        name: "",
        description: "",
        dateTime: "",
        location: "",
        category: "",
        maxCountParticipants: 0,
        image: null,
    });

    useEffect(() => {
        setEvent(initialData || {
            name: "",
            description: "",
            dateTime: "",
            location: "",
            category: "",
            maxCountParticipants: 0,
            image: null,
        });
    }, [initialData]);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (initialData) {
            await updateEvent(event);
        } else {
            await createEvent(event, event.image);
        }

        setEvent({
            name: "",
            description: "",
            dateTime: "",
            location: "",
            category: "",
            maxCountParticipants: 0,
            image: null,
        });
        navigate('/events');
    }

    return (
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-10">
            <div className="place-items-center mt-12">
                <h1 className="font-bold text-4xl center">
                    {initialData ? "Изменение события" : "Создание события"}
                </h1>
            </div>
            <Input required
                   placeholder="Название события"
                   value={event.name}
                   onChange={(e) => setEvent({...event, name: e.target.value})}
            />
            <Textarea
                maxHeight="200px" resize="vertical"
                placeholder="Описание..."
                value={event.description}
                onChange={(e) => setEvent({...event, description: e.target.value})}
            />
            <Input required
                   type="datetime-local"
                   placeholder="Дата и время"
                   value={event.dateTime}
                   onChange={(e) => setEvent({...event, dateTime: e.target.value})}
            />
            <Input required
                   placeholder="Место"
                   value={event.location}
                   onChange={(e) => setEvent({...event, location: e.target.value})}
            />
            <Input required
                   placeholder="Категория"
                   value={event.category}
                   onChange={(e) => setEvent({...event, category: e.target.value})}
            />
            <Input required
                   type='number' min={1}
                   placeholder="Максимальное количество участников"
                   value={event.maxCountParticipants || ""}
                   onChange={(e) => setEvent({...event, maxCountParticipants: e.target.value})}
            />
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEvent({...event, image: e.target.files[0]})}
            />
            <Button type="submit" colorScheme="blue">
                {initialData ? "Сохранить изменения" : "Создать"}
            </Button>
        </form>
    );
}