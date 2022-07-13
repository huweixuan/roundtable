import { useEth } from "../contexts/EthContext";
import { useEffect, useState } from "react";
import Web3 from "web3";

function Vote() {
  const { state: { contract, accounts } } = useEth();
  const [ candidateName, setCandidateName ] = useState('')
  const [ candidateList, setCandidateList ] = useState([{
    "candidateId": 1,
    "candidateName": "张三",
    "voteNumber": 0
  }, {
    "candidateId": 2,
    "candidateName": "李四",
    "voteNumber": 0
  }, {
    "candidateId": 3,
    "candidateName": "王五",
    "voteNumber": 0
  }, {
    "candidateId": 4,
    "candidateName": "赵六",
    "voteNumber": 0
  }])

  useEffect(() => {
    if (contract) {
      candidateList.forEach((c, i) => {
        var candidateListTemp = candidateList;
        contract.methods.totalVotesFor(Web3.utils.asciiToHex(c.candidateName)).call({ from: accounts[0] }).then(result => {
          candidateListTemp[i].voteNumber = result;
          setCandidateList([...candidateListTemp]);
        })
      })
    }
  }, [contract])

  return (
    <div className="App" style={{margin:20}}>
      <div className="pageTitle">DApp投票系统</div>
      <table>
        <thead>
          <tr>
            <th>候选人</th>
            <th>票数</th>
          </tr>
        </thead>
        <tbody>
          {/* 读取当前页面的候选人列表，并显示 */}
          {
            candidateList?.map((item) => (
              <tr key={item.candidateId}>
                <td>{item.candidateName}</td>
                <td>{item.voteNumber}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <input placeholder="请输入候选人名字" value={candidateName} onChange={e => setCandidateName(e.currentTarget.value)}/>
      {/* 获取输入框的内容 */}
      <button
        onClick={() => {
          {/* 为输入的候选人投票，写入到区块链中 */}
          contract.methods.voteForCandidate(Web3.utils.asciiToHex(candidateName)).send({ from: accounts[0] }).then((result) => {
            var currentCandidateIndex = 0;
            {/* 获取输入候选人的数组下标 */}
            for(let i = 0; i < candidateList.length; i++) {
              let currentCandidate = candidateList[i]; 
              if (currentCandidate.candidateName === candidateName) {
                  currentCandidateIndex = i;
                break; 
              }
            }
            {/* 根据合约读取区块中的候选人列表数据，并刷新到前端页面 */}
            contract.methods.totalVotesFor(Web3.utils.asciiToHex(candidateName)).call({ from: accounts[0] }).then(result => {
              var candidateListTemp = candidateList;
              {/* 根据输入候选人的数组下标来更新列表数据 */}
              for (let i = 0; i < candidateListTemp.length; i++) {
                if (candidateName === candidateListTemp[currentCandidateIndex].candidateName) {
                  candidateListTemp[currentCandidateIndex].voteNumber = result
                }
              }
              setCandidateList([...candidateListTemp])
            })
          })
        }}>投票</button>
    </div>
  );
}

export default Vote;
