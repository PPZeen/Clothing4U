export default function FilterList ({filter, updateFilter}) {
    return (
        <>
            {filter.map(item => (
                <button
                    className="flex items-center gap-1 px-3 py-1 border border-neutral-600"
                    onClick={() => updateFilter(item)}
                    key={`filterlist-${item}`}
                >
                    <h3 className="text-neutral-600">{item}</h3>
                    <i className="uil uil-times text-lg"></i>
                </button>
            ))}
        </>
    );
}