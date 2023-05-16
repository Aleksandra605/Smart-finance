import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  getExpensesReports,
  getIncomesReports,
} from '../../../redux/reports/reports-selectors';
import SvgGenerator from '../../svg-generator/SvgGenerator';
import s from './_reportsList.module.scss';

function ReportsList({ year, month, type, expensesReports, incomesReports }) {
  const [items, setItems] = useState(
    expensesReports
      .find(el => el[0] === year)?.[1]
      ?.find(el => el[0] === month)?.[1],
  );

  // ....................................................................

  useEffect(() => {
    if (type === 'EXPENSES') {
      const itemsListExp = expensesReports
        .find(el => el[0] === year)?.[1]
        ?.find(el => el[0] === month)?.[1];
      return setItems(itemsListExp);
    }

    const itemsListInc = incomesReports
      .find(el => el[0] === year)?.[1]
      ?.find(el => el[0] === month)?.[1];
    return setItems(itemsListInc);

    /*eslint-disable */
  }, [year, month, type]);

  //......................................................................

  return (
    <>
      <ul className={s.categoriesList}>
        {items !== undefined ? (
          Object.entries(items).map(el => {
            let category = el[0];
            return (
              <li id={el[0]} key={el[0]} className={s.item}>
                <NavLink to={`${category}`} className={s.navLink}>
                  <span>{el[1]} PLN</span>
                  <SvgGenerator name={el[0]} />
                  {el[0].toUpperCase()}
                </NavLink>
              </li>
            );
          })
        ) : (
          <p
            className={s.text}
          >{`You don't have ${type.toLowerCase()} this month`}</p>
        )}
      </ul>
    </>
  );
}

const mapStateToProps = state => ({
  expensesReports: getExpensesReports(state),
  incomesReports: getIncomesReports(state),
});

export default connect(mapStateToProps)(ReportsList);
