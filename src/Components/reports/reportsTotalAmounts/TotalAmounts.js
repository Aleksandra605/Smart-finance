import { connect } from 'react-redux';
import s from './_totalAmounts.module.scss';
import {
  getTotalAmountExpense,
  getTotalAmountIncomes,
} from '../../../redux/reports/reports-selectors';
import { useState, useEffect } from 'react';

function TotalAmounts({ currentYear, totalAmountExp, totalAmountInc }) {
  const [currentAmountExp, setCurrentAmountExp] = useState(
    totalAmountExp.find(el => el[0] === currentYear)
      ? totalAmountExp.find(el => el[0] === currentYear)[1]
      : 0,
  );

  const [currentAmountInc, setCurrentAmountInc] = useState(
    totalAmountInc.find(el => el[0] === currentYear)
      ? totalAmountInc.find(el => el[0] === currentYear)[1]
      : 0,
  );

  //.......................................................................

  useEffect(() => {
    if (currentYear.toString().length < 4) {
      return;
    }
    setCurrentAmountExp(
      totalAmountExp.find(el => el[0] === currentYear)
        ? totalAmountExp.find(el => el[0] === currentYear)[1]
        : 0,
    );
    setCurrentAmountInc(
      totalAmountInc.find(el => el[0] === currentYear)
        ? totalAmountInc.find(el => el[0] === currentYear)[1]
        : 0,
    );
  }, [currentYear, totalAmountExp, totalAmountInc]);

  //.......................................................................

  return (
    <div className={s.div2}>
      <p className={s.name}>
        Expenses:
        <span className={s.span}>
          {currentAmountExp !== 0 ? `- ${currentAmountExp}` : currentAmountExp}{' '}
          PLN
        </span>
      </p>
      <svg
        width="2"
        height="36"
        viewBox="0 0 2 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 0V36" stroke="rgba(78,78,78,0.575)" />
      </svg>
      <p className={s.name}>
        Incomes:
        <span className={s.span}>
          {currentAmountInc !== 0 ? `+ ${currentAmountInc}` : currentAmountInc}{' '}
          PLN
        </span>
      </p>
    </div>
  );
}

const mapStateToProps = state => ({
  totalAmountExp: getTotalAmountExpense(state),
  totalAmountInc: getTotalAmountIncomes(state),
});

export default connect(mapStateToProps)(TotalAmounts);
