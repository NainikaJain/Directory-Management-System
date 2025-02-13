
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function EditBusiness() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = "http://localhost:5159/api/Business";

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    phone: "",
    category: "",
  });

  // Fetch existing business details and pre-fill the form
  useEffect(() => {
    console.log("EditBusiness ID:", id); // Debugging
  
    if (!id) {
      alert("Invalid Business ID! Redirecting...");
      navigate("/businesses"); // Redirect to business list if ID is missing
      return;
    }
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        const business = response.data;
        setFormData({
          name: business.name || "",
          city: business.city || "",
          state: business.state || "",
          phone: business.phoneNumber || "", 
          category: business.category || "", 
        });
      })
      .catch((error) => console.error("Error fetching business:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (PUT request)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure phone number is valid (10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Convert `category` to `categoryID` (assuming Electronics = 2, Education = 4, etc.)
    const categoryMapping = {
      "Restaurants": 1,
      "Electronics": 2,
      "HealthCare": 3,
      "Education": 4,
      "Other": 5
    };

    // Ensure all fields are correctly formatted for API
    const updatedData = {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      //category: formData.category,
      categoryID: categoryMapping[formData.category] || 5,
    };

    console.log("Updating Business:", updatedData); // Debugging

    axios
      .put(`${API_URL}/${id}`, updatedData) 
      .then(() => {
        alert("Business updated successfully!");
        navigate("/businesses");
      })
      .catch((error) => {
        console.error("Error updating business:", error);
        alert("Failed to update business. Check console for details.");
      });

  };

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate("/businesses")}>
        <FaArrowLeft /> Back
      </Button>
      <h2 className="mt-3">
        <FaEdit /> Edit Business
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
              type="tel"
              name="phone"
              onChange={handleChange}
              required
              placeholder="Enter 10-digit phone number"
              maxLength={10} // Prevents input of more than 10 digits
              pattern="[0-9]{10}" // Ensures only numbers (HTML validation)
              title="Phone number must be exactly 10 digits"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Electronics">Electronics</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="mt-3 btn btn-primary">
          💾 Update
        </Button>
      </Form>
    </Container>
  );
}

export default EditBusiness;
