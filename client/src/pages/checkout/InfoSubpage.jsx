export default function InfoSubpage ({
        receiveInfo,
        firstname, setFirstname,
        lastname, setLastname,
        phone, setPhone,
        address1, setAddress1,
        address2, setAddress2,
        postcode, setPostcode,
        province, setProvince,
        country, setCountry
    }) {

    return (
        <form className="mt-5 flex flex-col gap-4" onSubmit={receiveInfo}>
            <h1 className="text-3xl">Shipping Address</h1>
            <p className="mt-4 text-neutral-400">Where should we send your order?</p>
            <div className="flex gap-4">
                <input type="text" placeholder="First Name*" value={firstname} onChange={e => setFirstname(e.target.value)} required/>
                <input type="text" placeholder="Last Name*" value={lastname} onChange={e => setLastname(e.target.value)} required/>
            </div>
            <input type="tel" placeholder="Phone Number*" value={phone} onChange={e => setPhone(e.target.value)} required/>
            <input type="text" placeholder="Address 1*" value={address1} onChange={e => setAddress1(e.target.value)} required/>
            <input type="text" placeholder="Address 2" value={address2} onChange={e => setAddress2(e.target.value)} />
            <div className="flex gap-4">
                <input type="text" placeholder="Province*" value={province} onChange={e => setProvince(e.target.value)} required/>
                <input type="text" placeholder="Postcode*" value={postcode} onChange={e => setPostcode(e.target.value)} required/>
                <input type="text" placeholder="Country*" value={country} onChange={e => setCountry(e.target.value)} required/>
            </div>
            <div className="flex justify-end">
                <button>CONTINUE TO SHIPPING</button>
            </div>
        </form>
    );
}