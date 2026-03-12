class ScoringEngine:
    """Engine for summarizing the 5 Cs of Credit and suggesting loan terms."""
    
    def __init__(self):
        self.weights = {
            "capacity": 0.3,
            "character": 0.2,
            "capital": 0.2,
            "collateral": 0.15,
            "conditions": 0.15
        }

    def calculate_score(self, data: dict):
        # High-level scoring logic based on 5 Cs
        scores = {
            "capacity": data.get("capacity_score", 70),  # Based on GST/Cash flows
            "character": data.get("character_score", 80), # Based on Research (news/litigation)
            "capital": data.get("capital_score", 60),   # Based on Financial Statements
            "collateral": data.get("collateral_score", 50),
            "conditions": data.get("conditions_score", 70)
        }
        
        final_score = sum(scores[c] * self.weights[c] for c in self.weights)
        
        recommendation = "Approve" if final_score > 65 else "Reject"
        limit = 0
        rate = 0
        
        if recommendation == "Approve":
            limit = data.get("asset_value", 10000000) * 0.7  # 70% of assets
            rate = 12.5 + (100 - final_score) * 0.1 # Risk premium based on score
            
        return {
            "final_score": final_score,
            "scores": scores,
            "recommendation": recommendation,
            "suggested_limit": limit,
            "interest_rate": round(rate, 2),
            "explanation": self.generate_explanation(final_score, scores)
        }

    def generate_explanation(self, final_score, scores):
        if final_score > 65:
            return f"Credit approved with a strong score of {final_score:.1f}. GST flows indicate high capacity."
        else:
            low_c = min(scores, key=scores.get)
            return f"Credit rejected due to high risk in {low_c}."

