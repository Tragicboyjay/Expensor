import AddForm from '../components/AddForm';
import Ledger from '../components/Ledger'
import useFetch from '../custom-hooks/useFetch';
import { useContext, useEffect } from 'react';
import { expenseContext } from "../context/ExpenseProvider"

const Home = () => {
    const [data, setData] = useContext(expenseContext);
    const { data: expenses, isPending, error } = useFetch(
        "http://localhost:8080/api/ledger/"
    );

    useEffect(() => {
        
        setData(expenses); // Update the shared data state when expenses change
    }, [expenses, setData]);

    const  handleDelete = async id => {
        const response = await fetch("http://localhost:8080/api/ledger/" + id, {
            method: 'DELETE'
        })
     
        const newExpenses = await response.json()
        setData(newExpenses)
    }

    const handleSort = sortValue => {
        if (sortValue === 'newest') {
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
            setData(sorted)
        }
        else if (sortValue === 'oldest'){
            const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(sorted)
        }
    }

    return (
        <>
            <Ledger data={data} isPending={isPending} error={error} handleDelete={handleDelete} handleSort={handleSort} />
            <AddForm />
        </>
    );
};

export default Home;