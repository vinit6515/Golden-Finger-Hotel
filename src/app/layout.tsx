import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	                                   children
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`${inter.className} w-screen overflow-x-clip`}>
		{children}
		</body>
		</html>
	);
}

export const revalidate = 0;
export const dynamic = 'force-dynamic';