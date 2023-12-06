import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

import axios from "axios";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedidect] = useState(false);
    const [userType, setUserType] = useState("");

    const {setUser} = useContext(UserContext);


    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/login", {name, password});
            if (data != "not found") {
                setUser(data);
                setUserType(data.type);
                setRedidect(true);
            }else {
                alert("Login failed.");    
            }
        } catch (e) {
            alert("Login failed.");
        }
    }

    if(redirect) {
        if (userType == "partner") {
            return <Navigate to={"/IndexPartnerPage"} />
        }else if (userType == "admin") {
            return <Navigate to={"/IndexAdminPage"} />
        }
        return <Navigate to={"/"} />
    }

    return (
        <div className="auth-container">
            <h1 className="text-4xl font-bold p-4">Login</h1>
            <form className="flex flex-col w-96 gap-3 p-4" onSubmit={loginSubmit}>
                <input className="auth-input" type="text" placeholder="username*" required
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                <input className="auth-input" type="password" placeholder="password*" required
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <button className="primary">Login</button>
            </form>

            <p>New to Cloth4U?</p>
            <Link to={"/register"} className="underline font-semibold">Join Cloth4U for FREE Now</Link>
        </div>
    );
}