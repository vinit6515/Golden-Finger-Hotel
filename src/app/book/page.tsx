"use client"

import {useEffect, useState} from "react";
import {bookRoom, SearchRoomData, searchRooms} from "@/actions/room";
import {Room, User} from "@prisma/client";
import {useRouter} from "next/navigation";

export default function Book(){
	const router = useRouter()
	const [searchData, setSearchData] = useState<SearchRoomData>({
		fromDay: (new Date()).toISOString(),
		toDay: (
			new Date(
				Date.now() + (1 * 24 * 60 * 60 * 1000)
			)
		).toISOString()
	})
	const [rooms, setRooms] = useState<Room[]>([])
	const [userData, setUserData] = useState<User | null>(null)
	const fetchSearchRooms = async () => {
		const allRooms = await searchRooms(searchData)
		setRooms(allRooms)
	}

	const toDate = (dateStr: string | Date) => {
		const dateObj = new Date(dateStr)
		return dateObj.toLocaleString()
	}

	const toInputValue = (dateStr: string | Date) => {
		const dateObj = new Date(dateStr)
		const year = dateObj.getFullYear()
		const month = dateObj.getUTCMonth() + 1
		const day = dateObj.getUTCDate()
		return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
	}

	const onBookClick = async (roomData: Room) => {
		if (!userData){
			return
		}

		const confirmBooking = window.confirm(`Confirm booking ${roomData.roomName} from ${toDate(searchData.fromDay)} to ${toDate(searchData.toDay)}?`)
		if (!confirmBooking){
			return
		}

		await bookRoom({
			...searchData,
			roomId: roomData.roomId,
			userId: userData.userId
		})

		window.alert("Booking successful!")
		router.push("/dashboard")
	}

	useEffect(() => {
		const data = localStorage.getItem("app-data")
		if (data === null){
			setUserData(null)
			router.push("/")
		} else {
			const parsedData = JSON.parse(data) as User
			setUserData(parsedData)
		}
		fetchSearchRooms()
	}, []);

	// useEffect(() => {
	// 	fetchSearchRooms()
	// }, [searchData]);

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Book a Room
				</h1>
				<hr/>
				<div className={"flex flex-col lg:flex-row gap-4 justify-between items-center"}>
					<div className={"flex flex-grow justify-between border rounded-lg p-4 flex-col lg:flex-row gap-2"}>
						<label htmlFor={"book--fromday"}>
							From Date:
						</label>
						<input
							id={"book--fromday"}
							type="date"
							value={toInputValue(searchData.fromDay)}
							onChange={(e) => {
								setSearchData({
									...searchData,
									fromDay: e.target.value
								})
							}}
						/>
					</div>
					<div className={"flex flex-grow justify-between border rounded-lg p-4 flex-col lg:flex-row gap-2"}>
						<label htmlFor={"book--today"}>
							To Date:
						</label>
						<input
							id={"book--today"}
							type="date"
							value={toInputValue(searchData.toDay)}
							onChange={(e) => {
								setSearchData({
									...searchData,
									toDay: e.target.value
								})
							}}
						/>
					</div>
					<button
						type={"button"}
						className={"border rounded-lg p-4 text-center font-bold bg-amber-600 text-white"}
					>
						Search Rooms
					</button>
				</div>
				<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
					{
						rooms.map((room) => {
							return (
								<div
									key={room.roomId}
									className="p-4 rounded-lg border flex flex-col gap-4"
								>
									<h2 className={"text-2xl font-bold"}>
										{room.roomName}
									</h2>
									<hr/>
									<div className={"text-lg flex flex-col gap-2"}>
										<p>
											<b>Description:</b>&nbsp;{room.roomDescription}
										</p>
										<p>
											<b>Capacity:</b>&nbsp;{room.roomCapacity}
										</p>
										<p>
											<b>Price:</b>&nbsp;{room.roomPrice}
										</p>
									</div>
									<button
										onClick={() => {
											onBookClick(room)
										}}
										className={"border rounded-lg p-4 text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}
									>
										Book This Room
									</button>
								</div>
							)
						})
					}
				</div>
			</div>
		</main>
	);
}