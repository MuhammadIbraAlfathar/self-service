import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import swal from "sweetalert";
import html2pdf from "html2pdf.js";
import ModalBayar from "./ModalBayar";
import axios from "axios";

const StrukTransaksi = ({
  show,
  handleClose,
  totalBayar,
  pesanan,
  handlePayment,
}) => {
  const [nomorAntrian, setNomorAntrian] = useState(0);
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("");
  const [idFaktur, setIdFaktur] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showModalBayar, setShowModalBayar] = useState(false);
  const strukRef = useRef(null);

  useEffect(() => {
    const lastAntrian = parseInt(localStorage.getItem("lastNomorAntrian")) || 0;
    setNomorAntrian(lastAntrian);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTanggal(`${formattedDate}`);
    setWaktu(`${formattedTime}`);

    const generateIDFaktur = () => {
      return (
        "INV" +
        now.getFullYear() +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        ("0" + now.getDate()).slice(-2) +
        ("0" + now.getHours()).slice(-2) +
        ("0" + now.getMinutes()).slice(-2) +
        ("0" + now.getSeconds()).slice(-2)
      );
    };
    setIdFaktur(generateIDFaktur());
  }, []);

  const generateNomorAntrian = () => {
    return nomorAntrian + 1;
  };

  const handleTransaction = () => {
    const newNomorAntrian = generateNomorAntrian();
    localStorage.setItem("lastNomorAntrian", newNomorAntrian);
    setNomorAntrian(newNomorAntrian);

    // Generate PDF
    const element = strukRef.current;
    const opt = {
      margin: [0.5, 0.5], // Margin diatur untuk PDF
      filename: `Struk_${idFaktur}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: [3, 8], orientation: "portrait" }, // Mengatur ukuran kertas menjadi 3x8 inci
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        window.location.href = "/sukses";
        handlePayment(selectedPaymentMethod);
      });
  };

  const handlePaymentAfterModalClose = (method) => {
    if (method) {
      setSelectedPaymentMethod(method);
      setShowModalBayar(false);

      swal({
        title: "Konfirmasi",
        text: "Anda yakin ingin melanjutkan pembayaran dengan metode ini?",
        icon: "warning",
        buttons: {
          cancel: "Batal",
          confirm: "OK",
        },
        dangerMode: true,
        buttonsStyling: false,
        className: "swal-buttons-centered",
      }).then((willContinue) => {
        if (willContinue) {
          if (method == "transfer") {
            const dataToSend = {
              //gabungin nama product yang di tambah ke keranjang
              product_name: pesanan.menus
                .map((item) => item.product.nama)
                .join(", "),
              total: totalBayar,
              // sesuaikan quantity yang ada di keranjang
              quantity: pesanan.menus.reduce(
                (acc, item) => acc + item.jumlah,
                0
              ),
            };
            axios
              .post(
                //ini klo mau pake diganti dulu
                "https://03a1-103-186-35-2.ngrok-free.app/api/checkout",
                dataToSend
              )
              .then((response) => {
                console.log(response.data.data.payment_url);
                window.open(response.data.data.payment_url, "blank");
              });
          } else {
            handleTransaction(); // Melanjutkan proses transaksi setelah swal ditutup
          }
        }
      });
    }
  };

  const handleLanjutkanPembayaran = () => {
    setShowModalBayar(true); // Tampilkan modal metode pembayaran
  };

  return (
    <>
      <Modal show={show && !showModalBayar} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Detail Pesanan</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            ref={strukRef}
            style={{
              padding: "10px",
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h5 style={{ margin: "0" }}>
                <strong>Coffee Shop</strong>
              </h5>
              <p style={{ margin: "0" }}>Jl. Contoh No. 123, Jakarta</p>
              <p style={{ margin: "0" }}>Telp: (021) 12345678</p>
            </div>
            <p>
              <strong>Tanggal:</strong> {tanggal}
            </p>
            <p>
              <strong>Waktu:</strong> {waktu}
            </p>
            <p>
              <strong>Nomor Antrian:</strong> {generateNomorAntrian()}
            </p>
            <p>
              <strong>ID Faktur:</strong> {idFaktur}
            </p>
            <hr style={{ margin: "5px 0" }} />
            <p>
              <strong>Produk yang Dipesan:</strong>
            </p>
            <ul style={{ paddingLeft: "20px", margin: "5px 0" }}>
              {pesanan &&
                pesanan.menus.map((item, index) => (
                  <li key={index} style={{ marginBottom: "5px" }}>
                    {item.product.nama} Rp.{" "}
                    {numberWithCommas(item.product.harga)} x {item.jumlah} =
                    <p style={{ display: "inline", marginLeft: "5px" }}>
                      Rp. {numberWithCommas(item.total_harga)}
                    </p>
                  </li>
                ))}
            </ul>
            <hr style={{ margin: "5px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Group
                controlId="exampleForm.ControlInput1"
                style={{ marginBottom: "5px" }}
              >
                <Form.Label>
                  <strong>Total Harga:</strong>
                </Form.Label>
                <p style={{ margin: "0" }}>
                  <strong>Rp. {numberWithCommas(totalBayar)}</strong>
                </p>
              </Form.Group>
            </div>
            <p>
              <strong>Status:</strong> Menunggu Pembayaran
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLanjutkanPembayaran}>
            Lanjutkan Pembayaran
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalBayar
        show={showModalBayar}
        handleClose={() => setShowModalBayar(false)}
        handlePayment={handlePaymentAfterModalClose}
      />
    </>
  );
};

export default StrukTransaksi;
