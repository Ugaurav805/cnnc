import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home/home.jsx";
import Signin from "./pages/signin/signin.jsx";
import Signup from "./pages/signup/signup.jsx";
import Preferences from "./pages/Preferences/preferences.jsx";
import Dashboard from "./pages/Events/dashboard.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
