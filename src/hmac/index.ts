import * as crypto from "crypto";
import { PathLike, createReadStream, readFileSync } from "fs";

const hmac = (
  algorithm: string,
  key: string,
  encoding: crypto.BinaryToTextEncoding,
  input: PathLike
) => {
  return crypto
    .createHmac(algorithm, Buffer.from(key, "utf8"))
    .update(readFileSync(input))
    .digest(encoding);
};

export default hmac;
