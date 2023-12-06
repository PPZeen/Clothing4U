export default function Star ({rate, kId}) {
    const StarSol = () => {
        return <i className="fa-solid fa-star text-lg text-amber-500"></i>
    }
    const StarReq = () => {
        return <i className="fa-regular fa-star text-lg text-amber-500"></i>
    }

    return (
        <div className="flex">
            {[...Array(Math.floor(rate)).keys()].map((i) => (
                <StarSol key={`${kId}${i}`}/>
            ))}
            {[...Array(5-Math.floor(rate)).keys()].map((i) => (
                <StarReq key={`${i}${kId}${i}`}/>
            ))}
        </div>
    );
}