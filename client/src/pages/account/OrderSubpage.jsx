import { useEffect, useState } from "react";

import axios from "axios";

import { ProductsOrder } from "./";

export default function OrderSubpage () {
    const [orders, setOrders] = useState([]);
    const [ready, setReady] = useState(false);

    const getOrders = async () => {
        try {
            const {data} = await axios.get("/order");
            setOrders(data.reverse());
            setReady(true);
        } catch (e) { console.log(e); }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            {ready ? (
                <div className="orders font-kanit flex flex-col items-center mb-8">
                    {orders.length == 0 && (
                        <div className="w-full h-[70vh] flex flex-col justify-center items-center">
                            <i className="uil uil-silent-squint text-5xl"></i>
                            <h1 className="text-2xl">You have no  items!</h1>
                            <a href="/">GO TO SHOPPING</a>
                        </div>
                    )}
                    {orders.map(order => (
                        <div className="w-4/5 mt-5 px-2 max-md:px-1 max-md:w-[95%]" key={order._id}>
                            <div className="flex items-end gap-3">
                                <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl font-medium">Order</h1>
                                <h4 className="text-2xl max-lg:text-xl max-md:text-lg font-light text-neutral-600">#{order._id.slice(5,12)}</h4>
                            </div>
                            <div className="border border-neutral-300 mt-5 max-md:mt-2 px-5 pb-5">
                                <div className="mt-4 relative">
                                    <h2>
                                        <i className="uil uil-truck mr-2"></i>
                                        Shipping Information
                                    </h2>
                                    {order.shipmethod == "Standard Shipping" ? (<>
                                        <h3>{order.shipmethod}</h3>
                                        <h3>Estimated delivery in 4-7 working days.</h3>
                                    </>) : (<>
                                        <h3>{order.shipmethod}</h3>
                                        <h3>Estimated delivery in 1-2 working days.</h3>

                                    </>)}
                                    <h3 className="absolute top-1 right-0 text-neutral-600">{order.date}</h3>
                                </div>
                                <div className="mt-5">
                                    <h2>
                                        <i className="uil uil-credit-card mr-2"></i>
                                        Payment Method
                                    </h2>
                                    <h3 className="">{order.paymethod}</h3>
                                </div>
                                <div className="mt-5">
                                    <h2>
                                        <i className="uil uil-location-point mr-2"></i>
                                        Shipping Address
                                    </h2>
                                    <div>
                                        <h3>{order.firstname} {order.lastname}</h3>
                                        <h3>{order.phone}</h3>
                                        <h3>{order.address1} {order.address2}, {order.province}, {order.postcode} {order.country}</h3>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h2>
                                        <i className="uil uil-shopping-cart mr-2"></i>
                                        Product Details
                                    </h2>
                                    <ProductsOrder orderId={order._id} />

                                </div>
                                <div className="mt-5 flex flex-col gap-1">
                                    {order.amount == 1 ? (<>
                                        <h5>1 item</h5>
                                    </>) : (<>
                                        <h5>{order.amount} items</h5>
                                    </>)}
                                    <div className="total">
                                        <h1>Shipping Method</h1>
                                        <div className="total font-normal gap-4">
                                            { order.shipmethod == "Standard Shipping" ? (<>
                                                <span className="ship-method border-emerald-500 text-emerald-500">Free Shipping</span>
                                                <h1>THB 0</h1>
                                            </>): (<>
                                                <span className="ship-method border-rose-500 text-rose-500">DHL Delivery</span>
                                                <h1>THB 200</h1> 
                                            </>)}
                                        </div>
                                    </div>
                                    <div className="total">
                                        <h1>Total</h1>
                                        <h1>THB {order.total}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> 
            ) : (
                <div className="w-full text-center mt-24 text-2xl font-medium">
                    Loading...
                </div>
            )}
        </div> 
    );
}