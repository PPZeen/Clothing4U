import { useState } from "react";

export default function FilterSize ({filter, updateFilter}) {
    
    const [sizes, setSizes] = useState(["xs", "s", "m", "l", "xl", "xxl", "3xl"])

    const showMore = () => {
        const container = document.getElementById(`filters-detail-size`);
        const arrowUp = document.getElementById(`filters-detail-size-hide`);
        const arrowDown = document.getElementById(`filters-detail-size-show`);

        if (container.style.display == "none" | container.style.display == "") {
            container.style.display = "flex";
            arrowDown.style.display = "none";
            arrowUp.style.display = "flex";
        }
        else {
            container.style.display = "none";
            arrowDown.style.display = "flex";
            arrowUp.style.display = "none";
        }
    }

    return (
        <div className="mt-2 max-md:mt-0">
            <div className="title" onClick={showMore}>
                <h2>Size</h2>
                <i className="uil uil-angle-down text-xl" id={`filters-detail-size-show`} ></i>
                <i className="uil uil-angle-up text-xl hidden" id={`filters-detail-size-hide`}></i>
            </div>
            <div className="container-checkbox-cs mt-2 hidden" id={`filters-detail-size`}>
                {sizes.map((size, index) => (
                    <input
                        type="checkbox"
                        className="size flex justify-center items-center text-sm before:content-[attr(before)]"
                        before={size.toUpperCase()}
                        value={size}
                        checked={filter.includes(size)}
                        onChange={() => updateFilter(size)}
                        key={`filters-detail-size-${size}`}
                    />
                ))}
            </div>
        </div>
    );
}