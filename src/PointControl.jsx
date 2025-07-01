import React from 'react';

function PointControl({
    selectedNum,setSelectedNum,
    selectedReason,setSelectedReason,
    handleAddPoint,handleDeletePoint
}) {
  return (
    <div className='alignCenter'> 
        <select
            className="reasons"
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
        >
            <option value="お手伝い">お手伝い</option>
            <option value="ご褒美">ご褒美</option>
            <option value="お祝い">お祝い</option>
            <option value="お菓子、ジュース">お菓子、ジュース</option>
            <option value="おもちゃ、ゲーム">おもちゃ、ゲーム</option>
        </select>
        <select 
            className="points forms" 
            value={selectedNum}
            onChange={(e) => setSelectedNum(Number(e.target.value))}
        >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <div className='buttons'>
        <button onClick={handleAddPoint} className='addButton'>ポイントを追加！</button>
        <button onClick={handleDeletePoint} className='useButton'>ポイントを使う！</button>
        </div>
    </div>
  )
}

export default PointControl;

