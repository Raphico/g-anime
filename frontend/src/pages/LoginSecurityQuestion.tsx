import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import About from "../components/About";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hook";
import { loginViaSecurityQuestion, reset } from "../features/auth/authReducer";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function LoginSecurityQuestion()
{
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    securityAnswer: ''
  })
  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError)
    {
      toast.error(message);
    }

    if (user || isSuccess)
    {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const { name, securityAnswer } = formData

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    dispatch(loginViaSecurityQuestion(formData));
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
  {
    const target = e.target as HTMLInputElement
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
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
          <h2 className='heading blue text-center'>Sign In</h2>
          <section className="form">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name='name' value={name} onChange={onChange} />
              </div>
              <div className="form-group">
                <label>What's your mother's maiden name?/what's the name of your favorite pet?</label>
                <input type="text" name='securityAnswer' value={securityAnswer} onChange={onChange} />
              </div>
              <div className="form-group">
                <input type="submit" value="Sign Up" className="btn" />
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  )
}