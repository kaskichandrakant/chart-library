import React, { useRef, useState } from 'react';
import { Bubble } from 'react-chartjs-2';


const options = {
  legend: {
    display: false,
  },
};

const PieChart = (props) => {
  const renderThis = {
    datasets: props.data,
  };
  return (<div className='App'>
    <Bubble data={renderThis} options={options} />
  </div>);
};

export function BubbleChartWrapper() {
  let initialDataSet = [
    {
      data: [{
        x: 20, y: 30, r: 15,
      }],
      backgroundColor: 'red',
      label: '1',
      checked: true,
    },
    {
      data: [{
        x: 40, y: 10, r: 10,
      }],
      backgroundColor: 'blue',
      label: '2',
      checked: true,
    },
    {
      data: [{
        x: 90, y: 30, r: 20,
      }],
      // backgroundColor: 'red',
      label: '4',
      checked: true,
    },
    {
      data: [{
        x: 10, y: 15, r: 30,
      }],
      backgroundColor: 'green',
      label: '3',
      checked: true,
    },
  ];
  let [dataSets, setDataSets] = useState(initialDataSet);

  const handleCheck = (id) => {
    let current = dataSets.findIndex(d => d.label === id);
    const updated = Object.assign({}, dataSets[current]);
    updated.checked = !updated.checked;
    const newData = [...dataSets];
    newData[current] = updated;
    setDataSets(newData);
  };

  return <div>
    <h1>Bubble Chart with custom selectors</h1>
    <PieChart data={dataSets.filter(d => d.checked)} />
    <table>
      <tr>
        <th>h1</th>
        <th>h2</th>
      </tr>
      {dataSets.filter(d => d.backgroundColor !== undefined).map((item, index) => {
        return <tr key={index} style={{ 'background': item.backgroundColor }}>
          <td>
            <input key={'ip-' + index}
                   checked={item.checked}
                   type='checkbox' name={item.label} id={'ip-id-' + index} onChange={() => {
              handleCheck(item.label);
            }} />
          </td>
          <td>label</td>
        </tr>;
      })}
    </table>
  </div>;

}
