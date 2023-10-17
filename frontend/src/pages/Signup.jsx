import { useState } from "react"
import { useSignup } from "../custom-hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async e => {
        e.preventDefault()

        await signup(email, password)
    } 

    return ( 
        <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Email:</label>
                <input 
                    type="text" 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
                <label>Password:</label>
                <input 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <button disabled={isLoading} className="btn">Sign up</button>
            {error && <div className="error">{error}</div>}
        
        </form>
    );
}
 
export default Signup;