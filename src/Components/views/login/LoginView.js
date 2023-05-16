import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import s from '../_views.module.scss';
import { logIn } from '../../../redux/auth/auth-operations';
import { getToken } from '../../../redux/auth/auth-selectors';
// import SvgGenerator from '../../Components/svg-generator/SvgGenerator';
// import { GoogleLogin } from 'react-google-login';
// import jwt_decode from 'jwt-decode';

function Login({ onLogin, token }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function handleCallbackResponse(response) {
  //   // console.log('Encoded JWT ID token: ' + response.credential);
  //   const userObject = jwt_decode(response.credential);
  //   console.log('User object >>>>', userObject);
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       '811627433312-n1bbpbtdhdb7o1g43qr4s4fp2of9q4pm.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById('signInDiv'), {
  //     theme: 'outline',
  //     size: 'large',
  //   });
  // }, []);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await onLogin({ email, password });

    setEmail('');
    setPassword('');

    return;
  };

  return (
    <div className={s.homePage__container}>
      <h1 className={s.h1}>Smart Finance</h1>
      {/* <div id="signInDiv"></div> */}
      {/* <p className={s.form__text}>You can log in with your Google Account:</p>
      <button className={s.btnGoogle} id="googleLogin" type="button">
        <SvgGenerator name={'google'} /> Google
      </button> */}
      <form className={s.form} onSubmit={handleSubmit}>
        {/* <p className={s.form__text}>
          Or log in using e-mail and password, after registering:
        </p> */}

        <label className={s.form__label}>Email</label>
        <input
          className={s.form__input}
          type="email"
          name="email"
          title="This is a required field"
          placeholder="your@email.com"
          required
          value={email}
          onChange={handleChange}
          autoComplete="off"
        />

        <label className={s.form__label}>Password</label>
        <input
          className={s.form__input}
          type="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className={s.form__btnContainer}>
          <button
            type="submit"
            className={s.btn}
            name="login"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <Link className={s.form__link} to={'/signup'}>
          Or create account
        </Link>
      </form>
    </div>
  );
}
const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = {
  onLogin: logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
