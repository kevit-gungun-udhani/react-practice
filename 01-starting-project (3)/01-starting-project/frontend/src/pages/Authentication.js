import AuthForm from '../components/AuthForm';
import { redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}){
  const param = new URL(request.url).searchParams;
  const mode = param.get('mode') || 'login';

  if(mode !== 'login' && mode !== 'signup'){
    throw json({message: 'Unsupported mode'}, {status: 422})
  }

  const method = request.method;
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }
  
  const response = await fetch('http://localhost:8080/' + mode, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  });
  

  if(response.status === 422 || response.status === 401){
    return response;
  }

  if(!response.ok){
    throw json({message: 'Error while signing the user'}, {status: 500})
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1)
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/');
}
