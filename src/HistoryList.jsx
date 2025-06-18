import React from 'react';

function HistoryList({ history }) {
  return (
    <div className='historyBox'>
        <h3>ポイント履歴</h3>
        <ul>
      {history.map((item,index) => (
      <li key={index} className={item.type}>
        {item.date}:{item.type === "add" ? "+":"-"}
        {item.amount}pt ({item.reason})
      </li>
      ))}
    </ul>

    </div>
  )
}

export default HistoryList;