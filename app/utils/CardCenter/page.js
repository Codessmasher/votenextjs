export default function CardCenter({ children}) {
    return (
        <div className="grid place-items-center" style={{ height: "100vh", width: "100%" }}>
            {children}
        </div>
    )
}