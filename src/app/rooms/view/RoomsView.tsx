"use client";

import {Room, User} from "@prisma/client";

type RoomsViewProps = {
	rooms: (Room & ({
		isBooked: true,
		bookedBy: User,
		bookingStart: string | Date,
		bookingEnd: string | Date
	} | {
		isBooked: false,
		bookedBy: null,
		bookingStart: null,
		bookingEnd: null
	}))[]
}

export default function RoomsView(props: RoomsViewProps){
	const toDate = (dateStr: string | Date) => {
		const dateObj = new Date(dateStr)
		return dateObj.toLocaleString()
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
								Rooms
							</h1>
							<hr/>
							<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
								{
									props.rooms.map((room) => {
										return (
											<div
												key={room.roomId}
												className="p-4 rounded-lg border flex flex-col gap-4"
											>
												<h2 className={"text-2xl font-bold"}>
													{room.roomName}
												</h2>
												<hr />
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
												{
													room.isBooked ? (
														<div className={"p-4 flex flex-col border border-red-400 rounded-lg text-red-400"}>
															<p>Booked by {room.bookedBy.userName}</p>
															<p>From {toDate(room.bookingStart)} to {toDate(room.bookingEnd)}</p>
														</div>
													) : (
														<div className={"p-4 flex flex-col text-center border border-green-600 rounded-lg text-green-600"}>
															<p>Not Booked</p>
															<p>&nbsp;</p>
														</div>
													)
												}
											</div>
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