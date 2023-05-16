import { Bar } from 'react-chartjs-2';
import s from './_reportsChart.module.scss';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import colors from '../../../helpers/colors';
import axios from 'axios';
import Loader from '../../loader/Loader';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = 'https://sfbackend-1-q4339617.deta.app/';

function ReportsChart() {
  const [amounts, setAmounts] = useState(null);
  const [labels, setLabels] = useState(null);

  const { year, month, category } = useParams();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: category,
      },
    },
  };

  useEffect(() => {
    axios
      .post('api/transactions/reports_by_category', {
        year,
        month,
        category,
      })
      .then(({ data }) => {
        const y = data.reportByCategory.map(el => el[0]);

        setLabels(y);

        const x = data.reportByCategory.map(el => el[1]);

        return setAmounts(x);
      })
      .catch(err => console.log(err));

    // setLabels(null);
    // setAmounts(null);

    return () => {
      setLabels(null);
      setAmounts(null);
    };
    // eslint-disable-next-line
  }, [category]);

  return (
    <>
      {amounts === null ? (
        <div className={s.loaderBox}>
          <Loader height={100} width={100} />
        </div>
      ) : (
        <div className={s.chartBox}>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  data: amounts,
                  backgroundColor: colors,
                  borderRadius: 10,
                },
              ],
            }}
          />
        </div>
      )}
    </>
  );
}

export default ReportsChart;
