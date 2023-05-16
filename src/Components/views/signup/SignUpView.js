import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import s from '../_views.module.scss';
import { signUp } from '../../../redux/auth/auth-operations';

function SignUp({ onSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
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

  const handleSubmit = event => {
    event.preventDefault();
    onSignUp({ name, email, password });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={s.homePage__container}>
      <h1 className={s.h1}>Smart Finance</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.form__label}>Name</label>
        <input
          className={s.form__input}
          type="text"
          name="name"
          placeholder="Your name"
          required
          value={name}
          onChange={handleChange}
        />
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
          <button type="submit" className={s.btn} name="sign_up">
            Sign up
          </button>
        </div>
        <Link className={s.form__link} to={'/login'}>
          I already have account
        </Link>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  onSignUp: signUp,
};

export default connect(null, mapDispatchToProps)(SignUp);
