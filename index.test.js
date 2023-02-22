const { deterministicPartitionKey } = require("./index");

describe("deterministicPartitionKey", () => {
  it("should use partition key when it exists", () => {
    const event = {
      partitionKey: "test-key",
    };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  it("should stringify partition key when its not a string", () => {
    const event = {
      partitionKey: 127971292179,
    };
    expect(deterministicPartitionKey(event)).toBe("127971292179");
  });

  it("should hash partition key when its greater than 256 char", () => {
    const event = {
      // string with 257 `undefined,undefined...undefined`
      partitionKey: [].fill(257).join(""),
    };
    const hashOf257Undefined =
      "b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6";
    expect(deterministicPartitionKey(event)).toBe(hashOf257Undefined);
  });

  it("should hash entire event when there is no partition key", () => {
    const event = {
      name: "dinesh",
    };
    const expectedHash =
      "53f109aeb096166efd118847185e29185538d9dfd34c146e1b566d30100cf08e1324b5a6197f07451a47f8cda25e578206dd778cab1f1582412c9f08fd5c2e57";
    expect(deterministicPartitionKey(event)).toBe(expectedHash);
  });
});
