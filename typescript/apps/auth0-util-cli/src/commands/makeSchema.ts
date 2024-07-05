import { Command } from "@commander-js/extra-typings";
import { Auth0ApiModel } from "@motd-ts/auth0-architecture";

const program = new Command().argument("<output-file>").parse();
const [outputFile] = program.args;

console.log(outputFile);
console.log(Auth0ApiModel);
