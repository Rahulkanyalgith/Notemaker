import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Mystate from "./context/data/myState";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Addnote from "./pages/addnote/Addnote";
import Updatenote from "./pages/updatenote/Updatenote";
import Profile from "./pages/profile/Profile";
import Nopage from "./pages/nopage/Nopage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    
    <Mystate>

      <Router>
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addnote" element={

            <ProtectedRoute>
              <Addnote />
            </ProtectedRoute>
          } />
          <Route path="/notes/edit/:id" element={

            <ProtectedRoute>
              <Updatenote />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <Toaster/>
      </Router>
    </Mystate>
  );
}


export default App;


export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}