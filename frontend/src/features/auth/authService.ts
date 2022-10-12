const API_URL = 'http://localhost:5000/api/user';

const registerUser = async(userData: Object) => 
{
  const res = await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json();

  if (res.status === 200)
  {
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  throw new Error(data.msg);
}

const logoutUser = async() =>
{
  localStorage.removeItem('user');
}

const loginUser = async(userData: Object) =>
{
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json();

  if (res.status === 200)
  {
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  throw new Error(data.msg);
}

const loginViaSecurityQuestion = async(userData: Object) =>
{
  const res = await fetch(`${API_URL}/login-security-question`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await res.json();

  if (res.status === 200)
  {
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }

  throw new Error(data.msg);
}

const authService = {
  registerUser,
  logoutUser,
  loginUser,
  loginViaSecurityQuestion
}

export default authService;
