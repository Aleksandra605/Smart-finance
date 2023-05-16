import { useLocation } from 'react-router-dom';

import SvgGenerator from '../../svg-generator/SvgGenerator';
import s from './_transactionsList.module.scss';

function TransactionsList({ data, onDelete }) {
  const location = useLocation();

  const handleClick = key => {
    return onDelete(key);
  };

  return (
    <>
      <ul className={s.transactionsList}>
        {data.map(item => {
          const { amount, category, description, key, date } = item;
          return (
            <li
              key={key}
              className={`${s.transactionCard} animate__fadeInDown`}
            >
              <div className={s.groupedDateDescr}>
                <span className={s.spanDate}>{date}</span>
                <span className={s.spanDescr}>{description}</span>
              </div>
              <span className={s.spanCategory}>{category}</span>
              {location.pathname === '/transactions/expenses' ? (
                <span className={s.spanAmount}>- {amount} PLN</span>
              ) : (
                <span className={s.spanAmount}>+ {amount} PLN</span>
              )}
              <button className={s.deleteBtn} onClick={() => handleClick(key)}>
                <SvgGenerator name="delete icon" />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TransactionsList;
