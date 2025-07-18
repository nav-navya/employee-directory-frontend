import {gql} from '@apollo/client'

export const GET_ALL_EMPLOYEES = gql `
query GetAllEmployees {
getAllEmployees {
id
name
position
department
}
}
`

export const GET_EMPLOYEES_BY_DEPARTMENT = gql`
  query GetEmployeesByDepartment($department: String!){
    getEmployeesByDepartment(department: $department){
    id
    name
    position
    department

    }
  }
`

export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`

