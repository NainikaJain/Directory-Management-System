
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function Home() {
    return (
        <Container className="mt-5 text-center">
            <h1>🏢 Welcome to the Business Directory</h1>
            <p className="lead">Manage your business listings easily.</p>
            <div className="mt-4">
                <Link to="/businesses">
                    <Button variant="primary" className="mx-2">View Businesses</Button>
                </Link>
                <Link to="/add-business">
                    <Button variant="success" className="mx-2">Add New Business</Button>
                </Link>
            </div>
        </Container>
    );
}

export default Home;
