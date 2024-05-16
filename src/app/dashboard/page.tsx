"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import {User, UserRole} from "@prisma/client";
import {useRouter} from "next/navigation";

export default function Signup() {
	const router = useRouter()
	const [userData, setUserData] = useState<User | null>(null)

	useEffect(() => {
		const data = localStorage.getItem("app-data")
		if (data === null){
			setUserData(null)
			router.push("/")
		} else {
			const parsedData = JSON.parse(data) as User
			setUserData(parsedData)
		}
	}, []);

	if (userData === null){
		return (
			<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
				<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
					<h1 className={"font-bold text-4xl text-amber-600"}>
						Loading
					</h1>
				</div>
			</main>
		)
	}

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
				<h1 className={"font-bold text-4xl text-amber-600"}>
					{userData.userRole} Dashboard
				</h1>
				<hr/>
				<div className={"grid grid-cols-2 gap-4"}>
					{
						userData.userRole === UserRole.Manager ? (
							<>
								<Link href={"/rooms/create"} className={"w-full"}>
									<div
										className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
										Create Room
									</div>
								</Link>
								<Link href={"/rooms/delete"} className={"w-full"}>
									<div
										className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
										Delete Room
									</div>
								</Link>
								<Link href={"/rooms/view"} className={"w-full"}>
									<div
										className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
										View Rooms
									</div>
								</Link>
							</>
						) : (
							null
						)
					}
					{
						userData.userRole === UserRole.Staff ? (
							<>
								<Link href={"/rooms/view"} className={"w-full"}>
									<div
										className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
										View Rooms
									</div>
								</Link>
							</>
						) : (
							null
						)
					}
					{
						userData.userRole === UserRole.User ? (
							<>
								<Link href={"/book"} className={"w-full"}>
									<div
										className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
										Book Room
									</div>
								</Link>
							</>
						) : (
							null
						)
					}
					<Link href={"/auth/logout"} className={"w-full"}>
						<div
							className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
							Log Out
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}
