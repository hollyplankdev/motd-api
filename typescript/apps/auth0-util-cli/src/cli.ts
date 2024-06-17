import { program } from "@commander-js/extra-typings";

program
  .name("auth0-util-cli")
  .description("CLI to help with managing Auth0.")
  .version("0.0.1")
  .command("make-schema", "Creates the JSON schema for the auth0 formation", {
    executableFile: "./commands/makeSchema",
  });

program.parse();
