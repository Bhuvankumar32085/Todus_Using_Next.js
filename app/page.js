"use client";
import { setThem } from "@/store/sclces/themSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { them } = useSelector((store) => store.theme);
  const dicpatch = useDispatch();
  console.log(them);
  const dark = them;
  // setThem
  return (
    <>
      <div className="flex flex-col">
        <Image src="/cake.jpg" width={300} height={200} alt="image" quality={100} />
        <div className={`${dark ? "bg-black" : "bg-white"}  h-screen`}>
          <div className={`text-red-500 `}>Home Page</div>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/about"
          >
            About
          </Link>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/services"
          >
            Services
          </Link>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/files"
          >
            files
          </Link>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/post"
          >
            Post
          </Link>
          <Link
            className="ml-2 bg-amber-200 px-2 py-1 cursor-pointer rounded-md"
            href="/todus"
          >
            Todus
          </Link>

          <button
            className={`${
              dark ? "text-white" : "text-black"
            } ml-4 cursor-pointer`}
            onClick={() => dicpatch(setThem(!them))}
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </>
  );
}
