import { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User";
import ProtectedPage from "./auth/ProtectedPage";
import Post from "./pages/Post";
import Settings from "./pages/Settings";
import { loadStyleFromCookies } from "./assets/Style";

function App() {
  useEffect(() => {
    loadStyleFromCookies();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
