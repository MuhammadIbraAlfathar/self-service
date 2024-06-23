import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Login, Register, Home, Sukses } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Login />} exact/>
            <Route path="/register" element={<Register />} exact/>
            <Route path="/home" element={<Home />} exact/>
            <Route path="/sukses" element={<Sukses />} exact/>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
