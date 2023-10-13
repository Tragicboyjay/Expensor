import { useContext, useState, useEffect } from "react";
import { expenseContext } from "../context/ExpenseProvider";

const AddForm = () => {
    const [data, setData] = useContext(expenseContext);

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [type, setType] = useState("expense");
    const [date, setDate] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const add = {
            title: title,
            value: value,
            type: type,
            date: date,
            comment: comment,
        };


        fetch("http://localhost:8080/api/ledger/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(add),
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Cannot connect to the database");
                }
                return res.json();
            })
            .then(json => {
                setData(json)
                setTitle("");
                setValue("");
                setType("expense");
                setDate("");
                setComment("");
            })
            .catch((err) => console.log(err.message));

            if(window.innerWidth <= 1300){
                setFormBtnDisplay({display: 'block'})
                setFormDisplay({display: 'none'})
            }

    };

    const [formDisplay, setFormDisplay] = useState({})
    const [formBtnDisplay, setFormBtnDisplay] = useState({})

    const handleResponsiveBtn = () => {

        setFormBtnDisplay({display: 'none'})
        setFormDisplay({display: 'flex'})
        
    }

    useEffect(() => {
        
        function handleResize() {
            const windowWidth = window.innerWidth

            if (windowWidth > 1300) {
                setFormBtnDisplay({display: 'none'})
                setFormDisplay({display: 'flex'})
            }else if (windowWidth <= 1300){
                setFormBtnDisplay({display: 'block'})
                setFormDisplay({display: 'none'})
            }
        }
    
        window.addEventListener('resize', handleResize);
    }, []);

    
    return (
        <>
            <button onClick={handleResponsiveBtn} className="btn add-btn" style={formBtnDisplay}>+</button>
            <form style={formDisplay} className='input-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-row'>
                    <label style={{fontWeight: 'bolder', color: 'var(--primary)'}}>Title:</label>
                    <input 
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    />
                </div>

                <div className='form-row'>
                    <label style={{fontWeight: 'bolder', color: 'var(--primary)'}}>Value($):</label>
                    <input 
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                    />
                </div>

                <div className='form-row'>
                    <label style={{fontWeight: 'bolder', color: 'var(--primary)'}}>Type:</label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        required
                    >
                        <option value="expense">Expense</option>
                        <option value="revenue">Revenue</option>
                    </select>
                </div>

                <div className='form-row'>
                    <label style={{fontWeight: 'bolder', color: 'var(--primary)'}}>Date:</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className='form-row'>
                    <label style={{fontWeight: 'bolder', color: 'var(--primary)'}}>Coment:</label>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    ></textarea>
                </div>

                <button className='btn' type='submit'>Add</button>
            </form>
        </>
        
            
       

    );
}
 
export default AddForm;