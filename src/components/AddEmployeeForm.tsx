
'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE } from '../graphql/mutations';
import { GET_ALL_EMPLOYEES } from '@/graphql/queries';

// Define interfaces for form data and errors
interface FormData {
  name: string;
  position: string;
  department: string;
  salary: string;
}

interface FormErrors {
  name?: string;
  position?: string;
  department?: string;
  salary?: string;
}

const AddEmployeeForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    position: '',
    department: '',
    salary: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.salary || isNaN(Number(formData.salary))) {
      newErrors.salary = 'Valid salary is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseInt(formData.salary),
        },
      });

      setFormData({
        name: '',
        position: '',
        department: '',
        salary: '',
      });
      setErrors({});
      setIsModalOpen(false);
      alert('Employee added successfully!');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      position: '',
      department: '',
      salary: '',
    });
    setErrors({});
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 py-8">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Add Employee
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Add New Employee
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    placeholder="Enter position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-500">{errors.position}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    placeholder="Enter department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    placeholder="Enter salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.salary ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.salary && (
                    <p className="mt-1 text-sm text-red-500">{errors.salary}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-3 px-4 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                    loading
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {loading ? 'Adding...' : 'Add Employee'}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center mt-4">{error.message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeForm;