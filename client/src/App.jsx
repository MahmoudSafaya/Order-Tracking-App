import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./Layout";
import './app.scss'
import NewOrder from "./pages/NewOrder";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />

      <Route element={<Layout />}>
        <Route element={<RequireAuth allowedRoles={["admin", "employee"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
