"use client"
import Link from "next/link";
import {useState} from "react";
import {signupUser, SignupUserData} from "@/actions/user";
import {UserRole} from "@prisma/client";
import {useRouter} from "next/navigation";

export default function Signup() {
	const [signupData, setSignupData] = useState<SignupUserData>({
		userPassword: "",
		userMail: "",
		userName: "",
		userRole: "User"
	})

	const router = useRouter()

	const onClick = async () => {
		const newUser = await signupUser(signupData)
		if (newUser){
			localStorage.setItem("app-data", JSON.stringify(newUser))
			router.push("/dashboard")
		}
	}

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"} >
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Sign up
				</h1>
				<hr />
				<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--name"}>Name</label>
						<input
							id={"signup--name"}
							type={"text"}
							value={signupData.userName}
							placeholder={"Name"}
							onChange={(e) => setSignupData({...signupData, userName: e.target.value})}
							className={"p-2 rounded border"}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--email"}>Email</label>
						<input
							id={"signup--email"}
							type={"email"}
							value={signupData.userMail}
							placeholder={"Email"}
							onChange={(e) => setSignupData({...signupData, userMail: e.target.value})}
							className={"p-2 rounded border"}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--password"}>Password</label>
						<input
							id={"signup--password"}
							type={"password"}
							value={signupData.userPassword}
							placeholder={"Password"}
							onChange={(e) => setSignupData({...signupData, userPassword: e.target.value})}
							className={"p-2 rounded border"}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--role"}>Role</label>
						<select
							value={signupData.userRole}
							onChange={(e) => {
								setSignupData({...signupData, userRole: e.target.value as UserRole})
							}}
							className={"p-[0.625rem] rounded border bg-white"}
						>
							<option value={UserRole.User}>{UserRole.User}</option>
							<option value={UserRole.Staff}>{UserRole.Staff}</option>
							<option value={UserRole.Manager}>{UserRole.Manager}</option>
						</select>
					</div>
				</div>
				<div className={"flex-grow flex flex-col lg:flex-row gap-4 justify-between"}>
					<button
						className={"flex-grow w-full p-4 rounded-lg border text-center font-bold transition bg-amber-600 text-white hover:text-amber-600 hover:bg-white"}
						type={"button"}
						onClick={onClick}
					>
						Sign Up
					</button>
					<Link href={"/auth/login"} className={"w-full"}>
						<div
							className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
							Log In
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}
