import React, { useContext, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useRef } from 'react';

import axios from "axios";

import { CartModal, Star, ReviewCard, Image } from "../../components/";

export default function ProductPage () {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const {user, setUser, ready} = useContext(UserContext);
    const [params, setParams] = useSearchParams();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [products, setProducts] = useState({});
    const [photos, setPhotos] = useState([]);
    const [stock, setStock] = useState({});
    const [color, setColor] = useState("");
    const [dsize, setDsize] = useState("");
    const [amount, setAmount] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const [reviews, setReviews] = useState({});
    const [rate, setRate] = useState(0);

    const id = params.get("ProductId");

    const getData = async () => {
        try {
            const {data} = await axios.get(`/search/${id}`);
            if (data == null) {
                setRedirect(true);
            } else {
                setProducts(data);
                setPhotos(data.photos);
                setStock(data.stock);
                
                setColor(data.colors[0]);
                setDsize(data.sizes[0]);
                setAmount(Object.values(data.stock)[0][data.sizes[0]]);
            }
            
        } catch (e) {console.log(e);}
    }

    const getReview = async () => {
        try {
            const {data} = await axios.get(`/review/product/${id}`);
            if (data == null) {
                console.log("No reviews.")
            } else {
                setReviews(data);

                let sum = 0;
                data.map(review => sum += review.rate)
                setRate(sum / data.length);
            }
            
        } catch (e) {console.log(e);}
    }

    useEffect(() => {
        getData();
        getReview();
    }, []);

    if (redirect) return <Navigate to={"/"}/>

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/cart", {
                productId: id,
                title: products.title,
                store: products.store,
                photo: products.photos[0],
                gender: products.gender,
                price: products.price,
                color: e.target.color.value,
                size: e.target.size.value,
                amount: e.target.amount.value,
            });
        } catch (e) {console.log("add cart invalid!!!")}
        
        setShowCart(prev => !prev)
    }

    return (
        <div className="w-full h-screen relative">
            <div className="flex justify-center">
                <div className="w-4/5">
                    <button onClick={() => history.back()} className="ml-1 mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                    </button>
                    <div className="product-detail flex flex-row mb-8 mt-2">
                        <div className="h-3/4 w-10/16">
                            <div className="flex justify-center gap-16">
                                <Swiper
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    onSwiper={setThumbsSwiper}
                                    direction={'vertical'}
                                    slidesPerView={6.8}
                                    spaceBetween={10}
                                    freeMode={true}
                                    autoplay={{
                                        delay: 1000,
                                        disableOnInteraction: false,
                                    }}
                                    className="images-slide w-[5.2vw] p-1"
                                >
                                    {photos.map((photo, i) => (
                                        <SwiperSlide className="px-1 w-full aspect-square overflow-hidden flex justify-center items-center cursor-pointer" key={`${i}${i}i${photo}`}>
                                            <Image className="object-cover" src={photo} alt="img-pr"/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    onInit={(swiper) => {
                                        swiper.params.navigation.prevEl = prevRef.current;
                                        swiper.params.navigation.nextEl = nextRef.current;
                                        swiper.navigation.init();
                                        swiper.navigation.update();
                                    }}
                                    loop={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                                    className="relative img w-[34vw] aspect-[8/9]"
                                >
                                    {photos.map((photo, i) => (
                                        <SwiperSlide className="w-full" key={`${photo}${i*i}${i}`}>
                                            <div className="h-full ">
                                                <Image className="object-cover" src={photo} alt="img-pr"/>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div className="slider-btn left-0 items-center">
                                        <button className="product-slide-btn" ref={prevRef}>
                                            <i className="uil uil-angle-left"></i>
                                        </button>
                                    </div>
                                    <div className="slider-btn right-0 items-center">
                                        <button className="product-slide-btn" ref={nextRef}>
                                            <i className="uil uil-angle-right"></i>
                                        </button>
                                    </div>
                                </Swiper>
                            </div>
                            {rate > 0 && (<>
                                <div className="mt-8 py-3 border-y border-neutral-400">
                                    <div className="flex items-center gap-4">
                                        <h1 className="font-medium text-xl">Review</h1>
                                        <Star rate={rate} kId={`${id}-1`} />
                                        <p>({rate})</p>
                                    </div>
                                </div>
                                <div>
                                    {reviews.map(review => (
                                        <ReviewCard
                                            key={`${review._id$}-review`}
                                            cartId={review.cartId}
                                            owner={review.owner}
                                            rate={review.rate}
                                            textReview={review.textReview}
                                            date={review.date}
                                        />
                                    ))}
                                </div>
                            </>)}
                        </div>
                        <div className="ml-28 w-6/16 font-kanit">
                            <h1 className="title font-medium text-5xl">{products.title}</h1>
                            <div className="flex justify-between items-center">
                                <h2 className="mt-3 title font-semibold text-4xl"> THB {products.price}</h2>
                                {rate > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Star rate={rate} kId={`${id}-2`} />
                                        <p>({rate})</p>
                                    </div>
                                )}
                            </div>
                            <h4 className="mt-16 font-normal text-xl">{products.detail}</h4>
                            <form className="my-4 py-4 border-y border-neutral-400" onSubmit={addItem}>
                                <h1 className="title choose">color:&ensp;{color.toUpperCase()}</h1>
                                <div className="my-2 flex flex-rol gap-3" >
                                    {(Object.keys(stock)).map((c, i) => (
                                        <input type="radio" name="color" value={c}
                                            key={`${stock[c]}${i*i}`}
                                            className={`color ${c}`}
                                            defaultChecked={c === color}
                                            onClick={(e) => {setColor(e.target.value)}}
                                        />
                                    ))}
                                </div>
                                <h1 className="title choose">size:&ensp;{products.gender} {dsize.toUpperCase()} </h1>
                                <div className="my-2 flex flex-rol gap-3">
                                    {color != "" && Object.keys(stock[color]).map((size, i) => (
                                        <div key={`${stock[color][size]}${i*i}${size}`}>
                                        {stock[color][size] > 0 ? (
                                            <>
                                            {size === dsize ? (
                                                <input type="radio" name="size" value={size} className="size" before={size.toUpperCase()} onClick={(e) => {setDsize(e.target.value); setAmount(stock[color][size])}} defaultChecked={true} required></input>
                                        ):(
                                            <input type="radio" name="size" value={size} className="size" before={size.toUpperCase()} onClick={(e) => {setDsize(e.target.value); setAmount(stock[color][size])}} required></input>
                                        )} </> ): null}

                                        {stock[color][size] == 0 ? (
                                            <input type="radio" name="size" value={size} className="size" before={size.toUpperCase()} onClick={(e) => {setDsize(e.target.value); setAmount(stock[color][size])}} disabled={true} required></input>
                                        ): null}
                                        </div>
                                    ))}
                                </div>
                                <h1 className="title choose mt-3">amount</h1>
                                <select name="amount">
                                    {amount < 5 ? (
                                        <>{[...Array(amount).keys()].map((i) => (
                                            <option value={i+1} key={i*i*i}>{i+1}</option>
                                        ))}</>
                                    ) : (
                                        <>{[...Array(5).keys()].map((i) => (
                                            <option value={i+1} key={i*i*i}>{i+1}</option>
                                        ))}</>
                                    )}
                                </select>
                                {user ? (
                                    <button type="submit" className="add bg-stone-900 text-white">Add to Cart</button>
                                ) : (
                                    <div className="add bg-neutral-100" onClick={() => {setShowCart(prev => !prev)}}>Add to Cart</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-50 absolute -top-[4.5rem] left-0 w-full">
                <CartModal showCart={showCart} setShowCart={setShowCart} />
            </div>
        </div>
    );
}