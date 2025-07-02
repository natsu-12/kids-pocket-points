import React from 'react';

function GoalForm ({
    inputText, setInputText, inputNum, setInputNum, handleNewGoal
}) {
  return (
    <div className='goalForm'>
            <input
                className="goalInput"
                type="text"
                placeholder="欲しいもの..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <input
                className="goalNum"
                type="number"
                placeholder="ポイントを入力..."
                value={inputNum} 
                onChange={(e) => setInputNum(Number(e.target.value))}
            />
      <button onClick={handleNewGoal} className='alignCenter'>目標を入力</button>
    </div>
  )
}

export default GoalForm;