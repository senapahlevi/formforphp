import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();

  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [alamat, setAlamat] = useState("");
  const [name, setName] = useState("");
  const [barang, setBarang] = useState("");
  const [alamat, setAlamat] = useState("");
  const [validationError, setValidationError] = useState({});
  const jenisBarang = ["Silahkan pilih jenis barang", "Barang Mudah Pecah", "Mengandung Zat Kimia", "Mudah Terbakar", "Barang tahan Banting", ""];

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("barang", barang);
    formData.append("alamat", alamat);

    await axios
      .post(`http://127.0.0.1:8000/api/products`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Input Data</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={createProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(event) => {
                          setBarang(event.target.value);
                        }}
                      >
                        {jenisBarang.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          type="text"
                          value={alamat}
                          onChange={(event) => {
                            setAlamat(event.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Simpan
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
