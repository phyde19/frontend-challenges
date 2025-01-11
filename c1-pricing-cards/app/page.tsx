import LandingHeader from "@/components/LandingHeader";
import PlanSelector from "@/components/PlanSelector";
import { Check, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col py-10 px-6 h-screen items-center font-[family-name:var(--font-geist-sans)]">
        <LandingHeader />
        <PlanSelector />
    </div>
  );
}