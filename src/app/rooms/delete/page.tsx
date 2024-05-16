"use server"

import db from "@/util/db";
import RoomsDelete from "@/app/rooms/delete/RoomsDelete";

export default async function Delete(){
	const rooms = await db.room.findMany()

	return (
		<RoomsDelete rooms={rooms} />
	)
}