import { useEffect, useState } from "react";

import axios from "axios";

import { Star, ProductCard  } from "./";

export default function ReviewCard ({cartId, owner, rate, textReview, date}) {
    const [cart, setCart] = useState({});
    const [ready, setReady] = useState(false);

    const getCartData = async () => {
        try {
            const { data } = await axios.get(`/cart/${cartId}`);
            if (data != null) {
                setCart(data);
            }
            setReady(true);
        } catch (e) {
            console.log("get data error.")
        }
    }

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <>
        {ready && (
            <div className="flex gap-4 py-3 border-b border-neutral-400">
                <i className="uil uil-user-circle text-4xl"></i>
                <div className="flex flex-col gap-2 font-kanit">
                    <h1 className="text-xl font-semibold">{owner}</h1>
                    <Star rate={rate} />
                    <h2 className="font-medium text-neutral-400">Variation: {cart.color}, {cart.size}</h2>
                    <h1 className="text-xl break-words ...">{textReview}</h1>
                    <h2 className="font-medium text-neutral-400">{date}</h2>
                </div>
            </div>
        )}
        </>
    );
} 