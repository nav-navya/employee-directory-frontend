'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE_DETAILS } from '@/graphql/queries';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading employee details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data.getEmployeeDetails;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Salary:</strong> ₹{employee.salary}</p>
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default EmployeeDetailPage;
