export default function FilterCheck ({title, updateFilter, items, filter}) {
    
    const showMore = () => {
        const container = document.getElementById(`filters-detail-${title}`);
        const arrowUp = document.getElementById(`filters-detail-${title}-hide`);
        const arrowDown = document.getElementById(`filters-detail-${title}-show`);

        if (container.style.display == "none" | container.style.display == "") {
            container.style.display = "block";
            arrowDown.style.display = "none";
            arrowUp.style.display = "block";
        }
        else {
            container.style.display = "none";
            arrowDown.style.display = "block";
            arrowUp.style.display = "none";
        }
    }

    return (
        <div className="mt-2">
            <div className="title" onClick={showMore}>
                <h2>{title}</h2>
                <i className="uil uil-angle-down text-xl" id={`filters-detail-${title}-show`} ></i>
                <i className="uil uil-angle-up text-xl hidden" id={`filters-detail-${title}-hide`}></i>
            </div>
            <div className="mt-1 hidden" id={`filters-detail-${title}`}>
                {items.map((item, i) => (
                    <div className="container-checkbox" key={`${item}${i}`}>
                        <input type="checkbox"
                            className="filter"
                            id={item}
                            value={item}
                            checked={filter.includes(item)}
                            onChange={() => updateFilter(item)} />
                        <label className="cursor-pointer" htmlFor={item}>{item}</label>
                    </div> 
                ))}
            </div>
        </div>
    );
}