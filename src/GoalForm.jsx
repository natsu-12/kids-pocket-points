import React from 'react';

function GoalForm ({
    inputText, setInputText, inputNum, setInputNum, handleNewGoal
}) {
  return (
    <div className='goalForm'>
        <h3>欲しいもの</h3>
            <input
                className="goalInput"
                type="text"
                placeholder="目標を入力..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <input
                className="goalNum"
                type="number"
                placeholder="ポイント額を入力..."
                value={inputNum} 
                onChange={(e) => setInputNum(Number(e.target.value))}
            />
      <button onClick={handleNewGoal} className='alignCenter'>目標を設定</button>
    </div>
  )
}

export default GoalForm;