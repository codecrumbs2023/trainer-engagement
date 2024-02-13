// import logo from './logo.svg';
// import './App.css';

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BusinessRegister from "./pages/business-register/BusinessRegister";
import Home from "./pages/home/Home";
import TrainerDashboard from "./pages/trainer-register/TrainerDashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import TrainerRegister from "./pages/trainer-register/TrainerRegister";
import BusinessDashboard from "./pages/business-register/BusinessDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route path="/business-register" element={<BusinessRegister />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/trainer-register" element={<TrainerRegister />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute component={AdminDashboard} roles={["admin"]} />
          }
        />
        <Route
          path="/trainer-dashboard"
          element={
            <ProtectedRoute component={TrainerDashboard} roles={["trainer"]} />
          }
        />
        <Route
          path="/business-dashboard"
          element={
            <ProtectedRoute component={BusinessDashboard} roles={["company"]} />
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
