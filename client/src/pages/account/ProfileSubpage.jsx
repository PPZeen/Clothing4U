export default function ProfileSubpage ({name, logout}) {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl max-md:text-2xl font-medium">Hello, {name}</h1>
            <button className="btn-account w-1/4" onClick={logout}>Logout</button>
        </div>  
    );
}