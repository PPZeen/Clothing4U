export default function Image ({src, ...rest}) {
    src = `${import.meta.env.VITE_IMG_BASE_URL}/${src}`
    return (
        <img {...rest} src={src} />
    )
}