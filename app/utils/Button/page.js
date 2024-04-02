export default function Button({ onClick,color,width, children }) {
    return (
        <button
            className={`text-center btn p-5 text-xl m-1`}
            style={{width:`${width}`,color:`${color}`}}
            onClick={onClick} // Add onClick event handler here
        >
            {children}
        </button>
    );
}
