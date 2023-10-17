
import { useState, useEffect } from "react"
import { useAuthContext } from "../custom-hooks/useAuthContext"

const Ledger = ({data, handleDelete, handleSort, isLoading, error, deleteError}) => {
  const { user } = useAuthContext()

  const [modalError, setModalError] = useState()

  const [sortValue, setSortValue] = useState('newest')

    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
        if (data){
            const reducedTotalValue = data.reduce((sum, x) => {
                if (x.type === 'expense') {
                  return sum - Number(x.value);
                } else {
                  return sum + Number(x.value);
                }
              }, 0);
          
              setTotalValue(reducedTotalValue);
        }else{
            setTotalValue(0)
        }

      }, [data]);

      const [modal, setModel] = useState(false)
      const [modalTitle, setModalTitle] = useState('')
      const [modalValue, setModalValue] = useState('')
      const [modalComment, setModalComment] = useState('')
      const [modalDate, setModalDate] = useState('')
      const [modalType, setModalType] = useState('')
      const [modalId, setModalId] = useState('')

    async function toggleModal(id) {
        setModel(!modal)
      try{
        if(id){
          const response = await fetch("http://localhost:8080/api/ledger/" + id, {
           method: 'GET',
           headers: {
               "Authorization": `Bearer ${user.token}`
           }
          })

          if(!response.ok){
            throw Error('Unable to load data')
          }
          const expense = await response.json()

           setModalTitle(expense.title)
           setModalValue(expense.value)
           setModalComment(expense.comment)
           setModalDate(expense.date)
           setModalType(expense.type)
           setModalId(id)
           setModalError(null)    
       }
      }catch (err){
        setModalError(err.message)
      }

    }

    return (
        <div className="ledger">     
          {error && <div className="error">{error}</div> } 
          {isLoading && <div>Loading...</div>}      
            <div  style={{display: "flex", justifyContent: "space-between", padding: ".5rem 2rem"}}>
              <h4>Sort by:</h4>
              <select
                style={{border: 'none', backgroundColor: "var(--background)", outline: 'none', fontWeight: 'bolder'}}
                value={sortValue}
                onChange={(e) => {
                  const newValue = e.target.value
                  setSortValue(newValue)
                  handleSort(newValue)
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="ledger-row">
              <div className="object" style={{color: "var(--primary)"}}><h4>Date</h4></div>
              <div className="object" style={{color: "var(--primary)"}}><h4>Title</h4></div>
              <div className="object" style={{color: "var(--primary)"}}><h4>Value($)</h4></div>

            </div>
                {data && data.map( x => (
                    <div onClick={() => toggleModal(x._id)} className="ledger-row" key={x._id}>
                        
                        <div className="object"><p>{x.date}</p></div>
                        <div className="object"><p>{x.title}</p></div>
                        <div className="object"><p style={{color: x.type === 'revenue'? 'green': 'red'}}>{x.type === 'revenue' ?  '+ $' + x.value : '- $' + x.value}</p></div>
                    </div>
                ))}

            <div className="ledger-row total-row">
                <div className="object" style={{color: "var(--primary)", fontWeight: 'bolder'}}><p>Total:</p></div>
                <div className="object"></div>
                <div className="object"><p style={{color: totalValue > 0 ? 'green': 'red'}}>{totalValue ? '$' + totalValue : totalValue === 0 ? '$' + totalValue :"-"}</p></div>
            </div>

            {modal && (
            <div className="modal">
              <div onClick={() => toggleModal()} className="overlay"></div>
              {!modalError ?
                              <div className="modal-content">
                
                              <h2 style={{color: 'var(--primary)'}}>{modalTitle}</h2>
                              <div className="modal-content-row">
                                <h3>${modalValue}</h3>
                                <h3>{modalType}</h3>
                              </div>
                              <div >{modalComment ? <p>{modalComment}</p>: <p>No Comment</p>}</div>
                              <p>{modalDate}</p>
                              <button className="close-modal modal-btn" onClick={() => toggleModal()}>
                              <i className="fa-regular fa-circle-xmark size"></i>
                              </button>
                              <button 
                                className="modal-btn"
                                  onClick={() => {
                                      handleDelete(modalId)
                                      if(!deleteError){
                                        toggleModal()
                                      }
                                  }}
                              >
                                <i className="fa-solid fa-trash size" style={{color: 'var(--primary)'}}></i>
                              </button>
                              {deleteError && <div className="error">{deleteError}</div>}
                            </div> 
                            : <div className="modal-content"><div className="error">{modalError}</div></div>}
            </div>
        )}
          </div>
    );
}
 
export default Ledger;