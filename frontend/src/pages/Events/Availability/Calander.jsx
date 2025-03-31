import React, { useState } from 'react';
import Modal from 'react-modal';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calander.css';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalanderView = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date() });

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ start, end, title: '' });
    setModalIsOpen(true);
  };

  const handleSaveEvent = () => {
    setEvents([...events, newEvent]);
    setModalIsOpen(false);
  };

  return (
    <div className="Calander-container">
      <div className="Calander-header">
        <div className="Calander-activity">
          <span>Event type</span>
          <span className="Calander-arrow">›</span>
        </div>
        <div className="Calander-timezone">
          <span>Indian Time Standard</span>
          <span className="Calander-arrow">›</span>
        </div>
      </div>

      <div style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['day', 'week', 'month']}
          step={60}
          timeslots={1}
          style={{ border: '1px solid #e0e0e0 ', borderRadius: '8px' }}
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Create Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.start.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
        />
        <input
          type="datetime-local"
          value={newEvent.end.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
        />
        <button onClick={handleSaveEvent}>Save Event</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CalanderView;