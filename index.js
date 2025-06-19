const { cleanFromData, readJsonFile, writeJsonFile } = require("./src/cleaner");
const { registerStage } = require("./src/pipeline");


const trimFields = require("./src/stages/trimFields");
const lowercaseEmails = require("./src/stages/lowercaseEmails");

registerStage(trimFields);
registerStage(lowercaseEmails);

const defaultStages = [trimFields, lowercaseEmails];

module.exports = { cleanFromData, readJsonFile, writeJsonFile, registerStage, defaultStages };
