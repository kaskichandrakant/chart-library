import React, { useRef, useState } from 'react';
import { Bubble } from 'react-chartjs-2';


const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

let maxColors = 5;

function generateData() {
  return Array.from(Array(1000).keys()).map((label) => {
    return {
      data: [{
        x: Math.random() * 1000, y: Math.random() * 1000, r: 10,
      }],
      backgroundColor: maxColors > label ? colorArray[Math.ceil(Math.random() * 70)] : undefined,
      label: label,
      checked: true,
    };
  });

}

const options = {
  legend: {
    display: false,
  },
};

const PieChart = (props) => {
  const renderThis = {
    datasets: props.data,
  };
  return (<div>
    <Bubble data={renderThis} options={options} />
  </div>);
};

export function BubbleChartWrapper() {
  let initialDataSet = generateData();
  let [dataSets, setDataSets] = useState(initialDataSet);

  const handleCheck = (id) => {
    let current = dataSets.findIndex(d => d.label === id);
    const updated = Object.assign({}, dataSets[current]);
    updated.checked = !updated.checked;
    const newData = [...dataSets];
    newData[current] = updated;
    setDataSets(newData);
  };

  return <div style={{ 'width': '800px', 'display': 'flex', 'flex-direction': 'column' }}>
    <h1>Bubble Chart with custom selectors</h1>
    <PieChart data={dataSets.filter(d => d.checked)} />
    <table style={{ 'border': '1px solid black', 'width': '100%' }}>
      <tr style={{ 'display': 'flex' }}>
        <th style={{
          'border': '1px solid black', 'width': '10%',
          'display': 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
        }}>checkbox
        </th>
        <th style={{
          'border': '1px solid black', 'width': '45%',
          'display': 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
        }}>data
        </th>
        <th style={{
          'border': '1px solid black', 'width': '45%',
          'display': 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
        }}>Comment
        </th>
      </tr>
      {dataSets.filter(d => d.backgroundColor !== undefined).map((item, index) => {
        return <tr key={index} style={{ 'background': item.backgroundColor, 'display': 'flex' }}>
          <td style={{
            'border': '1px solid black', 'width': '10%',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
          }}>
            <input key={'ip-' + index}
                   checked={item.checked}
                   type='checkbox' name={item.label} id={'ip-id-' + index} onChange={() => {
              handleCheck(item.label);
            }} />
          </td>
          <td style={{
            'border': '1px solid black', 'width': '45%',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
          }}>{item.label}</td>
          <td style={{
            'border': '1px solid black', 'width': '45%',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center',
          }}>{item.label + ' one more data'}</td>
        </tr>;
      })}
    </table>
  </div>;

}
