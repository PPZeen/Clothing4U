import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import axios from "axios";

import { ReviewCard } from "../../components";
import { MyReviewCard } from "./";

export default function ReviewSubpage () {
    const [reviews, setReviews] = useState([]);
    const [ready, setReady] = useState(false);

    const navigate = useNavigate();

    const getReviews = async () => {
        try {
            const { data } = await axios.get("/review/user");
            setReviews(data.reverse());
            setReady(true);
        } catch (e) { console.log(e); }
    }

    const search = (idp) => { 
        navigate({
            pathname: "/product",
            search: `?${createSearchParams({ProductId: idp})}`,
        });
        window.location.reload(false);
    }

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <div>
            {ready ? (
                <div className="orders font-kanit flex flex-col items-center mb-8">
                    {reviews.length == 0 && (
                        <div className="w-full h-[70vh] flex flex-col justify-center items-center">
                            <i className="uil uil-silent-squint text-5xl"></i>
                            <h1 className="text-2xl">You have no reviews!</h1>
                            <a href="/account/order">GO TO REVIEWS</a>
                        </div>
                    )}
                    <div className="border-t w-4/5 max-md:w-[90%]">
                        {reviews.map(review => (
                            <div className="cursor-pointer" key={review._id} onClick={() => search(review.productId) }>
                                <MyReviewCard
                                    cartId={review.cartId}
                                    owner={review.owner}
                                    rate={review.rate}
                                    textReview={review.textReview}
                                    date={review.date}
                                />
                            </div>
                        ))}
                    </div>
                </div> 
            ) : (
                <div className="w-full text-center mt-24 text-2xl font-medium">
                    Loading...
                </div>
            )}
        </div> 
    );
}