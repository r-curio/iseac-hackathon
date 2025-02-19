"use client";
import { Slide, ToastContainer } from "react-toastify";
import React from "react";
const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
  );
};

export default ToastProvider;
