import Link from 'next/link'; 
export default function URL({ href, color, width, children }) {
    return (
        <Link
            href={`${href}`}
            className={`text-center bg-${color}-500 p-3 m-4 text-xl`} 
            style={{ width: `${width}` }}
        >
        {children}
        </Link> 
    );
}
