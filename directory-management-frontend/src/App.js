
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusinessList from "./pages/BusinessList";
import AddBusiness from "./pages/AddBusiness";
import EditBusiness from "./pages/EditBusiness";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<BusinessList />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/edit-business/:id" element={<EditBusiness />} />
      </Routes>
    </Router>
  );
}

export default App;





