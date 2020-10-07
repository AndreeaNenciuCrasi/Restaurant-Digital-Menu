import axios from "axios";
import { param } from "jquery";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function PaymentStatus() {
  const userName = window.sessionStorage.getItem("User");
  const paymentStatus = "success";

  useEffect(() => {
    async function updateOrder() {
      let data = {
        userName: userName,
        paymentStatus: paymentStatus,
      };
      console.log(data);
      axios
        .post("http://localhost:8080/payment", data)
        .then((res) => console.log(res));
    }
    updateOrder();
  }, [userName]);
  return (
    <div style={{ color: "white" }}>
      <h1>Payment Success</h1>
      <h2>Food on your way !</h2>
    </div>
  );
}

export default PaymentStatus;
