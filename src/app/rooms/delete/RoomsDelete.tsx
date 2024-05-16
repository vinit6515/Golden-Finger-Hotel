"use client";

import {Room} from "@prisma/client";
import {useRouter} from "next/navigation";
import {deleteRoom} from "@/actions/room";

type RoomsDeleteProps = {
	rooms: Room[]
}

export default function RoomsDelete(props: RoomsDeleteProps){
	const router = useRouter()

	const onDeleteClick = async (roomData: Room) => {
		const confirmDelete = window.confirm(`Confirm delete ${roomData.roomName}?`)
		if (confirmDelete){
			await deleteRoom(roomData.roomId)
			router.push("/dashboard")
		}
	}

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"} >
				{
					props.rooms.length === 0 ? (
						<h1 className={"font-bold text-4xl text-amber-600"}>
							No Rooms to Display
						</h1>
					) : (
						<>
							<h1 className={"font-bold text-4xl text-amber-600"}>
								Delete Room
							</h1>
							<hr/>
							<div className={"grid grid-cols-2 lg:grid-cols-4 gap-4"}>
								{
									props.rooms.map((room) => {
										return (
											<button
												key={room.roomId}
												onClick={() => {
													onDeleteClick(room)
												}}
												className="border rounded-lg p-4 text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition">
												{room.roomName}
											</button>
										)
									})
								}
							</div>
						</>
					)
				}
			</div>
		</main>
	);
}