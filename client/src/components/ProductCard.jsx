import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import Image from "./Image";

export default function ProductCard ({cart, openReview, review}) {
    
    const navigate = useNavigate();

    const search = (idp) => { 
        navigate({
            pathname: "/product",
            search: `?${createSearchParams({ProductId: idp})}`,
        });
        window.location.reload(false);
    }
    return (
        <div className="container">
            <div className="aspect-square h-full overflow-hidden flex justify-center items-center">
                <Image className="object-cover h-full" src={cart.photo}/>
            </div>
            <div className="detail pl-4">
                <div>
                    <h1>{cart.title}</h1>
                    <h2>size: {cart.gender} {cart.size.toUpperCase()}</h2>
                    <h2>color: {cart.color}</h2>
                </div>
                {!review && (<>
                    {!cart.review ? (
                        <div>
                            <button className="review" onClick={() => openReview(cart)}>Review</button>
                        </div>
                    ): (
                        <div>
                            <button className="buy" onClick={() => search(cart.productId)}>Buy Again</button>
                        </div>
                    )}
                </>)}
            </div>
            <div className="flex flex-col justify-between items-end">
                <h1 className="text-neutral-500">{cart.store.toUpperCase()}</h1>
                <div className="text-end">
                    <h2>x {cart.amount}</h2>
                    <h1>THB {cart.price}</h1>
                </div>
            </div>
        </div>
    );
}