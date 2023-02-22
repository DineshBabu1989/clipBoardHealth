const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event && event.partitionKey === undefined) {
    return crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
  }

  let candidate =
    typeof event.partitionKey !== "string"
      ? JSON.stringify(event.partitionKey)
      : event.partitionKey;

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    : candidate;
};
