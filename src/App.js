import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import ResetPassword from './reset-password';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
