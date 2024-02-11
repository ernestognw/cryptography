import * as crypto from "crypto";

type PRNGType = "bytes" | "int" | "uuid";

const prng = (
  type: PRNGType,
  size: number,
  min: number,
  max: number,
  encoding: BufferEncoding
) => {
  switch (type) {
    case "bytes":
      return crypto.randomBytes(size).toString(encoding);
    case "int":
      return crypto.randomInt(min, max);
    case "uuid":
      return crypto.randomUUID();
  }
};

export default prng;
