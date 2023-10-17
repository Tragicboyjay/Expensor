import { useAuthContext } from './useAuthContext'
import { expenseContext } from "../context/ExpenseProvider"
import { useContext } from 'react'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const [data, setData] = useContext(expenseContext);

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    setData([])
  }

  return { logout }
}