"use server"

import db from "@/util/db";
import RoomsView from "@/app/rooms/view/RoomsView";

export default async function View(){
	const rooms = await db.room.findMany()

	const mappedRooms = await Promise.all(
		rooms.map(async (room) => {
			const nowTimestamp = new Date()
			const roomBooking = await db.roomBooking.findFirst({
				where: {
					AND: [
						{
							bookingRoomId: room.roomId
						},
						{
							bookingStart: {
								lte: nowTimestamp
							}
						},
						{
							bookingEnd: {
								gte: nowTimestamp
							}
						}
					]
				},
				include: {
					bookingUser: true
				}
			})

			if (roomBooking === null || roomBooking.bookingUser === null){
				return {
					...room,
					isBooked: false,
					bookedBy: null,
					bookingStart: null,
					bookingEnd: null
				}
			} else {
				return {
					...room,
					isBooked: true,
					bookedBy: roomBooking.bookingUser,
					bookingStart: roomBooking.bookingStart,
					bookingEnd: roomBooking.bookingEnd
				}
			}
		})
	)

	return (
		// @ts-ignore
		<RoomsView rooms={mappedRooms} />
	)
}