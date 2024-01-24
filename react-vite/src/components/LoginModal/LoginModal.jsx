import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./LoginModal.css"


const LoginModal = ()=> {
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const handleLoginClick = () => {
        closeModal()
        navigate("/login")
      };

      const handleSignupClick = () => {
        closeModal()
        navigate("/signup")
      };

    return(
    <div className="login-modal">
        <div className="modal-contents">
        <h2>Please log in</h2>
        <button className='login-modal-button' type="button" onClick={handleLoginClick}>Log in</button>
        <div className="sign-up-link">
        <p>Don&apos;t have an account?</p>
        <Link to='/signup' onClick={handleSignupClick} className='tunafy-signup-link'>Sign up for Tunafy.</Link>
      </div>
        </div>
    </div>
    )
} 

export default LoginModal