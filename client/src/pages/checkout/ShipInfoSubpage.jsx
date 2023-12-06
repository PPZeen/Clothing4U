export default function ShipInfoSubpage ({information}) {
    return (
        <div className="border-b border-neutral-300 flex flex-col justify-center">
            {information.map((info, i) => (
                <div className="ship-info" key={`${i}${info.detail}`}>
                    <h1 className="col-span-2 label">{info.title}</h1>
                    <h1 className="col-span-5 detial">{info.detail}</h1>
                    <h2 className="edit" onClick={info.edit}>Edit</h2>
                </div>
            ))}
        </div>
    );
}