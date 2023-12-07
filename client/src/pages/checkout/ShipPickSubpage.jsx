export default function ShipPickSubpage ({receiveData, title, name, method, setMethod, information, btnTitle}) {

    return (
        <form className="my-5 w-full ship-method" onSubmit={receiveData}>
            <h1 className="text-3xl max-md:text-2xl max-sm:text-xl mt-7 mb-4">{title}</h1>
            <div className="border border-neutral-300 h-[40%] flex flex-col mb-2">
            {information.map((info, i) => (
                <div className="choose-container" key={`${i}${info.id}`}>
                    <input type="radio"
                        id={info.id}
                        name={name}
                        value={info.value}
                        onChange={() => setMethod(info.value)}
                        defaultChecked={method == info.value ? true : false}
                    />
                    <label className="radio-label" htmlFor={info.id}>
                        <div>
                            <h1 className="text-xl max-md:text-lg max-sm:text-base font-medium">{info.title}</h1>
                            <h2 className="detail max-sm:hidden">{info.subTitle}</h2>
                        </div>
                        <h1 className="text-xl max-md:text-lg font-medium">{info.label}</h1>
                    </label>
                </div>
            ))}
            </div>
            <div className="flex justify-end">
                <button>{btnTitle}</button>
            </div>
        </form>
    );
}