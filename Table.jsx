import React, { useEffect, useState } from 'react';

window.fetchData = (customerId) => {
  return new Promise((resolve, reject) => {
    // simulate fetching data from a server
    setTimeout(() => {
      resolve([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Barry Smith' },
        { id: 3, name: 'adam varan' },
      ]);
    }, 500);
  });
};

const Table = ({ customerId }) => {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    fetchData(customerId).then((response) => {
      response.sort((a, b) => {
        if (sort == 'asc') {
          return a.name > b.name ? 1 : -1;
        } else {
          return a.name < b.name ? 1 : -1
        }
      });

      const newData = response.map((row) => (
        <tr>
          <td>{row.id}</td>
          <td>{row.name}</td>
        </tr>
      ));
      setData(newData);
    });
  }, [sort]);

  const increase = () => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 500);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 100 }}>
      <h1>Employees</h1>
      <table border="1">
        <tr>
          <th>ID</th>
          <th>
            <a href="#" onClick={() => setSort(sort == 'desc' ? 'asc' : 'desc')}>
              Name
            </a>
          </th>
        </tr>
        {data}
      </table>
      <br />
      <br />
      <h1>Counter is: {counter}</h1>
      <button onClick={increase}>Increase</button>
    </div>
  );
};

export default Table;
