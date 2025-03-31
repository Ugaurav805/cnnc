import { Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Booking from "../Events/Booking/booking.jsx";
import Events from "../Events/events.jsx";
import Settings from "./Settings/settings.jsx";
import Availability from "../Events/Availability/availability.jsx";
import EventForm from "./EventForm/EventForm.jsx";
import Eventform2 from "./EventForm/Eventform2.jsx";
function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/eventform" element={<EventForm />} />
          <Route path="/eventform2" element={<Eventform2 />} />
          <Route path="/" element={<Events />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
