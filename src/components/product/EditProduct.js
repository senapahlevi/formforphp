import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [barang, setBarang] = useState("");
  const [alamat, setAlamat] = useState("");
  const [validationError, setValidationError] = useState({});
  const jenisBarang = ["Silahkan pilih jenis barang", "Barang Mudah Pecah", "Mengandung Zat Kimia", "Mudah Terbakar", "Barang tahan Banting", ""];
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/products/${id}`)
      .then(({ data }) => {
        const { name, barang, alamat } = data.product;
        setName(name);
        setBarang(barang);
        setAlamat(alamat);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  //   const changeHandler = (event) => {
  //     setImage(event.target.files[0]);
  //   };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("barang", barang);
    formData.append("alamat", alamat);
    // if (image !== null) {
    //   formData.append("image", image);
    // }

    await axios
      .post(`http://127.0.0.1:8000/api/products/${id}`, formData)
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
              <h4 className="card-title">Update Product</h4>
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
                <Form onSubmit={updateProduct}>
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
                      {/* <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                          }}
                        />
                      </Form.Group> */}
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
                    Update
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
