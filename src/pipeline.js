const stages = [];

function registerStage(stageOrFn) {
  if (typeof stageOrFn === "function") {
    stages.push({ name: stageOrFn.name || "anonymous", run: stageOrFn });
  } else {
    stages.push(stageOrFn);
  }
}

async function runPipeline(data) {
  let result = data;

  for (const stage of stages) {
    const { name = "unnamed", run, condition = () => true, onError } = stage;

    try {
      if (await condition(result)) {
        result = await run(result);
      }
    } catch (err) {
      if (onError) {
        result = await onError(err, result);
      } else {
        console.error(`Stage ${name} failed:`, err.message);
        throw err;
      }
    }
  }

  return result;
}

module.exports = { registerStage, runPipeline };
