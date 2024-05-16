-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Manager', 'Staff', 'User');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "userMail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userRole" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Room" (
    "roomId" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomDescription" TEXT NOT NULL,
    "roomCapacity" INTEGER NOT NULL,
    "roomPrice" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- CreateTable
CREATE TABLE "RoomBooking" (
    "bookingId" TEXT NOT NULL,
    "bookingStart" TIMESTAMP(3) NOT NULL,
    "bookingEnd" TIMESTAMP(3) NOT NULL,
    "bookingUserId" TEXT NOT NULL,
    "bookingRoomId" TEXT NOT NULL,

    CONSTRAINT "RoomBooking_pkey" PRIMARY KEY ("bookingId")
);

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_bookingUserId_fkey" FOREIGN KEY ("bookingUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomBooking" ADD CONSTRAINT "RoomBooking_bookingRoomId_fkey" FOREIGN KEY ("bookingRoomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
