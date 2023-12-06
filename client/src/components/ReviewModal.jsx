import { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "axios";
import moment from "moment";

import { ProductCard } from "./";

export default function ReviewModal ({showReview, setShowReview, cart}) {
    const cartRef = useRef();
    const {user} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    const [owner, setOwner] = useState("");
    const [rate, setRate] = useState(0);
    const [textReview, setTextReview] = useState("");
    const [rateText] = useState(["Rate...", "Telable", "Poor", "Fair", "Good", "Amazing"])

    const closeCart = (e) => {
        if(cartRef.current === e.target) {
            setShowReview(false);
        }
    }

    const rateCheck = (e) => {
        let l = parseInt(e.target.id.slice(-1)) + 1;
        setRate(l-1);

        let pId = e.target.id.slice(0, -1);
        let r;

        for(let i = 1; i < 6; i++) {
            r = document.getElementById(pId.concat(i.toString()));
            if (i < l) {r.className = "fa-solid fa-star cursor-pointer text-xl text-amber-500"}
            else {r.className = "fa-regular fa-star cursor-pointer text-xl text-amber-500"}

        }
    }

    const rateHover = (e) => {
        let l = parseInt(e.target.id.slice(-1)) + 1;
        let pId = e.target.id.slice(0, -1);
        let r;

        for(let i = 1; i < l; i++) {
            r = document.getElementById(pId.concat(i.toString()));
            r.className = "fa-solid fa-star cursor-pointer text-xl text-amber-500";
        }
    }

    const rateOut = (e) => {
        let l = parseInt(e.target.id.slice(-1)) + 1;
        let pId = e.target.id.slice(0, -1);
        let r;

        for(let i = rate + 1; i < l; i++) {
            r = document.getElementById(pId.concat(i.toString()));
            r.className = "fa-regular fa-star cursor-pointer text-xl text-amber-500"
        }
    }

    const submitReview = async () => {
        if(rate > 0) {
            let date = moment().format("DD-MM-YYYY hh:mm");
            try {
                const {data} = await axios.post("/review", {
                    cartId: cart._id, productId: cart.productId,
                    owner, rate, textReview, date
                });
                if (data != null) { 
                    const res = await axios.put(`/cart/review/${cart._id}`);
                }
                setRedirect(true);
            } catch (e) {console.log("checkout error!!")}
        }
    }

    useEffect(() => {
        setOwner(user.name);
    }, [user])

    if (redirect) return <Navigate to={"/account/review"}/>

    return (
        <div className="bg-black/60 backdrop-blur-sm fixed h-screen z-10 top-0 left-0 right-0 flex justify-center" ref={cartRef} onClick={closeCart}>
            <div className="h-full w-[50%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-[90%] py-24">
                <div className="relative h-full w-full white flex flex-col justify-between">
                    <div>
                        <button className="absolute top-0 right-0 px-2 py-2" ref={cartRef} onClick={() => setShowReview(prev => !prev)}>
                            <i className="uil uil-times text-4xl"></i>
                        </button>
                        <h3 className="text-center text-2xl py-3">Rate the product</h3>
                        <div className="px-3">
                            <ProductCard cart={cart} review={true} />
                        </div>
                        <div className="py-5 mx-3 flex justify-between items-center border-b">
                            <h3 className="text-2xl max-lg:text-xl max-md:text-lg font-medium">Product Quality*</h3>
                            <div className="flex flex-wrap justify-between w-[30%] max-2xl:w-[40%] max-xl:w-[50%] max-md:justify-end">
                                <div> 
                                    <i className="fa-regular fa-star cursor-pointer text-xl max-lg:text-lg text-amber-500" id={`${cart._id}-rate-1`} onMouseMove={rateHover} onMouseOut={rateOut} onClick={rateCheck}></i>
                                    <i className="fa-regular fa-star cursor-pointer text-xl max-lg:text-lg text-amber-500" id={`${cart._id}-rate-2`} onMouseMove={rateHover} onMouseOut={rateOut} onClick={rateCheck}></i>
                                    <i className="fa-regular fa-star cursor-pointer text-xl max-lg:text-lg text-amber-500" id={`${cart._id}-rate-3`} onMouseMove={rateHover} onMouseOut={rateOut} onClick={rateCheck}></i>
                                    <i className="fa-regular fa-star cursor-pointer text-xl max-lg:text-lg text-amber-500" id={`${cart._id}-rate-4`} onMouseMove={rateHover} onMouseOut={rateOut} onClick={rateCheck}></i>
                                    <i className="fa-regular fa-star cursor-pointer text-xl max-lg:text-lg text-amber-500" id={`${cart._id}-rate-5`} onMouseMove={rateHover} onMouseOut={rateOut} onClick={rateCheck}></i>
                                </div>
                                <h1 className="pl-6 text-amber-500">{rateText[rate]}</h1>
                            </div>
                        </div>
                        <div className="px-3 h-[40%]">
                            <textarea
                                className="w-full h-full px-3 py-2 outline-none bg-neutral-100"
                                placeholder="Share more thoughts on the product to help other buyers."
                                onChange={e => setTextReview(e.target.value)}
                            />
                        </div>
                        <div className="p-3">
                            <h1>Show username on your review</h1>
                            <h2>Username on review: {owner}</h2>
                        </div>
                    </div>
                    <div className="p-3">
                        {rate === 0 ? (
                            <button className="w-full py-2 rounded-full bg-neutral-200 text-lg text-white tracking-widest cursor-not-allowed " >SUBMIT</button>
                        ):(
                            <button className="w-full py-2 rounded-full bg-stone-900 text-lg text-white tracking-widest" onClick={submitReview}>SUBMIT</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}