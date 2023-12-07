import { useContext, useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import axios from "axios";

import { CardProduct, FilterCheck, FliterColor, FilterSize, FilterList } from "./";

export default function SearchPage () {
    const {user, setUser} = useContext(UserContext);
    const [ready, setReady] = useState(false);

    const [params] = useSearchParams();
    const navigate = useNavigate();
    
    const [products, setProducts] = useState({});
    const [filProducts, setFilProducts] = useState({});

    const keyword = params.get("keyword");

    const [genderFilter, setGenderFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [sizeFilter, setSizeFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const [storeFilter, setStoreFilter] = useState([]);

    const [filter, setFilter] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const getData = async () => {
        try {
            const {data} = await axios.post("/search/keyword", {keyword});
            setProducts(data);
            setFilProducts(data);
            setReady(true);
        } catch (e) {console.log(e);}
    }

    const updateFilter = (newGender, newCategory, newPri, newSize, newColor, newStore) => {
        const newPrice = newPri.map((range) => {
            switch (range) {
                case "Under THB 499": return [0, 499]
                case "THB 500 - THB 999": return [500, 999]
                case "THB 1,000 - THB 1,999": return [1000, 1999]
                case "THB 2,000 - THB 3,499": return [2000, 3499]
                case "THB 3,500+": return [3500, 999999]
            }
        })

        const d = products.filter(({gender, category, price, store, sizes, colors}) => {
            if ((newGender.includes(gender) || !newGender.length) &&
                (newCategory.includes(category) || !newCategory.length) &&
                (newPrice.map(([min, max]) => {
                    if (price >= min && price <= max) return true
                    return false
                }).includes(true) || !newPrice.length) &&
                (sizes.map((size) => {
                    if (newSize.includes(size)) return true
                    return false
                }).includes(true) || !newSize.length) &&
                (colors.map((color) => {
                    if (newColor.includes(color)) return true
                    return false
                }).includes(true) || !newColor.length) &&
                (newStore.includes(store) || !newStore.length)

            ) return true
            return false
        });

        setFilter(() => {
            const newFilter = [...newGender, ...newCategory, ...newPri, ...newSize, ...newColor, ...newStore]
            if (newFilter.length < 4) {setShowFilter(false)}
            return newFilter
        });

        setFilProducts(d);
    }

    const updateGender = (gender) => {
        const newGender = genderFilter.includes(gender) ?
                          genderFilter.filter((e) => e !== gender) : [...genderFilter, gender]
        setGenderFilter(() => {
            updateFilter(newGender, categoryFilter, priceFilter, sizeFilter, colorFilter, storeFilter);
            return newGender;
        });
    }

    const updateCategory = (category) => {
        const newCategory = categoryFilter.includes(category) ?
                            categoryFilter.filter((e) => e !== category) : [...categoryFilter, category]
        setCategoryFilter(() => {
            updateFilter(genderFilter, newCategory, priceFilter, sizeFilter, colorFilter, storeFilter);
            return newCategory;
        });
    }

    const updatePrice = (price) => {
        const newPrice = priceFilter.includes(price) ?
                         priceFilter.filter((e) => e !== price) : [...priceFilter, price]
        setPriceFilter(() => {
            updateFilter(genderFilter, categoryFilter, newPrice, sizeFilter, colorFilter, storeFilter);
            return newPrice;
        });
    }

    const updateSize = (size) => {
        const newSize = sizeFilter.includes(size) ?
                         sizeFilter.filter((e) => e !== size) : [...sizeFilter, size]
        setSizeFilter(() => {
            updateFilter(genderFilter, categoryFilter, priceFilter, newSize, colorFilter, storeFilter);
            return newSize;
        });
    }

    const updateColor = (color) => {
        const newColor = colorFilter.includes(color) ?
                         colorFilter.filter((e) => e !== color) : [...colorFilter, color]
        setColorFilter(() => {
            updateFilter(genderFilter, categoryFilter, priceFilter, sizeFilter , newColor, storeFilter);
            return newColor;
        });
    }

    const updateStore = (store) => {
        const newStore = storeFilter.includes(store) ?
                         storeFilter.filter((e) => e !== store) : [...storeFilter, store]
        setStoreFilter(() => {
            updateFilter(genderFilter, categoryFilter, priceFilter, sizeFilter , colorFilter, newStore);
            return newStore;
        });
    }

    const clearFilter = () => {
        setGenderFilter([])
        setCategoryFilter([])
        setPriceFilter([])
        setSizeFilter([])
        setColorFilter([])
        setStoreFilter([])
        setFilter([])
        setShowFilter(false);
        setFilProducts(products);
    }

    useEffect(() => {
        getData();
    }, []);

    const search = (idp) => { 
        navigate({
            pathname: "/product",
            search: `?${createSearchParams({ProductId: idp})}`,
        });
        window.location.reload(false);
    }

    return (
        <div>
            <div className="search mt-1 flex justify-center">
                <div className="w-5/6 max-lg:w-[90%]">
                    <div className="pt-10 pb-5 mb-5 border-b border-neutral-400">
                        <div className="flex justify-between text-xl font-semibold text-neutral-600">
                            <h3 className="max-md:text-base max-sm:text-sm">SEARCH RESULTS FOR</h3>
                            <h3 className="text-lg max-md:text-base max-sm:text-sm font-medium text-neutral-400">{filProducts.length} items</h3>
                        </div>
                        <div className="flex justify-between mt-2">
                            <h1 className="text-3xl font-semibold"> {keyword}</h1>
                            <div className="flex items-center gap-2">
                                {filter.length < 4 ? (
                                    <div className="filter-box flex flex-wrap justify-end overflow-y-auto gap-2 w-[40vw] h-full">
                                        <FilterList filter={genderFilter} updateFilter={updateGender} />
                                        <FilterList filter={categoryFilter} updateFilter={updateCategory} />
                                        <FilterList filter={priceFilter} updateFilter={updatePrice} />
                                        <FilterList filter={sizeFilter} updateFilter={updateSize} />
                                        <FilterList filter={colorFilter} updateFilter={updateColor} />
                                        <FilterList filter={storeFilter} updateFilter={updateStore} />
                                    </div>
                                ): (
                                    <div className="relative">
                                        <div className="flex justify-end items-center cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
                                            <h2>{filter.length} Filter </h2>
                                            {showFilter ? (
                                                <i className="uil uil-angle-up text-xl"></i>
                                            ): (<i className="uil uil-angle-down text-xl"></i>)}
                                        </div>
                                        {showFilter && (
                                            <div className="absolute z-10 p-2 top-100 right-0 flex flex-wrap gap-2 white w-[40vw]">
                                                <FilterList filter={genderFilter} updateFilter={updateGender} />
                                                <FilterList filter={categoryFilter} updateFilter={updateCategory} />
                                                <FilterList filter={priceFilter} updateFilter={updatePrice} />
                                                <FilterList filter={sizeFilter} updateFilter={updateSize} />
                                                <FilterList filter={colorFilter} updateFilter={updateColor} />
                                                <FilterList filter={storeFilter} updateFilter={updateStore} />  
                                            </div>
                                        )}
                                    </div>
                                )}
                                {filter.length > 1 && (
                                    // <i className="uil uil-times-circle text-3xl cursor-pointer" onClick={clearFilter}></i>
                                    <h3 className="text-neutral-600 cursor-pointer pt-2 pb-2" onClick={clearFilter}>clear all</h3>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="filter relative w-1/4 max-lg:w-[30%] max-md:w-[40%] py-2 pb-10 h-fit">
                            <a href={`/search?keyword=`}>All Product</a>
                            <FilterCheck 
                                title="Gender"
                                updateFilter={updateGender}
                                filter={genderFilter}
                                items={["male", "female", "unisex", "kids"]}
                            />
                            <FilterCheck 
                                title="Category"
                                updateFilter={updateCategory}
                                filter={categoryFilter}
                                items={["shirt", "pants", "skirt", "dress", "underwear", "shoe", "accessories"]}
                            />
                            <FilterCheck 
                                title="Price"
                                updateFilter={updatePrice}
                                filter={priceFilter}
                                items={["Under THB 499", "THB 500 - THB 999", "THB 1,000 - THB 1,999", "THB 2,000 - THB 3,499", "THB 3,500+"]}
                            />
                            <FilterSize filter={sizeFilter} updateFilter={updateSize} />
                            <FliterColor filter={colorFilter} updateFilter={updateColor} />
                            <FilterCheck 
                                title="Recommended store"
                                updateFilter={updateStore}
                                filter={storeFilter}
                                items={["uniqlo", "nike", "adidas", "zara", "h&m", "pomelo"]}
                            />
                            {!ready && (
                                <div className="absolute top-0 left-0 h-full w-full bg-white/70">
                                </div>
                            )}
                        </div>

                        <div className="w-3/4 max-lg:w-[70%] max-md:w-[60%] py-2 relative">
                            {ready ? (
                                filProducts.length > 0 ? (
                                    <div className="w-full border-l border-neutral-400 pl-5 cart flex flex-wrap gap-3">
                                        {filProducts.map(product => (
                                            <CardProduct product={product} search={search} key={`${product._id}-card`}/>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-[70vh]">
                                        <i className="uil uil-annoyed text-6xl"></i>
                                        <div className="my-5 text-2xl">There are no results that match your search.</div>
                                    </div>
                                )
                            ) : (
                                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-[70vh] text-2xl text-neutral-600 font-medium">
                                    Loading...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}