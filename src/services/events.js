import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';
import axios from "axios";

export const fetchEvents = async (filter) => {
    try {
        if (filter.minDateTime) {
            const eventDateTime = new Date(filter.minDateTime);
            filter.minDateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }
        if (filter.maxDateTime) {
            const eventDateTime = new Date(filter.maxDateTime);
            filter.maxDateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }
        const params = {};    
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.name) params.name = filter.name;
        if (filter.location) params.location = filter.location;
        if (filter.category) params.category = filter.category;
        if (filter.minDateTime) params.minDateTime = filter.minDateTime;
        if (filter.maxDateTime) params.maxDateTime = filter.maxDateTime;

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`; 
            }
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await axios.get(`${API_BASE_URL}/events`, { headers, params });

        return {
            events: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении событий:', error);
        return { events: [], totalPages: 0 };
    }
};

export const fetchEventsByMe = async (filter) => {
    try {
        if (filter.minDateTime) {
            const eventDateTime = new Date(filter.minDateTime);
            filter.minDateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }
        if (filter.maxDateTime) {
            const eventDateTime = new Date(filter.maxDateTime);
            filter.maxDateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }
        const params = {};
        if (filter.pageNumber) params.pageNumber = filter.pageNumber;
        if (filter.pageSize) params.pageSize = filter.pageSize;
        if (filter.name) params.name = filter.name;
        if (filter.location) params.location = filter.location;
        if (filter.category) params.category = filter.category;
        if (filter.minDateTime) params.minDateTime = filter.minDateTime;
        if (filter.maxDateTime) params.maxDateTime = filter.maxDateTime;

        if (filter.orderBy) {
            params.orderBy = filter.orderBy;
            if (filter.sortOrder) {
                params.orderBy += ` ${filter.sortOrder}`;
            }
        }

        const response = await apiFetch(`${API_BASE_URL}/events/me`, {
            method: "GET",
            params: params,
        });

        console.log(response.data);
        return {
            events: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении событий:', error);
        return { events: [], totalPages: 0 };
    }
};

export const createEvent = async (event, image) => {
    try {
        if (event.dateTime) {
            const eventDateTime = new Date(event.dateTime);
            event.dateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }

        const formData = new FormData();
        formData.append('Name', event.name);
        formData.append('Description', event.description);
        formData.append('DateTime', event.dateTime);
        formData.append('Location', event.location);
        formData.append('Category', event.category);
        formData.append('MaxCountParticipants', event.maxCountParticipants);

        if (image) {
            formData.append('Image', image);
        }

        const response = await apiFetch(`${API_BASE_URL}/events`, {
            method: "POST",
            data: formData,
        });
        return response.status;
    } catch (error) {
        console.error('Ошибка при создании события:', error);
    }
};

export const fetchEventById = async (id) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await axios.get(`${API_BASE_URL}/events/${id}`, { headers });

        return response.data;
    } catch (error) {
        console.error('Ошибка при получении события:', error);
        return null;
    }
};

export const updateEvent = async (event) => {
    try {
        if (event.dateTime) {
            const eventDateTime = new Date(event.dateTime);
            event.dateTime = eventDateTime.toISOString().split('.')[0] + 'Z';
        }
        const response = await apiFetch(`${API_BASE_URL}/events/${event.id}`, {
            method: "PUT",
            data: event,
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при обновлении события:', error);
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/events/${id}`, {
            method: "DELETE",
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении события:', error);
    }
};