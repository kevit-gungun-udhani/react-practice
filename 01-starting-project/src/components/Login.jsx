import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    password: ''
  })

  const emailIsInValid = enteredValue.email !== '' && !enteredValue.email.includes("@")

  function handleInputChange(identifier, event){
    setEnteredValue(
      (prevValue) => {
        return {
          ...prevValue,
          [identifier]: event.target.value
        }
      }
    )
  }

  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(event) => handleInputChange('email' ,event)} value={enteredValue.email}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event) => handleInputChange('password' ,event)} value={enteredValue.password}/>
        </div>
        <div className="control-error">
          {emailIsInValid && <p>Enter valid email address</p>}
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
