import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import React from 'react';
import Events from './components/Events';
import DeleteForm from './components/Forms/DeleteForm';
import EditForm from './components/Forms/EditForm';
import EventForm from './components/Events/EventForm.jsx';
import {deleteEvent, fetchEventById, fetchEvents, fetchEventsByMe} from './services/events.js';
import './App.css'
import { Layout } from './components/Layout';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import EventDetails from "./components/Events/EventDetails.jsx";
import PrivateRoute from "./components/Auth/PrivateRoute.jsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home />} />
                        <Route path="/events/me" element={<PrivateRoute> <Events fetchEvents={fetchEventsByMe} /> </PrivateRoute>} />
                        <Route path="/events" element={<Events fetchEvents={fetchEvents} />} />
                        <Route path="/events/create" element={<EventForm />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/events/edit/:id" element={<EditForm CreateForm={EventForm} fetchElementById={fetchEventById} />} />
                        <Route path="/events/delete/:id" element={<DeleteForm link={"events"} deleteElement={deleteEvent}/>} />


                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;