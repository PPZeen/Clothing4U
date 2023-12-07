import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";

import { UserContext } from '../context/UserContext';

import axios from 'axios';

import { CartModal } from './';

import Logo from "../assets/images/logo/Logo_Cloth4U.png";
import LogoSmall from "../assets/images/logo/Icon_Cloth4U.png";

export default function Header() {

    const [find, setFind] = useState(false);
    const {user} = useContext(UserContext);
    const [keyword, setKeyword] = useState("");
    const [showCart, setShowCart] = useState(false);
    // const [data, setData] = useState(false);
    const [items, setItems] = useState(false);

    const navigate = useNavigate();

    const getData = async () => {
        if (user != null) {
            try {
                const { data } = await axios.get("/cartWait");
                if (data !== null) {
                    // let sum = 0;
                    // data.map((cart) => sum += cart.amount);
                    if (data.length != 0) setItems(true);
                }
            }catch (e) {console.log("get data error");}
        }
    }

    const search = (e) => {
        e.preventDefault();

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({keyword: keyword})}`
        });
        window.location.reload(false);
    }

    const openCart = () => {
        setShowCart(prev => {
            getData();    
            return !prev
        })
    }

    useEffect(() => {
        if(user != null) {
            getData();
        }
    }, [user])

    return (
        <div className="sticky top-0 z-30">
            <header className="flex justify-between items-center p-2 px-24 max-lg:px-10 max-md:px-5 bg-primary">
                <a href="/">
                    <img className="h-12 max-md:hidden" src={Logo} alt="Logo"></img>
                    <img className="h-12 hidden max-md:block max-sm:h-8" src={LogoSmall} alt="Logo"></img>
                </a>
                <div className="flex flex-row gap-5 font-medium max-md:text-sm max-md:gap-3 max-md:pr-4">
                    <a href="/search?keyword=" className="max-sm:hidden">ALL</a>
                    <a href="/search?keyword=male" className="max-[350px]:hidden" >MEN</a>
                    <a href="/search?keyword=female" className="max-[430px]:hidden" >WOMEN</a>
                    <a href="/search?keyword=unisex" className="max-[300px]:hidden">UNISEX</a>
                    <a href="/search?keyword=kids" className="max-[300px]:hidden">KIDS</a>
                </div>
                <div className="flex flex-row gap-5 max-md:gap-2">
                    <button onClick={() => {find ? setFind(false) : setFind(true)}}>
                        <i className="uil uil-search text-3xl max-lg:text-2xl max-md:text-xl"></i>
                    </button>

                    <button className="relative" onClick={openCart}>
                        {items && (
                            <div className="absolute top-0 right-0 h-[10px] w-[10px] rounded-full bg-red-500 text-white text-center text-xs"></div>
                        )}
                        <i className="uil uil-shopping-cart text-3xl max-lg:text-2xl max-md:text-xl"></i>
                    </button>

                    <a href={user ? "/account" :"/login"} className="flex flex-row items-center gap-2 max-md:gap-0">
                        <i className="uil uil-user text-3xl max-lg:text-2xl max-md:text-xl"></i>
                        {!!user && (
                            <div className="ml-2 font-semibold text-xl max-lg:text-lg max-md:text-sm">{user.name}</div>
                        )}
                    </a>
                </div>
            </header>
    
            {/* -------- find by keyword ------------*/}
            { find === true ?
                <div className="p-5 mt-1 bg-primary">
                    <div className="flex flex-col py-3 items-center gap-4">
                        <form className="flex flex-row py-2 px-3 w-3/5 max-lg:w-3/4 max-md:py-1 gap-5 bg-white rounded-md shadow-md shodow-gray-600 border border-gray-400" onSubmit={search}>
                            <a href={`/search?keyword=${keyword}`} type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </a>
                            <input className="w-full focus:outline-none" type="text" placeholder="Search by keywords..." onChange={e => setKeyword(e.target.value)} required></input>
                        </form>
            
                        <div className="ex-keyword flex flex-wrap gap-3 justify-center w-1/2 max-md:w-[60%] max-sm:hidden">
                            <a href="/search?keyword=เสื้อยืด" >เสื้อยืด</a>
                            <a href="/search?keyword=เสื้อฮู้ด" >เสื้อฮู้ด</a>
                            <a href="/search?keyword=เสื้อโปโล" >เสื้อโปโล</a>
                            <a href="/search?keyword=เสื้อแขนยาว" >เสื้อแขนยาว</a>
                            <a href="/search?keyword=กระโปรง" >กระโปรง</a>
                            <a href="/search?keyword=บิกินี" >บิกินี</a>
                            <a href="/search?keyword=ชุดว่ายน้ำ" >ชุดว่ายน้ำ</a>
                            <a href="/search?keyword=กระเป๋า" >กระเป๋า</a>
                            <a href="/search?keyword=รองเท้า" >รองเท้า</a>
                            <a href="/search?keyword=สร้อย" >สร้อย</a>
                            <a href="/search?keyword=ต่างหู" >ต่างหู</a>
                            <a href="/search?keyword=เข็มขัด" >เข็มขัด</a>
                            <a href="/search?keyword=kaws" >kaws</a>
                        </div>
                    </div>
                </div> : <></>
            }
            {/* -------- End find by keyword ------------*/}
            <div className="z-50 absolute top-0 left-0 w-full">
                <CartModal showCart={showCart} setShowCart={setShowCart} />
            </div>
        </div>
    );
}