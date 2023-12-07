import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";

import { Image } from "../../components";
import { InfoSubpage, ShipInfoSubpage, ShipPickSubpage } from "./";

export default function CheckoutPage() {
    const {user, setUser, ready} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);

    const [info, setInfo] = useState(false);
    const [shipping, setShipping] = useState(false);
    const [payment, setPayment] = useState(false);

    const [shipmethod, setShipmethod] = useState("Standard Shipping");
    const [paymethod, setPaymethod] = useState("Moblie Banking");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    
    const getCartData = async (user) => {
        if (user) {
            try {
                const {data} = await axios.get("/cartWait");
                setCartData(data);

                let sum = 0;
                let amount = 0;
                data.map((cart) => (
                    sum += (cart.price * cart.amount),
                    amount += cart.amount
                ));
                setTotal(sum);
                setAmount(amount);

            } catch (e) {console.log("Error Get Cart Data");}
        }
    }

    const editInfo = () => {
        setInfo(false);
        setShipping(false);
    }
    const editShip = () => {
        setShipping(false);
    }

    const receiveInfo = (e) => {
        e.preventDefault();
        setInfo(true);
    }

    const receiveShip = (e) => {
        e.preventDefault();
        setShipping(true);
    }
    const receivePay = (e) => {
        e.preventDefault();
        checkout();
    }

    const checkout = async () => {
        let totals = shipmethod == "Standard Shipping" ? total : total + 200
        let date = moment().format("DD-MM-YYYY hh:mm");

        try {
            const {data} = await axios.post("/order", {
                firstname, lastname, phone,
                address1, address2,
                province, postcode, 
                shipmethod, paymethod,
                country, total: totals, amount, date
            });
            if (data != null) {
                cartData.map(cart => (
                    updateCart(cart._id, data._id)
                ))
            }
            setRedirect(true);
        } catch (e) {console.log("checkout error!!")}
    }
    
    const updateCart = async (cartId, orderId) => {
        const data = await axios.put(`/cart/checkout/${cartId}`, {orderId: orderId});
    }

    useEffect(() => {
        getCartData(user);
        setTotal(0);
    }, [user]);

    if (redirect) return <Navigate to={"/account/order"}/>

    return (
        <div className="relative checkout w-full h-[90vh] flex justify-center font-kanit">
            <div className="container">
                
                <div className="w-3/5 px-2 h-full max-lg:w-full ">
                    <div className="flex flex-row gap-3 text-lg max-md:text-sm font-normal">
                        <div className="cursor-pointer" onClick={editInfo}>
                            <i className="uil uil-clipboard mr-1"></i>
                            Information
                        </div>
                        {info && (
                            <div className="cursor-pointer" onClick={editShip}>
                                <i className="uil uil-angle-right mr-1"></i>
                                <i className="uil uil-truck mr-1"></i>
                                Shipping
                            </div>
                        )}
                        {shipping && (
                            <div className="cursor-pointer">
                                <i className="uil uil-angle-right mr-1"></i>
                                <i className="uil uil-university mr-1"></i>
                                Payment
                            </div>
                        )}
                    </div>
                    { !info && (
                        <InfoSubpage 
                            receiveInfo = {receiveInfo}
                            firstname={firstname} setFirstname={setFirstname}
                            lastname={lastname} setLastname={setLastname}
                            phone={phone} setPhone={setPhone}
                            address1={address1} setAddress1={setAddress1}
                            address2={address2} setAddress2={setAddress2}
                            postcode={postcode} setPostcode={setPostcode}
                            province={province} setProvince={setProvince}
                            country={country} setCountry={setCountry}
                         />
                    )}
                    { info && !shipping && (
                        <div className="mt-5 w-full">
                            <ShipInfoSubpage 
                                information={[
                                    {"title": "Name", "detail": `${firstname} ${lastname}`, "edit": editInfo},
                                    {"title": "Phone Number", "detail": phone, "edit": editInfo},
                                    {"title": "Ship to", "detail": `${address1} ${address2}, ${province}, ${postcode} ${country}`, "edit": editInfo}
                                ]}
                            />
                            <ShipPickSubpage 
                                receiveData={receiveShip}
                                method={shipmethod}
                                setMethod={setShipmethod}
                                title="Shipping Method"
                                name="ship-medthod"
                                btnTitle="CONTINUE TO PAYMENT"
                                information={[
                                    {
                                        "id": "ship-standard", "value": "Standard Shipping",
                                        "title": "Standard Shipping",
                                        "subTitle": "Estimated delivery in 4-7 working days.",
                                        "label": "Free"
                                    },
                                    {
                                        "id": "ship-dhl", "value": "DHL Express Worldwide",
                                        "title": "DHL Express Worldwide",
                                        "subTitle": "Estimated delivery in 1-2 working days.",
                                        "label": "THB 200"
                                    } 
                                ]}
                            />
                        </div>
                    )}

                    { info && shipping && (
                        <div className="mt-5 w-full overflow-hidden">
                            <ShipInfoSubpage 
                                information={[
                                    {"title": "Name", "detail": `${firstname} ${lastname}`, "edit": editInfo},
                                    {"title": "Phone Number", "detail": phone, "edit": editInfo},
                                    {"title": "Ship to", "detail": `${address1} ${address2}, ${province}, ${postcode} ${country}`, "edit": editInfo},
                                    {"title": "Delivery Service", "detail": shipmethod, "edit": editShip}
                                ]}
                            />
                            <ShipPickSubpage 
                                receiveData={receivePay}
                                method={paymethod}
                                setMethod={setPaymethod}
                                title="Payment Method"
                                name="payment-medthod"
                                btnTitle="PAY NOW"
                                information={[
                                    {
                                        "id": "pay-moblie", "value": "Moblie Banking",
                                        "title": "Moblie Banking",
                                        "subTitle": "", "label": ""
                                    },
                                    {
                                        "id": "pay-credit", "value": "Credit Card",
                                        "title": "Credit Card",
                                        "subTitle": "", "label": ""
                                    },
                                    {
                                        "id": "pay-promptpay", "value": "PromptPay",
                                        "title": "PromptPay",
                                        "subTitle": "", "label": ""
                                    },
                                    {
                                        "id": "pay-truemoney", "value": "TrueMoney",
                                        "title": "TrueMoney",
                                        "subTitle": "", "label": ""
                                    },
                                ]}
                            />
                        </div>
                    )}

                </div>
                {info && shipping && (
                    <div className="mt-8 content-none"></div>
                )}

                <div className="summary">
                    <div className="h-3/4">
                        <div className="h-full my-5 mx-7 flex flex-col overflow-y-scroll overflow-x-hidden">
                            {cartData.map(cart => (
                                <div className="border-b grid grid-cols-4" key={`${cart._id}`}>
                                    <div className="py-2">
                                        <Image className="h-full aspect-square object-cover" src={cart.photo}/>
                                    </div>
                                    <div className="h-full ml-2 py-2 col-span-2 font-kanit tracking-tighter leading-tight drop-shadow-sm overflow-hidden">
                                        <h1>{cart.title}</h1>
                                        <h2 className="font-light text-neutral-400 leading-tight max-md:text-sm">size: {cart.gender} {cart.size.toUpperCase()}</h2>
                                        <h2 className="font-light text-neutral-400 leading-none max-md:text-sm">color: {cart.color}</h2>
                                    </div>
                                    <div className="flex flex-col justify-between items-end mt-1 mr-2 max-md:my-2">
                                        <h1 className="text-neutral-400 max-md:text-sm">{cart.store.toUpperCase()}</h1>
                                        <div className="text-end">
                                            <p className="text-neutral-400 max-md:text-sm">x{cart.amount}</p>
                                            <h1 className="font-medium text-xl max-2xl:text-lg max-xl:text-base max-md:text-sm">THB {cart.price}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="h-1/4 py-4 mx-7 border-t max-md:border-none">
                        <div className="flex flex-col h-full gap-1 justify-end py-5">
                            <div className="total font-normal">
                                <h1>Subtotal</h1>
                                <div>THB {total}</div>
                            </div>
                            <div className="total font-normal">
                                <h1>Shipping Method</h1>
                                <div className="total font-normal gap-2">
                                    { shipmethod == "Standard Shipping" ? (<>
                                        <span className="ship-method border-emerald-500 text-emerald-500 text-center">Free Shipping</span>
                                        <h1>THB 0</h1>
                                    </>): (<>
                                        <span className="ship-method border-rose-500 text-rose-500">DHL Delivery</span>
                                        <h1>THB 200</h1> 
                                    </>)}
                                </div>
                            </div>
                            <div className="total font-medium">
                                <h1>Total</h1>
                                { shipmethod == "Standard Shipping" ? <div>THB {total}</div> : <div>THB {total + 200}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}