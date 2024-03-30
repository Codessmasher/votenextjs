export default function Button({ onClick,color,width, children }) {
    return (
        <button
            className={`text-center bg-${color}-500 btn p-5 text-xl m-1`}
            style={{width:`${width}`}}
            onClick={onClick} // Add onClick event handler here
        >
            {children}
        </button>
    );
}
