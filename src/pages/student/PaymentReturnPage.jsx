// payment return page
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentReturnPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );
        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student-courses";
        }
      }
      capturePayment();
    }
  }, [payerId, paymentId]);

  //   console.log(params);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 border rounded-lg shadow-md bg-white">
        <CardHeader className="flex flex-col items-center">
          <img
            src="https://img.freepik.com/premium-vector/processing-icon-simple-element-illustration-processing-concept-symbol-design-from-analytics-research-collection-can-be-used-web-mobile_159242-12214.jpg"
            alt="Processing"
            className="w-32 h-32 mb-4"
          />
          <CardTitle className="text-lg font-semibold text-gray-700">
            Processing payment... Please wait
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentReturnPage;
