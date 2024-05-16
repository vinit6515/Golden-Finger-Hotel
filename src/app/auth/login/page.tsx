"use client"
import Link from "next/link";
import {useState} from "react";
import {loginUser, LoginUserData} from "@/actions/user";
import {useRouter} from "next/navigation";

export default function Signup() {
	const [loginData, setLoginData] = useState<LoginUserData>({
		userPassword: "",
		userMail: ""
	})

	const router = useRouter()

	const onClick = async () => {
		const currentUser = await loginUser(loginData)
		if (currentUser){
			localStorage.setItem("app-data", JSON.stringify(currentUser))
			router.push("/dashboard")
		} else {
			window.alert("User does not exist")
		}
	}

	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"} >
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Log In
				</h1>
				<hr />
				<div className={"grid grid-cols-1 lg:grid-cols-2 gap-4"}>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--email"}>Email</label>
						<input
							id={"signup--email"}
							type={"email"}
							value={loginData.userMail}
							placeholder={"Email"}
							onChange={(e) => setLoginData({...loginData, userMail: e.target.value})}
							className={"p-2 rounded border"}
						/>
					</div>
					<div className={"flex flex-col gap-2"}>
						<label htmlFor={"signup--password"}>Password</label>
						<input
							id={"signup--password"}
							type={"password"}
							value={loginData.userPassword}
							placeholder={"Password"}
							onChange={(e) => setLoginData({...loginData, userPassword: e.target.value})}
							className={"p-2 rounded border"}
						/>
					</div>
				</div>
				<div className={"flex-grow flex flex-col lg:flex-row gap-4 justify-between"}>
					<button
						className={"flex-grow w-full p-4 rounded-lg border text-center font-bold transition bg-amber-600 text-white hover:text-amber-600 hover:bg-white"}
						type={"button"}
						onClick={onClick}
					>
						Log In
					</button>
					<Link href={"/auth/signup"} className={"w-full"}>
						<div
							className={"p-4 rounded-lg border text-center font-bold text-amber-600 hover:text-white hover:bg-amber-600 transition"}>
							Sign Up
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
}
