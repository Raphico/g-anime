import Header from "../components/Header"
import About from "../components/About";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate } from 'react-router-dom';
import { register, reset } from "../features/auth/authReducer";
import Spinner from "../components/Spinner";

export default function Register()
{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    securityAnswer: ''
  });

  useEffect(() => {
    if (isError)
    {
      toast.error(message);
    }
    
    if (isSuccess || user)
    {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, user, message, isSuccess, navigate, dispatch])

  const { name, password, confirmPassword, securityAnswer } = formData;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    if (confirmPassword !== password)
    {
      toast.error('Passwords don\'t match');
    }
    else
    {
      const userData = {
        name,
        password,
        securityAnswer
      }
      dispatch(register(userData));
    }
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
  {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  }

  if (isLoading)
  {
    return <Spinner />
  }
 
  return (
    <>
      <Header />
      <div className="container">
        <About />
        <div className="content">
          <h2 className='heading blue text-center'>Sign Up</h2>
          <section className="form">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={onChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} />
              </div>
              <div className="form-group">
                <label>Confirm password</label> 
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
              </div>
              <div className="form-group">
                <label>What's your mother's maiden name?/what's the name of your favorite pet?</label>
                <input type="text" name="securityAnswer" value={securityAnswer} onChange={onChange} />
              </div>
              <div className="form-group">
                <input type="submit" value="Sign Up" className="btn" />
              </div>
            </form>
          </section>
          <div className="login-option">
            <p>Already have an account? <Link className="blue" to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
