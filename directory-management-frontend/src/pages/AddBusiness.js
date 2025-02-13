
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

function AddBusiness() {
    const [formData, setFormData] = useState({
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        website: "",
        category: "",
        rating: ""
    });

    const navigate = useNavigate();

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
        "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
        "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
        "New Hampshire", "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
        "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
        "West Virginia", "Wisconsin", "Wyoming"
    ];

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Ensure exactly 10 digits for phone number
        const phonePattern = /^[0-9]\d{9}$/;
        if (!phonePattern.test(formData.phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
    
        // Website validation
        const websitePattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
        if (formData.website && !websitePattern.test(formData.website)) {
            alert("Please enter a valid website URL.");
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

        // Prepare corrected form data to match the backend model
        const correctedData = {
            name: formData.name,
            address: formData.streetAddress,  // Change key from streetAddress to address
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            phoneNumber: formData.phone,  // Change key from phone to phoneNumber
            website: formData.website,
            categoryID: categoryMapping[formData.category] || 5, // Convert category name to ID
            rating: parseFloat(formData.rating) // Ensure rating is a number
        };

        console.log("Submitting Business:", correctedData); // Debugging

        // Send data to backend
        axios.post("http://localhost:5159/api/Business", correctedData)
            .then(() => {
                alert("Business added successfully!");
                navigate("/businesses");
            })
            .catch((error) => {
                console.error("Error adding business:", error);
                alert("Failed to add business. Check console for details.");
            });



        
    };
    

    return (
        <Container className="mt-4">
            <h2>➕ Add New Business</h2>
            <Form onSubmit={handleSubmit}>

                {/* Business Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange} 
                        required 
                        placeholder="Enter business name" 
                    />
                </Form.Group>

                {/* Street Address */}
                <Form.Group className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="streetAddress"
                        value={formData.streetAddress} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter street address" 
                    />
                </Form.Group>

                {/* City */}
                <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="city"
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter city" 
                    />
                </Form.Group>

                {/* State Dropdown */}
                <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>
                                {state}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                

                {/* Zip Code */}
                <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="zipCode" 
                        onChange={handleChange} 
                        required 
                        placeholder="Enter ZIP code" 
                    />
                </Form.Group>

                {/* Phone Number */}
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



                {/* Website */}
                <Form.Group className="mb-3">
                    <Form.Label>Website</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="website" 
                        onChange={handleChange} 
                        placeholder="Enter website URL (optional)" 
                    />
                </Form.Group>

                {/* Category Dropdown */}
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

                {/* Rating Dropdown */}
                <Form.Group className="mb-3">
                    <Form.Label>Rating (1.0 - 5.0)</Form.Label>
                    <Form.Control
                        type="number"
                        name="rating"
                        step="0.1"
                        min="1.0"
                        max="5.0"
                        onChange={handleChange}
                        required
                        placeholder="Enter rating (e.g., 4.3, 4.8)"
                    />
                </Form.Group>


                {/* Submit Button */}
                <Button type="submit" className="mt-3 btn btn-primary">Submit</Button>
            </Form>
        </Container>
    );
}

export default AddBusiness;











