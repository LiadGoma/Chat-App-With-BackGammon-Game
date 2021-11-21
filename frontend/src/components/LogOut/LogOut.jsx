import  { useEffect } from 'react'
import { logout } from '../../services/authService';

function LogOut() {
    useEffect(() => {
        logout();
        window.location = '/signup';
    }, [])
    return null;
}

export default LogOut
