import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
//import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditUser from "./components/product/EditProduct";
import CreateProduct from "./components/product/InputProduct";
import List from "./components/product/Listproduct";

function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Pergudangan
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/product/create" element={<CreateProduct />} />
              <Route path="/product/edit/:id" element={<EditUser />} />
              {/* <Route path="/datadiri/create" element={<CreateProduct />} />
              <Route path="/datadiri/edit/:id" element={<EditUser />} /> */}
              <Route exact path="/" element={<List />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
