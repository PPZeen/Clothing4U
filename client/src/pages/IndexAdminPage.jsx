/* Not Developed Yet */

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

import axios from "axios";

export default function IndexAdminPage() {

    const {user, setUser, ready} = useContext(UserContext);
    
    if (!user || user.type !== "admin") return <Navigate to={"/"} />

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [category, setCategory] = useState("");
    const [gender, setGender] = useState("");
    const [store, setStore] = useState("");
    const [keywords, setKeywords] = useState("");
    const [price, setPrice] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [stockL, setStockL] = useState("");

    const addPhotoByLink = (e) => {
        e.preventDefault();
        try {
            setPhotos(prev => {
                return [...prev, photoLink];
            });
        } catch (err) {alert("add photo failed.")}
        
        setPhotoLink("");
    }

    const deletePhoto = (value) => {
        console.log(value);
        setPhotos(photos.filter(link => link != value))
    }

    const submitProductInfo = async (e) => {
        e.preventDefault();

        let stock = JSON.parse(stockL);
        let colors = Object.keys(stock)
        let sizes = Object.keys(stock[Object.keys(stock)[0]])

        try {
            const { data } = await axios.post("/upload-by-links", {links: photos})
            
            await axios.post("/product/create", {
                    title, detail, category,
                    gender, store, keywords, price,
                    sizes, colors, stock, photos: data
                });
            
            console.log("product created!!");    
            document.getElementById("productSubmit").reset();
            
            setTitle("");
            setDetail("");
            setCategory("");
            setGender("");
            setStore("");
            setKeywords("");
            setPrice(0);
            setStockL([]);
            setPhotos([]);

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="admin-add-product mt-1 bg-primary px-8">
            <h1 className="my-4 text-4xl font-bold text-center">Form Add Product</h1>
            <form className="flex flex-col gap-2" id="productSubmit">
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Title: </h1>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Detail: </h1>
                    <input type="text" value={detail} onChange={e => setDetail(e.target.value)} />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Category: </h1>
                    <input type="checkbox" onClick={() => setCategory("shirt")} name="shirt" value="shirt"/>
                    <label>shirt</label>
                    <input type="checkbox" onClick={() => setCategory("pants")} name="pants" value="pants"/>
                    <label>pants</label>
                    <input type="checkbox" onClick={() => setCategory("skirt")} name="skirt" value="skirt"/>
                    <label>skirt</label>
                    <input type="checkbox" onClick={() => setCategory("dress")} name="dress" value="dress"/>
                    <label>dress</label>
                    <input type="checkbox" onClick={() => setCategory("shoe")} name="shoe" value="shoe"/>
                    <label>shoe</label>
                    <input type="checkbox" onClick={() => setCategory("underwear")} name="underwear" value="underwear"/>
                    <label>underwear</label>
                    <input type="checkbox" onClick={() => setCategory("accessories")} name="accessories" value="accessories"/>
                    <label>accessories</label>
                    <input type="checkbox" onClick={() => setCategory("other")} name="other" value="other"/>
                    <label>other</label>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Gender: </h1>
                    <input type="checkbox" onClick={() => setGender("male")} name="male" value="male"/>
                    <label>male</label>
                    <input type="checkbox" onClick={() => setGender("female")} name="female" value="female"/>
                    <label>female</label>
                    <input type="checkbox" onClick={() => setGender("unisex")} name="unisex" value="unisex"/>
                    <label>unisex</label>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Store: </h1>
                    <input type="text" value={store} onChange={e => setStore(e.target.value)} />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Keywords: </h1>
                    <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Price: </h1>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <h1 className="text-xl font-medium">Stock: </h1>
                    <input type="text" value={stockL} onChange={e => setStockL(e.target.value)}/>
                </div>
                <div className="">
                    <h1 className="text-xl font-medium">Photo</h1>
                    <div className="flex gap-2">
                        <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link ...jpg" />
                        <button onClick={addPhotoByLink} className="w-36 py-2 px-3 bg-black text-white rounded-[16px]">Add photo</button>
                    </div>
                    <div className="mt-2 mb-2 grid grid-cols-10 gap-2">
                        {photos.length > 0 && photos.map(link => (
                            <div className="relative h-32 flex cursor-pointer hover:opacity-40" key={link} onClick={() => deletePhoto(link)} >
                                <img className="object-cover rounded-2xl w-full" src={link} />
                            </div>
                        ))}
                        <button className="border bg-transparent rounded-2xl p-8  text-3xl text-gray-600" type="button">+</button>
                    </div>
                </div>
                <button className="primary" onClick={submitProductInfo}>save</button>
            </form>
        </div>
    );
}