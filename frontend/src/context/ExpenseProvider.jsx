import { createContext, useState } from "react";

export const expenseContext = createContext();

const ExpenseProvider = ({ children }) => {
    // this state will be shared with all components 
    const [data, setData] = useState([]);

    return (
                // this is the provider providing state
        <expenseContext.Provider value={[data, setData]}>
            { children }
        </expenseContext.Provider>
    );
};

export default ExpenseProvider;





