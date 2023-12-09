import { useEffect, useState } from "react";

import axios from "axios";

import { Star, ProductCard } from "../../components";

export default function MyReviewCard ({cartId, owner, rate, textReview, date}) {
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
                <div className="flex flex-col gap-2 products-order overflow-hidden">
                    <h1 className="text-xl font-semibold">{owner}</h1>
                    <Star rate={rate} />
                    <div className="w-[90%]">
                        <h1 className="text-xl pb-1 break-words ...">{textReview}</h1>
                    </div>
                    <ProductCard cart={cart} review={true} search={true} />
                    <h2 className="pt-1 font-medium text-neutral-400">{date}</h2>
                </div>
            </div>
        )}
        </>
    );
} 