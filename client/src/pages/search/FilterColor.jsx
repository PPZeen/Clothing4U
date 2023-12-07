import { useState } from "react";

export default function FliterColor ({filter, updateFilter}) {
    
    const [colors, setColors] = useState([
        "black", "dark-gray", "gray", "light-gray", "white", "off-white", "beige", "sail",
        "coconut-milk", "light-brown", "brown", "red", "metallic-red", "pink",
        "purple", "blue", "navy", "arctic-night", "green", "light-blue", "sea-glass"
        
    ])

    const showMore = () => {
        const container = document.getElementById(`filters-detail-color`);
        const arrowUp = document.getElementById(`filters-detail-color-hide`);
        const arrowDown = document.getElementById(`filters-detail-color-show`);

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
                <h2>Color</h2>
                <i className="uil uil-angle-down text-xl" id={`filters-detail-color-show`} ></i>
                <i className="uil uil-angle-up text-xl hidden" id={`filters-detail-color-hide`}></i>
            </div>
            <div className="container-checkbox-cs mt-2 hidden" id={`filters-detail-color`}>
                {colors.map((color, index) => (
                    <input
                        type="checkbox"
                        className={`color ${color} accent-${color}`} id={`filter-${color}`}
                        value={color}
                        checked={filter.includes(color)}
                        onChange={() => updateFilter(color)}
                        key={`filters-detail-color-${color}`}
                    />
                ))}
            </div>
        </div>
    );
}