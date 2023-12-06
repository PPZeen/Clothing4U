import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

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
            <div className="aspect-square w-full overflow-hidden flex justify-center items-center">
                <img className="object-cover" src={`http://localhost:4000/uploads/${cart.photo}`}/>
            </div>
            <div className="detail">
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