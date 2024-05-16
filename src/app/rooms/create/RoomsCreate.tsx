"use client";

import {useState} from "react";
import {createRoom, CreateRoomData} from "@/actions/room";
import {useRouter} from "next/navigation";


export default function RoomsCreate(){
	const router = useRouter()

	const [roomData, setRoomData] = useState<CreateRoomData>({
		roomName: "",
		roomDescription: "",
		roomCapacity: 0,
		roomPrice: 0,
	})

	const onClick = async () => {
		await createRoom(roomData)
		router.push("/dashboard")
	}

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Create Room
				</h1>
				<hr/>
				<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"room--name"}>Room Name</label>
						<input
							type="text"
							id={"room--name"}
							className={"p-2 border rounded"}
							value={roomData.roomName}
							onChange={(e) => setRoomData({...roomData, roomName: e.target.value})}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"room--description"}>Room Description</label>
						<input
							type="text"
							id={"room--description"}
							className={"p-2 border rounded"}
							value={roomData.roomDescription}
							onChange={(e) => setRoomData({...roomData, roomDescription: e.target.value})}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"room--capacity"}>Room Capacity</label>
						<input
							type="number"
							id={"room--capacity"}
							className={"p-2 border rounded"}
							value={roomData.roomCapacity}
							onChange={(e) => setRoomData({...roomData, roomCapacity: parseInt(e.target.value)})}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"room--price"}>Room Price</label>
						<input
							type="number"
							id={"room--price"}
							className={"p-2 border rounded"}
							value={roomData.roomPrice}
							onChange={(e) => setRoomData({...roomData, roomPrice: parseInt(e.target.value)})}
						/>
					</div>
				</div>
				<button
					type={"button"}
					className={"flex-grow p-4 rounded-lg border text-center font-bold hover:text-amber-600 text-white bg-amber-600 hover:bg-white transition w-full"}
					onClick={onClick}
				>
					Create Room
				</button>
			</div>
		</main>
	);
}