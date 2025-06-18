import React from 'react';

function GoalForm ({
    inputText, setInputText, inputNum, setInputNum, handleNewGoal
}) {
  return (
    <div>
        <h3>目標設定</h3>
            <input
                type="text"
                placeholder="目標を入力..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <input
                type="number"
                placeholder="ポイント額を入力..."
                value={inputNum} 
                onChange={(e) => setInputNum(Number(e.target.value))}
            />
      <button onClick={handleNewGoal}>目標を設定</button>
    </div>
  )
}

export default GoalForm;