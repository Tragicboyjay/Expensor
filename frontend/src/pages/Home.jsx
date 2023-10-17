import AddForm from '../components/AddForm';
import Ledger from '../components/Ledger'
import { useContext, useEffect, useState } from 'react';
import { expenseContext } from "../context/ExpenseProvider"
import { useAuthContext } from '../custom-hooks/useAuthContext'

const Home = () => {
    const { user } = useAuthContext();
    const [data, setData] = useContext(expenseContext);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setIsLoading(true)
                try {
                    
                    const response = await fetch("http://localhost:8080/api/ledger/", {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${user.token}`
                        }
                    });

                    if (!response.ok) {
                        throw Error('Unable to connect to db')
                    }

                    const expenses = await response.json();
                    setData(expenses);

                } catch (error) {
                    
                    setError(error.message)
                }finally{
                    setIsLoading(false)
                }
            };
            fetchData()
            
        }
    }, [setData, user]);

    const handleDelete = async id => {
        try{
            const response = await fetch("http://localhost:8080/api/ledger/" + id, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
    
            if (!response.ok) {
                throw Error('Unable to delete')
            }
    
            const newExpenses = await response.json();
            setData(newExpenses)
            setDeleteError(null)
        }catch (error){
            setDeleteError(error.message)
        }



    }

    const handleSort = sortValue => {
        if (sortValue === 'newest') {
            const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sorted);
        } else if (sortValue === 'oldest') {
            const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(sorted);
        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }


    return (
        <div className='home'>
            <Ledger data={data} handleDelete={handleDelete} handleSort={handleSort} isLoading={isLoading} error={error} deleteError={deleteError}/>
            <AddForm />
        </div>
    );
};

export default Home;
