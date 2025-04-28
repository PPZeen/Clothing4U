import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import { createSearchParams, redirect, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import axios from 'axios';

import { h1, h2, h3, h4, h5, h6, h7, h8 } from "../assets/images"


export default function IndexPage() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    
    const navigate = useNavigate();

    const search = (key) => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({keyword: key})}`
        });
    }

    return (

        <div className="home mt-1 mx-4 pb-5 overflow-x-hidden">
            <Swiper
                className="relative h-[42vw] aspect-[7/3] bg-primary flex justify-center"
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                keyboard={true}
                pagination={true}
                loop={true}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                slidesPerView="auto"
            >
                <SwiperSlide className="relative cursor-pointer" style={{ width: '97vw' }} onClick={() => search("kaws")}>
                    <img className="slider-img" src={h1} />
                    <div className="slider-info">
                        <h1>KAWS ⨯ UT</h1>
                        <h3>คอลเลคชันสุดเอ็กซ์คูลซีฟจาก KAWS ที่ Cloth4U</h3>
                        <button className="home-info-1" onClick={() => search("kaws")}>เพิ่มเติม</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative cursor-pointer" style={{ width: '97vw' }} onClick={() => search("roger")}>
                    <img className="slider-img" src={h2} />
                    <div className="slider-info">
                        <h1>Roger Federer Collection</h1>
                        <h3>Modern Classics, <br />คอลเลคชันประจำฤดูหนาว2023</h3>
                        <button className="home-info-1" onClick={() => search("roger")}>เพิ่มเติม</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative cursor-pointer" style={{ width: '97vw' }} onClick={() => search("smart")}>
                    <img className="slider-img" src={h3} />
                    <div className="slider-info">
                        <h1>Smart Ankle Pants</h1>
                        <h3>สวมใส่สบายในสไตล์เรียบหรู <br />ใส่ได้ทุกโอกาส</h3>
                        <button className="home-info-1" onClick={() => search("smart")}>เพิ่มเติม</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="relative cursor-pointer" style={{ width: '97vw' }} onClick={() => {search("heattech")}}>
                    <img className="slider-img" src={h4} />
                    <div className="slider-info">
                        <h1>Heattech Collection</h1>
                        <h3>เปี่ยมด้วยคุณสมบัติดูดซับและเก็บความร้อน</h3>
                        <button className="home-info-1" onClick={() => {search("heattech")}}>เพิ่มเติม</button>
                    </div>
                </SwiperSlide>

                <div className="slider-btn left-0">
                    <button ref={prevRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="aspect-square w-16 max-md:w-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
                <div className="slider-btn right-4">
                    <button ref={nextRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="aspect-square w-16 max-md:w-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </Swiper>
            <div className="mt-20 max-xl:mt-15 max-md:mt-10 max-sm:mt-6 mb-6 max-md:mb-2 w-full flex flex-col justify-center items-center text-center">
                <h1 className="pb-4 max-md:pb-2 w-[70%] max-md:w-[90%] text-5xl max-xl:text-3xl max-md:text-xl font-bold"> Anime Collaboration Collection </h1>
                <h2 className="pb-4 max-md:pb-2 text-xl max-xl:text-lg max-md:text-base max-sm:text-xs font-kanit">พบกับการดีไซน์การตัวละครที่คุณรัก</h2>
            </div>
            <div className="w-full flex justify-center h-[33vw] aspect-[8/3] overflow-hidden">
                <img className="object-cover h-full" src={h5}/>
            </div>
            <div className="text-center mt-8 max-md:mt-4">
                <h1 className="text-3xl max-xl:text-2xl max-md:text-xl font-semibold font-kanit">เป็นเจ้าของก่อนใคร ซื้อก่อนเท่ก่อน</h1>
                <h1 className="text-lg max-md:text-base max-sm:text-xs font-normal">jujutsu kaisen collection</h1>
                <button className="home-info-1" onClick={() => search("jjk")}>ช็อปเลย</button>
            </div>
            
            <div className="mt-5 max-md:mt-1">
                <h1 className="font-kanit py-5 max-md:py-2 text-3xl max-md:text-xl max-sm:text-lg">สินค้าพื้นฐาน</h1>
                <div className="w-full h-[33vw] flex justify-between">
                    <div className="relative h-full w-[32.5%] black">
                        <img className="object-cover h-full" src={h6}/>
                        <div className="home-info-2">
                            <button onClick={() => search("kid")}>สินค้าเด็ก</button>
                        </div>
                    </div>
                    <div className="relative h-full w-[32.5%] black">
                        <img className="object-cover h-full" src={h7}/>
                        <div className="home-info-2">
                            <button onClick={() => search("male")}>สินค้าผู้ชาย</button>
                        </div>
                    </div>
                    <div className="relative h-full w-[32.5%] black">
                        <img className="object-cover h-full" src={h8}/>
                        <div className="home-info-2">
                            <button onClick={() => search("female")}>สินค้าผู้หญิง</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
