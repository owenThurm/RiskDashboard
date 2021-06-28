import React, { useEffect, useState } from "react";
import Airtable from 'airtable';
import { sma, adjustedRisk } from './utils';
import { Line } from 'react-chartjs-2';


function App() {
  const [btcData, setBtcData] = useState([]);
  const [btcPriceData, setBtcPriceData] = useState([]);
  const [btcDates, setBtcDates] = useState([]);
  const [riskValues, setRiskValues] = useState([]);

  let priceData = []
  let dates = []
  btcData.forEach(record => {
    priceData.push(record.fields.Price);
    dates.push(record.fields.Date);
  })

  useEffect(() => {
    console.log('#^%#$*&#^%*@&$*@(^%FETCHING.......')
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: 'keyKV2aqdKylxBU9g'
    });
    let base = Airtable.base('appJLSvjDzrX3ac9z');
    let btcDataTable = base('btcpricehistory');
    btcDataTable.select({
      view: 'Grid view',
    }).all().then(data => {
      setBtcData(data);
      let btcPriceData = data.map(record => record.fields.Price);
      let btcDates = data.map(record => record.fields.Date);
      let riskValues = data.map(record => {




        return 0;
      });



      setBtcPriceData(btcPriceData);
      setBtcDates(btcDates);
    });
  }, [])
  let btcSMA = sma(btcPriceData, 365);
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
