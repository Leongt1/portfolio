import type { Metadata } from "next";
import Armory from "@/components/Armory";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Armory — Noel George Thomas",
  description: "Swap your cursor for a HUD-flavored skin. Saved on your device.",
};

export default function ArmoryPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        <Armory />
      </main>
      <Footer />
    </>
  );
}
