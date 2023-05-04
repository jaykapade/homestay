import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar";
import "./globals.css";

import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";

import LoginModal from "./components/Modal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Modal/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

//! Layout is by default an server component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
