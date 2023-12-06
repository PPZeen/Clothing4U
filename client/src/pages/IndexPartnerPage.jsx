/* Not Developed Yet */

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function IndexPartnerPage() {
    const {user, setUser, ready} = useContext(UserContext);

    if (!user || user.type !== "partner") return <Navigate to={"/"} />

    return (
        <div className="mt-1 bg-primary flex justify-center">
            Home Partner Page
        </div>
    );
}