import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} pull="left" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} transform="left-1" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} pull="left" />;

  return <FontAwesomeIcon icon={faUtensils} pull="left" />;
};

export default class ListCatagories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Server", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoryYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Category</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (  
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoryYangDipilih === category.nama && "category-aktif"}
                style={{cursor: 'pointer'}}
              >
                <h5>
                  <Icon nama={category.nama} />
                  {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
