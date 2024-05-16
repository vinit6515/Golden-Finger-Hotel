"use server";

import {Room} from "@prisma/client";
import db from "@/util/db";

export type CreateRoomData = Omit<Room, "roomId">

export async function createRoom(data: CreateRoomData){
	const createdRoom = await db.room.create({
		data: data
	})

	return createdRoom
}

export async function deleteRoom(roomId: string){
	const deletedRoom = await db.room.delete({
		where: {
			roomId: roomId
		}
	})

	return deletedRoom
}

export type SearchRoomData = {
	fromDay: string,
	toDay: string
}

export async function searchRooms(data: SearchRoomData){
	const rooms = await db.room.findMany()

	const mappedRooms = await Promise.all(
		rooms.map(async (room) => {
			const roomBookings = await db.roomBooking.findMany({
				where: {
					bookingRoomId: room.roomId,
				}
			})

			const isBooked = roomBookings.some((booking) => {
				const fromDay = new Date(data.fromDay)
				const toDay = new Date(data.toDay)
				const bookingStart = new Date(booking.bookingStart)
				const bookingEnd = new Date(booking.bookingEnd)

				return (
					(fromDay >= bookingStart && fromDay <= bookingEnd) ||
					(toDay >= bookingStart && toDay <= bookingEnd) ||
					(fromDay <= bookingStart && toDay >= bookingEnd)
				)
			})

			return {
				...room,
				isBooked
			}
		})
	)

	const filteredRooms = mappedRooms.filter((room) => {
		return !room.isBooked
	})

	return filteredRooms
}

type BookRoomData = {
	roomId: string,
	userId: string,
	fromDay: string,
	toDay: string
}

export async function bookRoom(data: BookRoomData){
	const createdBooking = await db.roomBooking.create({
		data: {
			bookingRoomId: data.roomId,
			bookingUserId: data.userId,
			bookingStart: data.fromDay,
			bookingEnd: data.toDay
		}
	})

	return createdBooking
}