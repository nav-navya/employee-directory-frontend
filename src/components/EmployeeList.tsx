// import { useLazyQuery, useQuery } from '@apollo/client';
// import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from '@/graphql/queries';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// const EmployeeList = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState('All');

//   // Get all employees initially (to build the department dropdown)
//   const { data: allData, loading: loadingAll, error: errorAll } = useQuery(GET_ALL_EMPLOYEES);

//   // Lazy query for department filtering
//   const [fetchByDepartment, { data: filteredData, loading: loadingFiltered, error: errorFiltered }] =
//     useLazyQuery(GET_EMPLOYEES_BY_DEPARTMENT);

//   useEffect(() => {
//     if (selectedDepartment !== 'All') {
//       fetchByDepartment({ variables: { department: selectedDepartment } });
//     }
//   }, [selectedDepartment,fetchByDepartment]);

//   const allEmployees = allData?.getAllEmployees || [];
//   const filteredEmployees = filteredData?.getEmployeesByDepartment || [];

//   const departments: string[] = Array.from(
//     new Set(allEmployees.map((e:any) => e.department))
//   );

//   const employeesToShow = selectedDepartment === 'All' ? allEmployees : filteredEmployees;

//   if (loadingAll || loadingFiltered) return <p>Loading...</p>;
//   if (errorAll) return <p>Error loading employees: {errorAll.message}</p>;
//   if (errorFiltered) return <p>Error filtering: {errorFiltered.message}</p>;

//   return (
//     <div className="mt-6">
//       <div className="mb-4">
//         <label className="text-sm font-medium">
//           Filter by Department:{' '}
//           <select
//             className="ml-2 border border-gray-300 p-1 rounded"
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//           >
//             <option value="All">All</option>
//             {departments.map((dept) => (
//               <option key={dept} value={dept}>
//                 {dept}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <table className="w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//            <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Position</th>
//             <th className="p-2 border">Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employeesToShow.map((emp: any) => (
//             <tr key={emp.id} className="text-center">
//               <Link href={`/employee/${emp.id}`}>{emp.name}</Link>
//               <td className="p-2 border">{emp.position}</td>
//               <td className="p-2 border">{emp.department}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeeList;



import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from '@/graphql/queries';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the type for an employee
type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
};

const EmployeeList = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Get all employees initially (to build the department dropdown)
  const { data: allData, loading: loadingAll, error: errorAll } = useQuery(GET_ALL_EMPLOYEES);

  // Lazy query for department filtering
  const [fetchByDepartment, { data: filteredData, loading: loadingFiltered, error: errorFiltered }] =
    useLazyQuery(GET_EMPLOYEES_BY_DEPARTMENT);

  useEffect(() => {
    if (selectedDepartment !== 'All') {
      fetchByDepartment({ variables: { department: selectedDepartment } });
    }
  }, [selectedDepartment, fetchByDepartment]);

  const allEmployees: Employee[] = allData?.getAllEmployees || [];
  const filteredEmployees: Employee[] = filteredData?.getEmployeesByDepartment || [];

  const departments: string[] = Array.from(
    new Set(allEmployees.map((e) => e.department))
  );

  const employeesToShow: Employee[] =
    selectedDepartment === 'All' ? allEmployees : filteredEmployees;

  if (loadingAll || loadingFiltered) return <p>Loading...</p>;
  if (errorAll) return <p>Error loading employees: {errorAll.message}</p>;
  if (errorFiltered) return <p>Error filtering: {errorFiltered.message}</p>;

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="text-sm font-medium">
          Filter by Department:{' '}
          <select
            className="ml-2 border border-gray-300 p-1 rounded"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="All">All</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Department</th>
          </tr>
        </thead>
        <tbody>
          {employeesToShow.map((emp) => (
            <tr key={emp.id} className="text-center">
              <td className="p-2 border">
                <Link href={`/employee/${emp.id}`}>{emp.name}</Link>
              </td>
              <td className="p-2 border">{emp.position}</td>
              <td className="p-2 border">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
