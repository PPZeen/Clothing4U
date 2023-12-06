import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/register", {
                name,
                email,
                password
            });
            alert("register successful. Now you log in.")
            navigate("/login");

        } catch (e) {
            alert("register failed. Duplicate Username or Email. Please try again.")
        }
    }

    return (
        <div className="auth-container">
            <h1 className="text-4xl font-bold p-4">Join Cloth4U Now</h1>
            <form className="flex flex-col w-96 gap-3 p-4" onSubmit={registerSubmit}>
                <input className="auth-input" type="text" placeholder="username*" required
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input className="auth-input" type="email" placeholder="your@email.com*" required
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input className="auth-input" type="password" placeholder="password*" required
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button className="primary">Join</button>
            </form>

            <Link to={"/login"} className="underline font-semibold">Already a member?</Link>
        </div>
    );
}