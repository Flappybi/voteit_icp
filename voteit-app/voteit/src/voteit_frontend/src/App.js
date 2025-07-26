import React, { useState, useEffect } from "react";
import { voteit_backend } from "../../../declarations/voteit_backend";
import CandidateCard from "./components/CandidateCard";

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");

  const loadResults = async () => {
    const results = await voteit_backend.getAllResults();
    setCandidates(results.map(([name, count]) => ({ name, votes: Number(count) })));
  };

  const addCandidate = async () => {
    if (newCandidate.trim()) {
      await voteit_backend.addCandidate(newCandidate.trim());
      setNewCandidate("");
      loadResults();
    }
  };

  const vote = async (name) => {
    await voteit_backend.vote(name);
    loadResults();
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">VoteIt</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          className="p-2 border rounded w-1/2"
          placeholder="Add new candidate"
        />
        <button onClick={addCandidate} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.name} name={candidate.name} votes={candidate.votes} onVote={vote} />
        ))}
      </div>
    </div>
  );
};

export default App;

