import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import NavBar from "./components/NavBar";
import { UseAppContext } from "./context/AppContext";
import Footer from "./components/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddStory from "./pages/owner/AddStory";
import ManageStories from "./pages/owner/ManageStories";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  let { showLogin } = UseAppContext();
  return (
    <div className="bg-gradient-to-b from-blue-300 via-indigo-200 to-green-100 min-h-screen">
      <NavBar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/Stories" element={<Stories />} />
        <Route path="/Story/:id" element={<Story />} />
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-story" element={<AddStory />} />
          <Route path="manage-stories" element={<ManageStories />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
