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

// 初期データの読み込み
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

// goalの初期値をlocalStorageから取得
useEffect(() => {
  const savedGoal = localStorage.getItem("goal");
  if(savedGoal){
    setGoal(JSON.parse(savedGoal));
  }
},[]);

// pointの変更があったら、localStorageに保存
useEffect(() => {
  if(loaded){
  localStorage.setItem("point",point);
  }
},[ point,loaded ]);

// 履歴の変更があったら、localStorageに保存
useEffect(() => {
  if(loaded){
  localStorage.setItem("history",JSON.stringify(history));
  }
},[ history ,loaded]);

// goalの変更があったら、localStorageに保存
useEffect(() => {
  if(loaded){
    localStorage.setItem("goal",JSON.stringify(goal));
  }
},[goal,loaded]);

// 月初と月末の処理
// 月末にポイントを保存し、月初にアラートを出す
useEffect(() => {
  const now = new Date();
  const today = now.getDate();
  const yearMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;

  // 月末なら、その月のポイントを保存
  const isMonthEnd = today === new Date(
    now.getFullYear(), now.getMonth() + 1, 0
  ).getDate();

  if (isMonthEnd) {
    localStorage.setItem(`monthlyPoint-${yearMonth}`, point);
  }

  // 月初なら、今月のアラートを出していない場合のみ実行
  const isMonthStart = today === 1;
  const alertKey = `alertShown-${yearMonth}`;
  const alreadyAlerted = localStorage.getItem(alertKey);

  if (isMonthStart && !alreadyAlerted) {
    let total = 0;
    for (let i = 1; i <= 12; i++) {
      const key = `monthlyPoint-${now.getFullYear()}-${i}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        total += Number(saved);
      }
    }

    alert(`今月の始まり！貯まったポイントは${total}ptです!`);
    setTotalNum(total+totalNum);
    localStorage.setItem(alertKey, 'true'); // アラート出した記録
  }
}, [point]);

return (
  <div>
    <div className="logo">
      <img src={`${import.meta.env.BASE_URL}images/P.png`} alt="ロゴ" />
      <h1 className="alignCenter">Kids Pocket Points</h1>
    </div>
    <div className="holder alignCenter">
    <h2 className="alignCenter">ポイント：{point} pt</h2>
    <p className="alignCenter">
      {goal.point - point > 0
      ? `「${goal.name}」まで"あと${goal.point - point}pt"`
      : `やったね！ついに${goal.name}が買えるよ！`}
    </p>
    </div>
    <PointControl 
      selectedNum={selectedNum}
      setSelectedNum={setSelectedNum}
      selectedReason={selectedReason}
      setSelectedReason={setSelectedReason}
      handleAddPoint={handleAddPoint}
      handleDeletePoint={handleDeletePoint}
      />

    <div className="buttons">
    <button onClick={() => setShowHistory(!showHistory)} className="alignCenter button">
      {showHistory ? "閉じる" : "ポイントアクティビティ"}
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
    <h2 className="alignCenter">
      これまでのポイント：{totalNum} pt
    </h2>
  </div>
)
}

export default App;
