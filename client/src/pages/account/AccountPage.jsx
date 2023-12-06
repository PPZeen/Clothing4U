import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

import { ProfileSubpage, OrderSubpage, ReviewSubpage } from "./";

export default function AccountPage() {
    const {user, setUser, ready} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    
    let {subpage} = useParams();
    if (subpage === undefined) subpage = "profile";

    if (!ready) {
        return (
            <div className="w-full text-center mt-24 text-2xl font-medium">
                Loading...
            </div>
        );
    }
    if (ready && !user && !redirect) return <Navigate to={"/login"} />

    function linkCalasses (type=null) {
        let classes = "py-3 px-8 border border-gray-400 text-black font-medium rounded-full"
        if (type === subpage) {
            classes = "btn-account"
        }
        return classes;
    }

    const logout = async () => {
        try {
            await axios.post("/logout");
            setRedirect(true);
            setUser(null);
        } catch (e) {
            console.log(e);
        }
    }
    if (redirect) return <Navigate to={"/"} />

    return (
        <div className="account relative">
            <nav className="w-full mt-5 mb-5 flex justify-center gap-8">
                <Link className={linkCalasses("profile")} to={"/account"}>
                    <i className="uil uil-user pr-2"></i>
                    My Profile
                </Link>
                <Link className={linkCalasses("order")} to={"/account/order"}>
                    <i className="uil uil-clipboard-alt pr-2"></i>
                    My Purchases
                </Link>
                <Link className={linkCalasses("review")} to={"/account/review"}>
                    <i className="uil uil-favorite pr-2"></i>
                    My Review
                </Link>
            </nav>
            <div className="w-full">
                {subpage == "profile" && (
                    <ProfileSubpage name={user.name} logout={logout} />
                )}
                {subpage == "order" && (
                    <OrderSubpage name={user.name} logout={logout} />
                )}
                {subpage == "review" && (
                    <ReviewSubpage name={user.name} logout={logout} />
                )}
            </div>
        </div>
    );
}