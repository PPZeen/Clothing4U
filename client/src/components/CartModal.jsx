import React, { useContext, useEffect, useRef, useState } from "react";
import {useSpring, animated} from "react-spring";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import Image from "./Image";

export default function CartModal ({showCart, setShowCart}) {
    
    const cartRef = useRef();
    
    const {user} = useContext(UserContext);
    const [cartData, setCartData] = useState([]);
    const [read, setRead] = useState(false);
    const [ready, setReady] = useState(false);
    const [total, setTotal] = useState(0);

    const animation = useSpring({
        config: {
            duration: 400,
            delay: 800,
            friction: 30,
        },
        transform: showCart ? `translateX(0%)` : `translateX(150%)`,
    })

    const animationBG = useSpring({
        config: {
            duration: 300,
        },
        opacity: showCart ? 1 : 0,
    });


    const closeCart = (e) => {
        if(cartRef.current === e.target) {
            setRead(false);
            setShowCart(false);
        }
    }

    const getCartData = async (user) => {
        if (user) {
            try {
                const {data} = await axios.get("/cartWait");
                setCartData(data);
                
                let sum = 0;
                
                data.map((cart) => (
                    sum += (cart.price * cart.amount)
                ));
                setTotal(sum);

            } catch (e) {console.log("Error Get Cart Data");}
        }
    }

    const reload = () => {setReady(false); setRead(false);}

    const updateCart = async (id, amount) => {
        try {
            setReady(false);
            const {data} = await axios.put(`/cart/${id}`, {amount: amount});
            // console.log(data);
            setRead(false);
        } catch (e) {console.log("Error Update Cart");}
    }

    const removeCart = async (id) => {
        try {
            setReady(false);
            const {data} = await axios.delete(`/cart/${id}`);
            console.log(data);
            setRead(false);
        } catch (e) {console.log("Error Remove Cart");}
    }

    if (showCart && !read) {
        getCartData(user);
        setRead(true);
        setReady(true);
    }

    if (showCart) {
        const body = document.body;
        body.style.overflowY = "hidden";
    } else {
        const body = document.body;
        body.style.overflowY = "visible";
    }

    useEffect(() => {
        getCartData(user);
        setTotal(0);
    }, [user]);

    return (
        <div>
            {showCart ? (
                <animated.div style={animationBG} className="bg-black/80 backdrop-blur-sm w-full fixed h-screen flex justify-end overflow-x-hidden" ref={cartRef} onClick={closeCart}>
                    <animated.div style={animation} className="ease-out w-[30%] max-2xl:w-[35%] max-xl:w-[42%] max-lg:w-[54%] max-md:w-[70%] max-sm:w-[85%] bg-white overflow-hidden">
                    <div className="cart relative h-full py-10 px-5">
                        <button className="absolute top-10 left-4" ref={cartRef} onClick={() => setShowCart(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                        <h1 className="text-center text-3xl">
                            <i className="uil uil-shopping-cart text-3xl"></i>
                            &nbsp; MY CART
                        </h1>
                        <button className="absolute top-12 right-4" onClick={reload}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                        { user ? ( cartData.length > 0 ? (
                                <div className="h-4/5">                         
                                    <div className="my-5 border-y h-[76%] overflow-auto">
                                        {cartData.map(cart => (
                                            <div className="my-1 grid grid-cols-4 h-[29%] gap-1 border-b pb-2" key={cart._id}>
                                                <div className="py-2">
                                                    <Image className="h-full aspect-square object-cover" src={cart.photo}/>
                                                </div>
                                                <div className="h-full ml-2 py-2 col-span-2 flex flex-col justify-between font-kanit tracking-tighter leading-tight drop-shadow-sm overflow-hidden">
                                                    <div>
                                                        <h1>{cart.title}</h1>
                                                        <h2 className="font-light text-neutral-400 leading-tight">size: {cart.gender} {cart.size.toUpperCase()}</h2>
                                                        <h2 className="font-light text-neutral-400 leading-none">color: {cart.color}</h2>
                                                    </div>
                                                    <div className="bg-neutral-100 w-[45%] h-1/4 flex justify-between items-center rounded-full overflow-hidden">
                                                        {cart.amount == 1 ? (
                                                            <button className="w-1/3 h-full text-neutral-300" disabled>-</button>
                                                        ) : (
                                                            <button className="w-1/3 h-full" onClick={() => updateCart(cart._id, cart.amount-1)}>-</button>
                                                        )}
                                                            {cart.amount}
                                                        <button className="w-1/3 h-full" onClick={() => updateCart(cart._id, cart.amount+1)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="p-1 flex flex-col justify-between items-center">
                                                    <button className="bg-neutral-100 px-3 py-1 rounded-full text-red-600 text-sm font-medium" onClick={() => removeCart(cart._id)}>Remove</button>
                                                    <h1 className="font-bold text-xl max-md:text-lg max-sm:text-base tracking-tighter">THB {cart.price}</h1>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col h-full gap-1">
                                        <div className="total">
                                            <h1>Subtotal</h1>
                                            <div>THB {total}</div>
                                        </div>
                                        <div className="total">
                                            <h1>Shipping</h1>
                                            <div className="total gap-10">
                                                <span className="border border-emerald-500 text-emerald-500 rounded-full px-2 py-1 text-base max-sm:text-xs flex justify-center font-normal">Free Shipping</span>
                                                <h1>THB 0</h1>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <h1>Total</h1>
                                            <div>THB {total}</div>
                                        </div>
                                        <a href="/checkout" className="primBtn mt-7 bg-stone-900 text-white">CONTINUE TO CHECKOUT</a>
                                    </div>
                                </div>
                            ) : (
                                <div className="container-cart">
                                    <i className="uil uil-silent-squint text-5xl"></i>
                                    <h1 className="text-2xl">Your cart is empty</h1>
                                    <a href="/" className="primBtn mt-7 bg-neutral-100">GO TO SHOPPING</a>
                                </div>
                            )
                        ) : (
                            
                            <div className="container-cart">
                                <i className="uil uil-user-times text-5xl"></i>
                                <h1 className="text-2xl my-8 text-center">Please, Login or register before shopping </h1>
                                <a href="/login" className="primBtn bg-neutral-100 text-black">Login</a>
                                <a href="/register" className="primBtn bg-neutral-100 text-black">Register</a>
                            </div>
                            
                        )}
                        {!ready && ( 
                            <div className="absolute top-0 left-0 bg-neutral-300/40 backdrop-blur-[1px] w-full h-full">
                            </div>
                        )}
                    </div>
                    </animated.div>
                </animated.div>
            ) : null}
        </div>
    );
}