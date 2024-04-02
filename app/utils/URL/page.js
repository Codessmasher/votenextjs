import Link from 'next/link'; 
export default function URL({ href, color, width, children }) {
    return (
        <Link
            href={`${href}`}
            className={`text-center p-1 m-1 text-xl`} 
            style={{ width: `${width}`,color:`${color}` }}
        >
        {children}
        </Link> 
    );
}
