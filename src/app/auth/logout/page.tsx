"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Logout(){
	const router = useRouter()

	useEffect(() => {
		localStorage.removeItem("app-data")
		router.push("/")
	}, []);

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Logging you out...
				</h1>
			</div>
		</main>
	)
}