import { useEffect, useState } from "react";

import axios from "axios";

import { ReviewModal, ProductCard } from "../../components";

export default function ProductsOrder ({orderId}) {
    const [ready, setReady] = useState(false);
    const [cartData, setCartData] = useState([]);

    const [photo, setPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [review, setReview] = useState("");
    const [store, setStore] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);

    const [show, setShow] = useState("show more");

    const [product, setProduct] = useState(null);
    const [cartReview, setCartReview] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const getCartsInOrder = async () => {
        try {
            const {data} = await axios.get(`/cart/order/${orderId}`);
            setPhoto(data[0].photo);
            setTitle(data[0].title);
            setGender(data[0].gender);
            setSize(data[0].size);
            setColor(data[0].color);
            setReview(data[0].review);
            setStore(data[0].store);
            setAmount(data[0].amount);
            setPrice(data[0].price);
            setProduct(data[0]);
            
            setCartData(data);
            setReady(true);

        } catch (e) {console.log("Error get carts in order")}
    }

    const showMore = () => {
        const container = document.getElementById(`products-detail-${orderId}`);

        if (container.style.display == "none" | container.style.display == "") {
            container.style.display = "block";
            setShow("hide");
        }
        else {
            container.style.display = "none";
            setShow("show more");
        }
    }

    const openReview = (pd) => {
        setCartReview(pd)
        setShowReview(prev => !prev)
    }

    useEffect(() => {
        getCartsInOrder();
    }, [])

    return (
        <div className="products-order border-y">
            {ready && (<>
                <ProductCard cart={product} openReview={openReview} review={false} />
                {cartData.length > 1 && (<>
                    <div id={`products-detail-${orderId}`} className="hidden">
                        {cartData.slice(1).map((cart) => (
                            <ProductCard key={cart._id} cart={cart} openReview={openReview} review={false} />
                        ))}
                    </div>
                    <div id="showmore" className="cursor-pointer text-center text-neutral-400" onClick={showMore}>
                        {show}
                    </div>
                </>)}
            </>)}
            {showReview && (
                <ReviewModal showReview={showReview} setShowReview={setShowReview} cart={cartReview} />
            )}
        </div>
    );
}