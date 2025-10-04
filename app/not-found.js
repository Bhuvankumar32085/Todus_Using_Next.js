import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-screen h-screen justify-center items-center flex-col bg-gray-400">
      <h2 className="text-white font-bold text-lg">
        yo page yaha nahi h bhaiya{" "}
      </h2>
      <p className="text-white font-bold text-lg">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="py-1 px-2 text-white font-bold bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer"
      >
        Return Home
      </Link>
    </div>
  );
}
