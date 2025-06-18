import React , {useState,useEffect} from "react";
import GoalForm from "./GoalForm.jsx";
import HistoryList from "./HistoryList.jsx";
import PointControl from "./PointControl.jsx";

function App () {

const [point,setPoint] = useState(0);
const [history,setHistory] = useState([]);
const [goal,setGoal] =useState({name:"Switchのゲーム",point: 500 });
const [selectedNum,setSelectedNum] = useState(10);
const [selectedReason,setSelectedReason] = useState("お手伝い");
const [inputText,setInputText] = useState("");
const [inputNum,setInputNum] = useState(10);
const [totalNum,setTotalNum] = useState(0);
const [loaded,setLoaded] = useState(false);
const [showHistory,setShowHistory] = useState(false);

const handleNewGoal = () => {
  setGoal({name: inputText ,point: inputNum });
};

const handleAddPoint = () => {
  setPoint(point + Number(selectedNum));
    const newRecord =  {
      type: "add",
      amount: Number(selectedNum),
      reason: selectedReason,
      date: new Date().toLocaleDateString()
  };
  setHistory([...history,newRecord]);
};

const handleDeletePoint = () => {
  if(point - Number(selectedNum) < 0){
    return(alert("ポイント不足！"));
  }
  setPoint(point - Number(selectedNum));
  const newRecord2 =  {
    type: "use",
    amount: Number(selectedNum),
    reason: selectedReason,
    date: new Date().toLocaleDateString()
};
  setHistory([...history,newRecord2]);
}

useEffect(() => {
  const saved = localStorage.getItem("point");
  if(saved){
    setPoint(Number(saved));
  }
  const savedHistory = localStorage.getItem("history");
  if(savedHistory){
    setHistory(JSON.parse(savedHistory));
  }
  setLoaded(true);
},[]);

useEffect(() => {
  const savedGoal = localStorage.getItem("goal");
  if(savedGoal){
    setGoal(JSON.parse(savedGoal));
  }
},[]);

useEffect(() => {
  if(loaded){
  localStorage.setItem("point",point);
  }
},[ point,loaded ]);

useEffect(() => {
  if(loaded){
  localStorage.setItem("history",JSON.stringify(history));
  }
},[ history ,loaded]);

useEffect(() => {
  if(loaded){
    localStorage.setItem("goal",JSON.stringify(goal));
  }
},[goal,loaded]);

useEffect(() => {
  const now = new Date();
  const today = now.getDate();
  const yearMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const isMonthEnd = today === new Date(
  now.getFullYear(),now.getMonth() + 1,0).getDate();
    if(isMonthEnd){
      localStorage.setItem(`monthlyPoint-${yearMonth}`,point);
    }
  const isMonthStart = today === 1;
  if(isMonthStart){
    let total = 0;
    for(let i = 1;i <= 12;i++){
      const key = `monthlyPoint-${now.getFullYear()}-${i}`;
      const saved = localStorage.getItem(key);
      if(saved){
        total += Number(saved);
      }
    }
    alert(`現在の累計ポイントは${total}ptです!`);
    setTotalNum(total);
  }
},[ point ])

return (
  <div>
    <h1>お小遣い管理アプリ</h1>
    <h2>現在のポイント：{point} pt</h2>
    <p>
      {goal.point - point > 0
      ? `目標「${goal.name}」まで、あと${goal.point - point}pt"`
      : `やったね！ついに${goal.name}が買えるよ！`}
    </p>
    
    <PointControl 
      selectedNum={selectedNum}
      setSelectedNum={setSelectedNum}
      selectedReason={selectedReason}
      setSelectedReason={setSelectedReason}
      handleAddPoint={handleAddPoint}
      handleDeletePoint={handleDeletePoint}
      />

    <div>
    <button onClick={() => setShowHistory(!showHistory)}>
      {showHistory ? "履歴を隠す" : "履歴を見る"}
    </button>
    {showHistory && <HistoryList history={history} />}
    </div>
    
<GoalForm
  inputText={inputText}
  setInputText={setInputText}
  inputNum={inputNum}
  setInputNum={setInputNum}
  handleNewGoal={handleNewGoal}
/>
    <p>これまでの累計ポイント：{totalNum} pt</p>
  </div>
)
}

export default App;
