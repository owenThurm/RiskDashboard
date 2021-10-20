import React, { useEffect, useState } from "react";
import { adjustedRisk } from './utils';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function App() {
  const [btcData, setBtcData] = useState([]);
  const [btcPriceData, setBtcPriceData] = useState([]);
  const [btcDates, setBtcDates] = useState([]);

  let priceData = []
  let dates = []
  btcData.forEach(record => {
    priceData.push(record.fields.Price);
    dates.push(record.fields.Date);
  })

  useEffect(() => {
    axios.get("http://localhost:8000/api/data").then(response => {
      console.log(response);
      setBtcPriceData(response.data.prices)
      setBtcDates(response.data.dates)
    }).catch(err => {
      console.log(err);
    });
  }, [])
  let btcRisk = adjustedRisk(btcPriceData);

  const options = {
    scales: {
      yAxis: {
        id: 'A',
        position: 'left',
        type: 'logarithmic',
      },
      B: {
        id: 'B',
        type: 'linear',
        position: 'right',
        ticks: {
          max: 1,
          min: 0
        }
      }
    }
  };

  const data = {
    labels: btcDates,
    datasets: [
      {
        label: 'Price of Bitcoin',
        data: btcPriceData,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Risk Level',
        yAxisID: 'B',
        data: btcRisk,
        fill: false,
        backgroundColor: 'red',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ],
  };

  return (
    <div className="App">
      <Line data={data} options={options} />

    </div>
  );
}

export default App;
