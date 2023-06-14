import axios from "axios";
import { useState } from "react";
import useRazorpay from "react-razorpay";


export const Home = ()=>{

    const Razorpay = useRazorpay();
    const [amount, setAmount] = useState(500);
  
    // complete order
    const complete_order = (paymentID, orderID, signature)=>{
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/razorpay/order/complete/',
            data: {
                "payment_id": paymentID,
                "order_id": orderID,
                "signature": signature,
                "amount": amount
            }
        })
        .then((response)=>{
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error.response.data);
        })
    }

    const razorPay = ()=>{
        //create order
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/razorpay/order/create/',
            data: {
                amount: amount,
                currency: "INR"
            }
        })
        .then((response)=>{
            
            // get order id
            var order_id = response.data.data.id
            
            // handle payment
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                name: "Acme Corp",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {

                    //complete order
                    complete_order(
                        response.razorpay_payment_id,
                        response.razorpay_order_id,
                        response.razorpay_signature
                    )
                },
                prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
                },
                notes: {
                address: "Razorpay Corporate Office",
                },
                theme: {
                color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className="container mt-5 text-center rounded bg-warning border p-5" style={{width:"28%"}}>
            <h1 className="fw-bolder display-2">₹500</h1>
            <p>per year</p>
            <div>
                <h3 className="fw-semibold">Basic</h3>
                <div className="text-start mt-3">
                    <ul style={{fontSize:"14px"}}>
                        <li>1 custom domain e.g. img.yourdomain.com</li>
                        <li>Media library backup</li>
                        <li>Automated image analysis reports with Performance Center</li>
                        <li>One-time 30 minute consultation with a media optimization expert</li>
                        <li>Live chat & 12-hr SLA support tickets</li>
                        <li>5 user accounts with role-based permissions</li>
                    </ul>
                </div>
                <div className="d-grid mt-3">
                    <button type="button" className="btn btn-light fw-semibold py-3" onClick={razorPay}>Upgrad now</button>
                </div>
            </div>
        </div>
    )
}
