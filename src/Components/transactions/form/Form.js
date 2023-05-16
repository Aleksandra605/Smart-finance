import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  addTransactionExpense,
  addTransactionIncome,
} from '../../../redux/transactions/transaction-operations';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { expensesList, incomesList } from './categoriesList';
import { Box } from '@mui/system';

import s from './_form.module.scss';

//........................................................................

function TransactionForm({ sendDataExpense, sendDataIncome }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(['Choose category']);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);

  const location = useLocation();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory([value]);
        break;
      case 'amount':
        setAmount(value);
        break;

      default:
        return;
    }
  };

  const submitForm = async event => {
    event.preventDefault();

    const data = await {
      category,
      description,
      amount,
      date,
    };

    if (location.pathname === '/transactions/expenses') {
      await sendDataExpense(data);
    } else await sendDataIncome(data);

    clearForm();
  };

  const clearForm = () => {
    setDescription('');
    setCategory(['Choose category']);
    setAmount('');
    setDate(null);
    return;
  };

  return (
    <form onSubmit={submitForm} className={s.form}>
      <div className={s.inputsBox}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box className={s.box1}>
            <DatePicker
              label="Custom input"
              value={date}
              onChange={newValue => {
                setDate(newValue);
              }}
              className={s.datePicker}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box
                  className={s.date}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <input
                    ref={inputRef}
                    {...inputProps}
                    className={s.dateInput}
                    required
                  />
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </Box>
        </LocalizationProvider>

        <input
          type="text"
          className={s.description}
          label="Description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
          name="description"
          autoComplete="none"
          maxLength={30}
        />

        <div className={s.dropdownMenu}>
          <h3 className={s.menuTitle}>{category}</h3>
          {location.pathname === '/transactions/expenses' ? (
            <select
              multiple
              value={category}
              label="Category"
              name="category"
              onChange={handleChange}
              className={s.select}
            >
              {expensesList.map(el => (
                <option key={el} value={el} className={s.option}>
                  {el}
                </option>
              ))}
            </select>
          ) : (
            <select
              multiple
              value={category}
              label="Category"
              name="category"
              onChange={handleChange}
              className={s.select}
            >
              {incomesList.map(el => (
                <option key={el} value={el} className={s.option}>
                  {el}
                </option>
              ))}
            </select>
          )}
        </div>

        <input
          required
          name="amount"
          type="number"
          placeholder="0.00"
          label="Amount"
          value={amount}
          onChange={handleChange}
          className={s.amount}
        />
      </div>

      <div className={s.btnContainer}>
        <button type="submit" className={s.btn}>
          <span>ENTER</span>
        </button>
        <button type="button" onClick={() => clearForm()} className={s.btn}>
          <span>CLEAR</span>
        </button>
      </div>
    </form>
  );
}

const mapDispatchToProps = dispatch => ({
  sendDataExpense: data => {
    return dispatch(addTransactionExpense(data));
  },
  sendDataIncome: data => {
    return dispatch(addTransactionIncome(data));
  },
});

export default connect(null, mapDispatchToProps)(TransactionForm);
