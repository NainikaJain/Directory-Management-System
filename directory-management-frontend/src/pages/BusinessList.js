
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BusinessList() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:5159/api/Business";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("Fetched Businesses:", response.data);
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid Business ID!");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this business?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5159/api/Business/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete business.");
      }
  
      alert("Business deleted successfully!");
      setBusinesses(businesses.filter((b) => b.businessID !== id));
    } catch (error) {
      alert(`Failed to delete business. Error: ${error.message}`);
    }
  };
  

  // EDIT Business Function
  const handleEdit = (id) => {
    navigate(`/edit-business/${id}`);
  };

  if (loading) return <p>Loading businesses...</p>;

  return (
    <Container className="mt-4">
      <h2 className="mb-3">📌 Business Directory</h2>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="🔍 Search by Name or City..."
        className="mb-3"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {/* Business Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.length > 0 ? (
            businesses
              .filter(
                (b) =>
                  b.name.toLowerCase().includes(search) ||
                  b.city.toLowerCase().includes(search)
              )
              .map((business) => (
                <tr key={business.id}>
                  <td>{business.businessID || "N/A"}</td> {/* Corrected to display Business ID */}
                  <td>{business.name}</td>
                  <td>{business.city}</td>
                  <td>{business.state}</td>
                  <td>{business.phoneNumber}</td>
                  <td>{business.categoryName}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(business.businessID)}
                    >
                      <FaEdit /> Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(business.businessID)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No businesses found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default BusinessList;
