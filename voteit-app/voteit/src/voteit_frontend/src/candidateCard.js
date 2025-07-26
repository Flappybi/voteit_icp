import React from "react";

// Props: { name: string, votes: number, onVote: function }
const CandidateCard = ({ name, votes, onVote }) => (
  <div className="bg-white p-4 rounded shadow flex justify-between items-center">
    <div>
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{votes} vote(s)</p>
    </div>
    <button
      onClick={() => onVote(name)}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Vote
    </button>
  </div>
);

export default CandidateCard;
