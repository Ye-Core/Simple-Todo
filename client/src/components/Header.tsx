
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import type { RootState } from '../store'
import { useLogoutMutation } from '../slices/userApi'
import { clearUserInfo } from '../slices/auth'

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const [logout, {isLoading}] =  useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logOutHandler = async() => {
    try {
      await logout({})
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <nav className='flex items-center justify-between my-10'>
        <Link to={"/"} className='text-3xl font-bold '>Simple Share</Link>
        <div className='space-x-4'>
           {
            userInfo ? (
            <>
            <Link to={"/profile"} className=' text-white bg-violet-500 border rounded-sm py-2 px-4'>Profile</Link>
            <button type='button'  className=' text-white bg-red-500 border rounded-sm py-2 px-4'
            onClick={logOutHandler} disabled={isLoading}
            >Logout</button> 
            </>): 
            <>  <Link to='/login' className=' text-white bg-pink-500 border rounded-sm py-2 px-4'>Login</Link>
            <Link to='/register' className=' text-white bg-amber-400 border rounded-sm py-2 px-4'>Register</Link>
            </>
           }
        </div>
    </nav>
    
  )
}

export default Header