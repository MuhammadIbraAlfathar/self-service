import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCatagories, Hasil, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Server", error);
      });

    this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("Server", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Server", error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Success Masuk Keranjang!",
                text: keranjang.product.nama + " Sudah Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log("Server", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Success Masuk Keranjang!",
                text: keranjang.product.nama + " Sudah Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log("Server", error);
            });
        }
      })
      .catch((error) => {
        console.log("Server", error);
      });
  };

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCatagories
              changeCategory={this.changeCategory}
              categoryYangDipilih={categoryYangDipilih}
            />
            <Col>
              <h4>
                <strong>Menu</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang} />
          </Row>
        </Container>
      </div>
    );
  }
}
