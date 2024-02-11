import yargs from "yargs";
import prng from "./prng";
import scrypt from "./scrypt";
import cipher from "./cipher";
import decipher from "./decipher";

const encodings = [
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
] as const;

const encoding = {
  alias: "enc",
  description: "The encoding to output",
  choices: encodings,
  default: "hex",
};

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
        alias: "s",
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
      encoding,
    },
  })
  .command({
    command: "scrypt",
    describe: "Generate a key from a password and salt",
    handler: ({ password, salt, size, encoding }) =>
      console.log(scrypt(password, salt, size, encoding)),
    builder: {
      password: {
        alias: "p",
        description: "The password to generate the key from",
        type: "string",
        demandOption: true,
      },
      salt: {
        description: "The salt to generate the key from",
        type: "string",
        demandOption: true,
      },
      size: {
        alias: "s",
        description: "The number of bytes to output",
        type: "number",
        default: 64,
      },
      encoding,
    },
  })
  .command({
    command: "cipher",
    describe: "Encrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      cipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to encrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to encrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        alias: "i",
        description: "The file to encrypt",
        type: "string",
        demandOption: true,
      },
      output: {
        alias: "o",
        description: "The file to output the encrypted file to",
        type: "string",
        demandOption: true,
      },
    },
  })
  .command({
    command: "decipher",
    describe: "Decrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      decipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to decrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to decrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        alias: "i",
        description: "The file to decrypt",
        type: "string",
        demandOption: true,
      },
      output: {
        alias: "o",
        description: "The file to output the decrypted file to",
        type: "string",
        demandOption: true,
      },
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .help()
  .parse();
