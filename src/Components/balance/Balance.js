import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { updateBalanceSuccess } from '../../helpers/toastifyOptions';

import { getUserId, getBalance } from '../../redux/user/user-selectors';
import { updateBalance } from '../../redux/user/user-operations';

import s from './_balance.module.scss';

function Balance({ userId, sendData, currentBalance }) {
  const [balance, setBalance] = useState(currentBalance);

  const handleChange = event => {
    setBalance(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = { id: userId, balance: balance };
    await sendData(data);
    Toastify(updateBalanceSuccess).showToast();
  };

  useEffect(() => {
    setBalance(currentBalance);
  }, [currentBalance]);

  return (
    <form className={s.formBalance} onSubmit={handleSubmit}>
      <label className={s.label}>Balance:</label>
      <div className={s.inputBox}>
        <input
          className={s.input}
          name="balance"
          value={balance}
          placeholder="Balance"
          onChange={handleChange}
        />
        <button className={s.btn}>CONFIRM</button>
      </div>
    </form>
  );
}

const mapStateToProps = state => ({
  userId: getUserId(state),
  currentBalance: getBalance(state),
});

const mapDispatchToProps = dispatch => ({
  sendData: data => {
    return dispatch(updateBalance(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
