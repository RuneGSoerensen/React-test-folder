import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";
import UserDetailsPage from "./pages/userDetailsPage";
import UserUpdatePage from "./pages/userUpdatePage";

function App() {
  return (
    <main className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="/users/:id/update" element={<UserUpdatePage />} />
      </Routes>
    </main>
  );
}

export default App;
