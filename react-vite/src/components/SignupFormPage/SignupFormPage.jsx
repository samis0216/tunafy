import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css"
import tunafyLogo from "../Navigation/tunafy1.png";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (String(password).length < 6) {
      return setErrors({
        password:
          "Password must be at least 6 characters. ",
      })
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field. ",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div id="signup-page">
      <div className="home-bar">
      <NavLink to='/' className='home-link'>
        <img className="logo" src={tunafyLogo} alt="logo" />
        <h3>Tunafy</h3>
      </NavLink>
      </div>
      <div className="signup-container">
        <div id="signup-box">
          <h1 id="signup-header">Sign up to start listening</h1>
          <div style={{minHeight: 30}}>{errors.server ? <span className="error-message">{errors.server}</span> : ' '}</div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-labels">
              Email Address
              <input
                className="signup-inputs"
                placeholder='Email Address'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <div style={{minHeight: 30}}>{errors.email ? <span className="error-message">{errors.email}</span> : ' '}</div>
            <label className="signup-labels">
              Username
              <input
                type="text"
                className="signup-inputs"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <div style={{minHeight: 30}}>{errors.username ? <span className="error-message">{errors.username}</span> : ' '}</div>
            <label className="signup-labels">
              Password
              <input
                type="password"
                className="signup-inputs"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <div style={{minHeight: 30}}>{errors.password ? <span className="error-message">{errors.password}</span> : ' '}</div>
            <label className="signup-labels">
              Confirm Password
              <input
                type="password"
                placeholder='Confirm Password'
                className="signup-inputs"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </label>
            <div style={{minHeight: 30}}>{errors.confirmPassword ? <span className="error-message">{errors.confirmPassword}</span> : ' '}</div>
            <div className="sign-up-button">
              <button id="signup-submit" type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <div className="log-in-link">
        <p>Already have an account?</p>
        <NavLink to='/login' className='tunafy-login-link'>Log in here.</NavLink>
      </div>
    </div>
  );
}

export default SignupFormPage;
