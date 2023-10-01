import React, {useState} from "react";
import {Card, Col, Container, Form, Row, Button} from "react-bootstrap";

const Quotes = ({categories}) => {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("happiness");
    const [apiResponse, setApiResponse] = useState(true);

    const fetchQuote = async () => {
        try {

            const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
                method: 'GET',
                headers: {
                    // Include any required headers here (e.g., authentication tokens or API keys)
                    'Content-Type': 'application/json',
                    // X-Api-Key
                    'X-Api-Key': 'tHIxG4GTcySg44HSyd7mNg==4YobUljuiLxOq4om'
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.length > 0) {
                setQuote(data[0].quote);
                setAuthor(data[0].author);
                setCategory(data[0].category);
            } else {
                setQuote('No quotes found for this category.');
                setAuthor('');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setApiResponse(true)
    }

/*    useEffect(() => {
        fetchQuote(); // Call the API when the component is initially loaded
    }, []);*/

    const generateQuote = () => {
        setApiResponse(false)
        fetchQuote();
    }

    /*useEffect(() => {
        fetchQuote();
    }, [category])*/

    return (
        <Container fluid>
            <Row className="justify-content-center align-items-center" style={{minHeight: '100vh'}}>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center quote-title" style={{fontWeight: 'bold', color: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);', fontSize: '30px'}}>
                                Random Quotes Generator
                            </Card.Title>
                            <Form>
                                <Form.Group className="mb-3 text-center select-category-text">
                                    <Form.Label column sm={4}>
                                        Select Category
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} className="">
                                    <Col sm={12} md={12} lg={6} className="mb-3">
                                        <Form.Select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {
                                                categories.map((category, index) => {
                                                    return (
                                                        <option value={category} key={index}>{category.toUpperCase()}</option>
                                                    )
                                                })
                                            }
                                            {/* Add other category options here */}
                                        </Form.Select>
                                    </Col>
                                    <Col sm={12} lg={6} md={12} className="mb-3">
                                        <Button variant="primary" onClick={generateQuote} className="w-100">
                                            {apiResponse ? "Generate Quote" : "Loading..."}
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>

                            {
                                quote && author
                                    ?
                                    <div className="quote-container">
                                        <div className="quote-text mt-3">
                                            <span className="left-double-quote">“</span>
                                            <span className="quote">{quote}</span>
                                            <span className="right-double-quote">”</span>
                                        </div>
                                        <div className="author text-center mt-3">
                                            <span className="author-text fst-italic">{`- ${author}`}</span>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Quotes;