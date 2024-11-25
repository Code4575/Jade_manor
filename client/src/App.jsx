import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Home";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Layout from "./pages/Layout";
import Accommodations from "./pages/Accommodations";
import AccommodationForm from "./pages/AccommodationForm";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import SingleAccommodation from "./pages/SingleAccommodation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/accommodations" element={<Accommodations />} />
        <Route
          path="/account/accommodations/new"
          element={<AccommodationForm />}
        />
        <Route
          path="/account/accommodations/:id"
          element={<AccommodationForm />}
        />
        <Route path="/account/bookings" element={<Bookings />} />
        <Route path="/accommodation/:id" element={<SingleAccommodation />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
