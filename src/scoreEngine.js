function calculateScore(obj) {
  let score = 0;

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || value === "") {
      score -= 2;
    } else if (typeof value === "string") {
      if (value.trim() !== value) score -= 1;
      if (value.length > 0) score += 1;
    } else {
      score += 1;
    }
  }
  return score;
}

module.exports = { calculateScore };
