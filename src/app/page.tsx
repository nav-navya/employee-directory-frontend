'use client'
import AddEmployeeForm from "@/components/AddEmployeeForm";
import dynamic from "next/dynamic";

// Dynamically import the EmployeeList component as a client-only component
const EmployeeList = dynamic(() => import("@/components/EmployeeList"), {
  ssr: false, // disables server-side rendering
});

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>
      
      <EmployeeList />
      <AddEmployeeForm/>
    </main>
  );
}
