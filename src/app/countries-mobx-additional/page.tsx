import { CountriesMobxAdditional } from "@/components/countries-mobx-additional";

export default async function Page() {
  return (
    <div
      className="flex items-center justify-center min-h-screen py-8 gap-16 max-w-[80rem] mx-auto"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <CountriesMobxAdditional />
    </div>
  );
}
