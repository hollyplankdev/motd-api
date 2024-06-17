import { Command } from "@commander-js/extra-typings";

const program = new Command().argument("<output-file>").parse();
const [outputFile] = program.args;

console.log(outputFile);
