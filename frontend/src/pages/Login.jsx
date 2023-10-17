import { useState } from "react"
import { useLogin } from "../custom-hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async e => {
        e.preventDefault()

        await login(email, password)
    } 

    return ( 
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Log in</h3>
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

            <button className="btn" disabled={isLoading}>Log in</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default Login;