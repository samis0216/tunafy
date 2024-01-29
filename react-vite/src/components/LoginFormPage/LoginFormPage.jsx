import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import "./LoginForm.css";
import tunafyLogo from "../Navigation/tunafy1.png";
import * as sessionActions from '../../redux/session';

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault()

    return await dispatch(sessionActions.thunkLogin({email: 'demo@aa.io', password: 'password'}))
    .then(navigate('/'))
  }

  return (
    <div id="login-page">
      <div className="home-bar">
      <NavLink to='/' className='home-link'>
        <img className="logo" src={tunafyLogo} alt="logo" />
        <h3>Tunafy</h3>
      </NavLink>
      </div>
      <div className="login-container">
        <div id="login-box">
          <h1 id="login-header">Log in to Tunafy</h1>
          {errors.length > 0 &&
            errors.map((message) => <p className='error-message'key={message}>{message}</p>)}
          <form className="login-form" onSubmit={handleSubmit}>
            {errors.email && <p className='error-message'>{errors.email}</p>}
            <label className="login-labels">
              Email
              <input
                className="login-inputs"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            {errors.password && <p className='error-message'>{errors.password}</p>}
            <label className="login-labels">
              Password
              <input
                className="login-inputs"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className='user-login-button'>
              <button id="login-submit" type="submit">Log In</button>
            </div>
          </form>
          <span className='demo-user-login' onClick={demoUserLogin}>Demo User</span>
        </div>
      </div>
      <div className="sign-up-link">
        <p>Don&apos;t have an account?</p>
        <NavLink to='/signup' className='tunafy-signup-link'>Sign up for Tunafy.</NavLink>
      </div>
    </div>
  );
}

export default LoginFormPage;
