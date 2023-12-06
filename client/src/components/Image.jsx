export default function Image ({src, ...rest}) {
    src = `${import.meta.env.VITE_BASE_URL}/uploads/${src}`
    return (
        <img {...rest} src={src} />
    )
}