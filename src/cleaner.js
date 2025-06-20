const fs = require("fs");
const path = require("path");
const { runPipeline } = require("./pipeline");
const { calculateScore } = require("./scoreEngine");

async function cleanFromData(dataArray) {
  if (!Array.isArray(dataArray)) {
    throw new Error("Input must be an array of objects.");
  }

  const cleaned = [];
  let preProcessedScoredSum = 0;
  let postProcessedScoredSum = 0;

  for (const item of dataArray) {
    const preProcessedScored = calculateScore(item);
    const processed = await runPipeline(item);
    const postProcessedScored = calculateScore(processed);

    preProcessedScoredSum += preProcessedScored;
    postProcessedScoredSum += postProcessedScored;

    cleaned.push({ ...processed, preProcessedScored: preProcessedScored, postProcessedScored: postProcessedScored });
  }

  const summary = {
    averagePreProcessedScoredSum: (preProcessedScoredSum / cleaned.length).toFixed(2),
    averagePostProcessedScoredSum: (postProcessedScoredSum / cleaned.length).toFixed(2),
    totalImprovedScore: (postProcessedScoredSum - preProcessedScoredSum).toFixed(2),
  };
  return { cleaned, summary };
}


function readJsonFile(filePath) {
  const fullPath = path.resolve(filePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}


function writeJsonFile(filePath, data) {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  console.log(`✅ JSON written to ${fullPath}`);
}

module.exports = { cleanFromData, readJsonFile, writeJsonFile };
