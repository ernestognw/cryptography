import yargs from "yargs";
import prng from "./prng";

yargs(process.argv.slice(2))
  .command({
    command: "prng",
    describe: "Generate a random output",
    handler: ({ type, size, min, max, encoding }) =>
      console.log(prng(type, size, min, max, encoding)),
    builder: {
      type: {
        choices: ["bytes", "int", "uuid"] as const,
        description: "The type of randomness to output",
        demandOption: true,
      },
      size: {
        description: "The number of bytes to output (only for type=bytes)",
        type: "number",
        default: 16,
      },
      min: {
        description: "The minimum int to output (only for type=int)",
        type: "number",
        default: 0,
      },
      max: {
        description: "The maximum int to output (only for type=int)",
        type: "number",
        default: 100,
      },
      encoding: {
        alias: "enc",
        description: "The encoding to output (only for type=bytes)",
        choices: [
          "ascii",
          "utf8",
          "utf-8",
          "utf16le",
          "utf-16le",
          "ucs2",
          "ucs-2",
          "base64",
          "base64url",
          "latin1",
          "binary",
          "hex",
        ] as const,
        default: "hex",
      },
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help()
  .parse();
