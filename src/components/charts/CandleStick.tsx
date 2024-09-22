import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { PriceInfo } from '../GetPriceRange';

class Props {
  priceInfo: PriceInfo[]
}

class ChartData {
  x: Date
  y: Number[]
}

function createPriceData(priceInfo: PriceInfo[]):ChartData[] {
  let chartData:ChartData[] = []

  priceInfo.forEach(priceInfo => {
    chartData.push({
      x: new Date(priceInfo.dateStr),
      y: [Number(priceInfo.open), Number(priceInfo.high), Number(priceInfo.low), Number(priceInfo.close)]
    })
  })

  return chartData
}

export default function CandleStick(props: Props) {
    const chartData:ChartData[] = createPriceData(props.priceInfo)

    let series = [{
        data: chartData
    }]
    
    let options = {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="candlestick" height={350} />
        </div>
      </div>
    );
  }
