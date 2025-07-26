import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";


persistent actor VoteIt {
  type Candidate = Text;
  type Voter = Principal;

  transient var votes = HashMap.HashMap<Candidate, Nat>(10, Text.equal, Text.hash);
  transient var hasVoted = HashMap.HashMap<Voter, Bool>(10, Principal.equal, Principal.hash);

  public func addCandidate(name: Candidate): async Text {
    if (votes.get(name) != null) {
      return "Candidate already exists.";
    };
    votes.put(name, 0);
    return "Candidate added successfully.";
  };

  public func vote(name: Candidate): async Text {
    let caller = Principal.fromActor(VoteIt); 
    if (hasVoted.get(caller) == ?true) {
      return "You have already voted.";
    };

    switch (votes.get(name)) {
      case (null) { return "Candidate not found."; };
      case (?count) {
        votes.put(name, count + 1);
        hasVoted.put(caller, true);
        return "Vote recorded.";
      };
    };
  };

  public query func getVotes(name: Candidate): async ?Nat {
    return votes.get(name);
  };

  public query func getAllResults(): async [(Candidate, Nat)] {
    return Iter.toArray(votes.entries());
  };
}

