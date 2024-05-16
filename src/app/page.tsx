import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen p-8 md:p-16 lg:p-24 xl:p-32 flex-col items-center justify-center gold-bg">
			<div className={"bg-white flex flex-col gap-4 lg:gap-8 p-8 lg:p-16 border rounded-2xl shadow-2xl z-10"}>
				<h1 className={"font-bold text-4xl text-amber-600"}>
					Welcome to Golden Finger Hotels
				</h1>
				<p>
					We are a luxury hotel chain with locations in the most beautiful cities in the world.
					<br/>
					Our hotels are known for their exceptional service and attention to detail.
					<br/>
					We look forward to welcoming you to one of our hotels soon.
				</p>
				<div className={"flex-grow flex flex-col lg:flex-row gap-4 justify-between"}>
					<Link href={"/auth/signup"} className={"w-full"}>
						<div
							className={"p-4 rounded-lg border text-center font-bold bg-amber-600 text-white hover:text-amber-600 hover:bg-white transition"}>
							Sign Up
						</div>
					</Link>
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
