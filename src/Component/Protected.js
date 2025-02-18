
import { useUserContext } from '../userContext';
import { Navigate} from 'react-router-dom';

export const ProtectedRout = ({children}) => {
    const { userData } = useUserContext();
    if (!userData) {
        return <Navigate to="/Login" replace/>
    }
    return children
}
