import CardCenter from "./utils/CardCenter/page";
import Image from "next/image";
export default function Loading() {
    return (
        <CardCenter>
            <h1 className="text-xl">Loading...</h1>
            {/* <Image src="/loader.gif" alt="loading" width={200} height={200} /> */}
        </CardCenter>
    );
}
  