export default function Image ({src, ...rest}) {
    src = `${import.meta.env.VITE_API_BASE_URL}/uploads/${src}`
    return (
        <img {...rest} src={src} />
    )
}