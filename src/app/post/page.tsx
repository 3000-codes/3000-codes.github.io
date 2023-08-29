"use client";
import Test from "@/components/Test";
export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-24"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Hello World</h1>
        <p className="text-2xl">Wellcome !</p>
        <Test />
      </div>
    </div>
  );
}
