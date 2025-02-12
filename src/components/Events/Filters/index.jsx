import { Button, Select, Input, Flex } from '@chakra-ui/react';
import React from 'react';
import { defaultFilters } from './data';

export default function Filters({ filter, setFilter, onSearch }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='flex flex-col gap-5'>
            <Flex gap="5">
                <Input
                    type="text"
                    name="name"
                    placeholder="Поиск по названию"
                    value={filter.name || ""}
                    onChange={handleInputChange}
                />
            </Flex>
            <Flex gap="5">
                <Input
                    type="text"
                    name="location"
                    placeholder="Место"
                    value={filter.location || ""}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="category"
                    placeholder="Категория"
                    value={filter.category || ""}
                    onChange={handleInputChange}
                />
            </Flex>
            <Flex gap="5">
                <Input
                    type="datetime-local"
                    name="minDateTime"
                    placeholder="Мин. дата и время"
                    value={filter.minDateTime || ""}
                    onChange={handleInputChange}
                />
                <Input
                    type="datetime-local"
                    name="maxDateTime"
                    placeholder="Макс. дата и время"
                    value={filter.maxDateTime || ""}
                    onChange={handleInputChange}
                />
            </Flex>
            <div>
                <Select
                    name="orderBy"
                    value={filter.orderBy}
                    onChange={handleInputChange}
                >
                    <option value="name">Название</option>
                    <option value="location">Место проведения</option>
                    <option value="category">Категория</option>
                    <option value="dateTime">Дата и время</option>
                </Select>
            </div>
            <div>
                <Select
                    name="sortOrder"
                    value={filter.sortOrder}
                    onChange={handleInputChange}
                >
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </Select>
            </div>

            <Button onClick={() => {
                setFilter(defaultFilters);
                onSearch();
            }}>
                Сбросить фильтры
            </Button>
        </div>
    );
}