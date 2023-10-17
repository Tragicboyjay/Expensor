import { Link } from "react-router-dom";
import {useLogout} from '../custom-hooks/useLogout'
import {useAuthContext} from '../custom-hooks/useAuthContext'


const Navbar = () => {
    const {logout } = useLogout()
    const { user } = useAuthContext()
    
    const handleClick = () => {
        logout()
    }

    return ( 
        <nav>
            <Link to='/'>
                <h1>Expensor &trade;</h1>
            </Link>
            {user && (
                <div className="nav-content">
                    <span>{user.email}</span>
                    <button
                        onClick={handleClick}
                    >Log out</button>
                </div>
            )}

            {!user && (
                <div className="nav-content">
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>            
                </div>
            )}


        </nav>
    );
}
 
export default Navbar;