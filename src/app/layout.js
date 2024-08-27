import { Inknut_Antiqua, Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const inknut = Inknut_Antiqua({ weight: "500" ,subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inknut.className}>{children}</body>
    </html>
  );
}
