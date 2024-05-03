import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // Send a PUT request to update the order with the payment intent
        await newRequest.put("/orders", { payment_intent });

        // Redirect to the orders page after a delay
        setTimeout(() => {
          navigate("/orders");
        }, 5000); // 5000 milliseconds (5 seconds) delay before redirect
      } catch (err) {
        console.log("Error updating order:", err);
      }
    };

    makeRequest();
  }, [navigate, payment_intent]); // Depend on navigate and payment_intent

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  );
};

export default Success;
