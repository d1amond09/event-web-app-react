import { API_BASE_URL } from '../config';
import { apiFetch } from './authentication';

export const fetchParticipants = async (filter, id) => {
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

        const response = await apiFetch(`${API_BASE_URL}/events/${id}/participants`, {
            method: "GET",
            params: params,
        });

        return {
            events: response.data,
            totalPages: JSON.parse(response.headers["x-pagination"]).TotalPages
        };
    } catch (error) {
        console.error('Ошибка при получении подписчиков:', error);
        return { events: [], totalPages: 0 };
    }
};

export const subscribeToEvent = async (eventId) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/events/${eventId}/participants`, {
            method: "POST",
            data: {},
        });
        console.log(response)
        return response.status;
    } catch (error) {
        console.error('Ошибка при подписке на событие:', error);
    }
};

export const fetchParticipantById = async (eventId, id) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/events/${eventId}/participants${id}`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении подписчика на событие:', error);
        return null;
    }
};

export const checkSubscribing = async (eventId) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/events/${eventId}/participants/check`, {
            method: "GET",
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
};

export const unsubscribeFromEvent = async (eventId) => {
    try {
        const response = await apiFetch(`${API_BASE_URL}/events/${eventId}/participants`, {
            method: "DELETE",
        });

        return response.status;
    } catch (error) {
        console.error('Ошибка при удалении события:', error);
    }
};