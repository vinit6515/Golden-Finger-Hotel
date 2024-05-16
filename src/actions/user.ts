"use server";

import {User} from "@prisma/client";
import db from "@/util/db";

export type SignupUserData = Omit<User, "userId">

export async function signupUser(data: SignupUserData){
	const createdUser = await db.user.create({
		data: data
	})

	return createdUser
}

export type LoginUserData = Pick<User, "userMail" |  "userPassword">

export async function loginUser(data: LoginUserData){
	const userExists = await db.user.findFirst({
		where: {
			userMail: data.userMail,
			userPassword: data.userPassword
		}
	})

	return userExists
}