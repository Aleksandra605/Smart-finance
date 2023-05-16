import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SvgGenerator from '../../svg-generator/SvgGenerator';
import {
  getSummaryExpenses,
  getSummaryIncomes,
} from '../../../redux/transactions/transaction-selectors';
import s from './_summary.module.scss';

let selectedIndex = 0;

function Summary({ data }) {
  const [yearsList, setYearsList] = useState(data.map(el => el[0]));
  const [currentYear, setCurrentYear] = useState(yearsList[0]);
  const [items, setItems] = useState(data[0][1]);

  const location = useLocation();

  //...........................................................................................

  useEffect(() => {
    selectedIndex = 0;
    setYearsList(data.map(el => el[0]));
    setCurrentYear(data[0][0]);
    setItems(data[0][1]);
  }, [data]);

  useEffect(() => {
    setItems(data.find(el => el[0] === currentYear)[1]);
  }, [currentYear]);

  //......Navigation buttons...................................................................

  const btnLeft = async () => {
    selectedIndex =
      (await selectedIndex) === 0 ? yearsList.length - 1 : selectedIndex - 1;
    if (yearsList[selectedIndex] === undefined) {
      return setCurrentYear(yearsList[0]);
    } else await setCurrentYear(yearsList[selectedIndex]);
    return;
  };

  const btnRight = async () => {
    selectedIndex =
      (await selectedIndex) === yearsList.length - 1 ? 0 : selectedIndex + 1;
    if (yearsList[selectedIndex] === undefined) {
      return setCurrentYear(yearsList[0]);
    } else await setCurrentYear(yearsList[selectedIndex]);
    return;
  };

  //.........................................................................

  return (
    <div className={s.summaryContainer}>
      <div className={s.transactionTypeBox}>
        <button className={s.btnNext} onClick={btnRight}>
          <SvgGenerator name="Vector left" />
        </button>

        <p className={s.textYear}>{currentYear}</p>
        <button className={s.btnNext} onClick={btnLeft}>
          <SvgGenerator name="Vector right" />
        </button>
      </div>

      <ul className={s.list}>
        {items.map(item => (
          <li key={item[0]} className={s.item}>
            <span className={s.spanMonth}>{item[0]}</span>
            {location.pathname === '/transactions/expenses' ? (
              <span className={s.spanAmount}>- {item[1]}</span>
            ) : (
              <span className={s.spanAmount}>+ {item[1]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  summaryExpenses: getSummaryExpenses(state),
  summaryIncomes: getSummaryIncomes(state),
});

export default connect(mapStateToProps)(Summary);
