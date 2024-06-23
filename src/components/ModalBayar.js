import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalBayar = ({ show, handleClose, handlePayment }) => {
  const handlePaymentClick = (method) => {
    handlePayment(method);
    handleClose(); // Tutup modal setelah pembayaran dipilih
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pilih Metode Pembayaran</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="button-container">
          <Button
            variant="primary"
            className="payment-button"
            onClick={() => handlePaymentClick("cash")}
          >
            {" "}
            {/* Panggil handlePaymentClick dengan metode 'cash' */}
            <FontAwesomeIcon icon={faCashRegister} /> <strong>CASH</strong>
          </Button>
          <Button
            variant="primary"
            className="payment-button"
            onClick={() => handlePaymentClick("transfer")}
          >
            {" "}
            {/* Panggil handlePaymentClick dengan metode 'transfer' */}
            <FontAwesomeIcon icon={faBuildingColumns} />{" "}
            <strong>TRANSFER</strong>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBayar;
