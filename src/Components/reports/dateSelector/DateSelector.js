import { useEffect } from 'react';

import useLocalStorage from '../../../hooks/useLocalStorage';
import { years, monthsList } from '../../../helpers/dates';
import s from './_dateSelector.module.scss';

function DateSelector({ handleChangeCurrentYear, handleChangeCurrentMonth }) {
  const [year, setYear] = useLocalStorage('reportsCurrentYear', [
    new Date().getFullYear(),
  ]);
  const [month, setMonth] = useLocalStorage('reportsCurrentMonth', [
    monthsList[new Date().getMonth()],
  ]);

  useEffect(() => {
    handleChangeCurrentYear(year[0]); /*eslint-disable */
  }, [year]);

  useEffect(() => {
    handleChangeCurrentMonth(month[0]); /*eslint-disable */
  }, [month]);

  const handleChangeYear = event => {
    setYear([event.target.value]);
  };

  const handleChangeMonth = event => {
    setMonth([event.target.value]);
  };

  return (
    <form className={s.form}>
      <div className={`${s.dropdownMenu} ${s.year}`}>
        <h3 className={s.menuTitle}>{year}</h3>
        <select
          multiple
          value={year}
          label="year"
          name="year"
          onChange={handleChangeYear}
          className={s.select}
          required
        >
          {years.map(el => (
            <option key={el} value={el} className={s.option}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className={`${s.dropdownMenu} ${s.month}`}>
        <h3 className={s.menuTitle}>{month}</h3>
        <select
          multiple
          value={month}
          label="month"
          name="month"
          onChange={handleChangeMonth}
          className={s.select}
          required
        >
          {monthsList.map(el => (
            <option key={el} value={el} className={s.option}>
              {el}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default DateSelector;
