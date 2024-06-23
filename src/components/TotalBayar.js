import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import StrukTransaksi from './StrukTransaksi'; 

const TotalBayar = (props) => {
  const [showStruk, setShowStruk] = useState(false);
  const [pesanan, setPesanan] = useState(null); // Tambahkan state pesanan

  const handleCloseStruk = () => setShowStruk(false);
  const handleShowStruk = () => {
    const totalBayar = props.keranjangs.reduce((result, item) => result + item.total_harga, 0);
    const pesanan = {
      total_bayar: totalBayar,
      menus: props.keranjangs
    };
    setPesanan(pesanan); // Set data pesanan sebelum menampilkan struk
    setShowStruk(true);
  };

  const handleContinueToPayment = () => {
    handleCloseStruk();
    // Implementasikan logika untuk melanjutkan ke pembayaran
  };

  const totalBayar = props.keranjangs.reduce((result, item) => result + item.total_harga, 0);

  if (props.keranjangs.length === 0) {
    return (
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="mb-2 mt-4 mr-2"
              size="lg"
              disabled
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <>
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="danger"
              block="true"
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={handleShowStruk}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>CHECKOUT</strong>
            </Button>
          </Col>
        </Row>
      </div>
     
      <StrukTransaksi
        show={showStruk}
        handleClose={handleCloseStruk}
        handleContinueToPayment={handleContinueToPayment} // Tambahkan prop untuk melanjutkan ke pembayaran
        totalBayar={totalBayar}
        pesanan={pesanan} // Kirim data pesanan ke StrukTransaksi
      />
    </>
  );
}

export default TotalBayar;
