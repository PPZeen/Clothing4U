import { Image } from "../../components";

export default function CardProduct ({product, search}) {
    return (
        <button className="w-[32%] max-lg:w-[48%] max-sm:w-[98%] aspect-[9/14] flex flex-col justify-between"
            key={product._id}
            onClick={() => search(product._id)}
        >
            <div>
                <div className="aspect-square w-full overflow-hidden flex justify-center items-center">
                    <Image className="object-cover" src={product.photos[0]}/>
                </div>
                <div className="flex flex-row justify-between py-3 my-1">
                    <div className="flex flex-row gap-2">
                        {(product.colors).map((color, index) => (
                            <div className={`w-[18px] h-[18px] ${color}`} key={`${color}${index}`}>
                            </div>
                        ))}
                    </div>
                    <h3 className="font-bold text-l text-neutral-400 tracking-tighter">{`${product.sizes[0]}-${product.sizes[product.sizes.length-1]}`}</h3>
                </div>
                
                <div className="flex justify-between font-bold text-l text-neutral-400 tracking-tighter text-left">
                    <h3 className="my-1">{product.gender.toUpperCase()}</h3>                                                
                    <h3 className="my-1">{product.store.toUpperCase()}</h3>
                </div>
                <h1 className="mt-2 font-kanit font-medium text-neutral-800 text-2xl text-left">{product.title}</h1>
            </div>
            <h1 className="mb-2 mt-5 font-kanit font-bold text-3xl">THB {product.price}</h1>
        </button>
    );
}