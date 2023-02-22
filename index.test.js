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
      // string with 257 `000...000`
      partitionKey: new Array(257).fill(0).join(" "),
    };
    const hashOf257Undefined =
      "ea55bb6406e48bfdc61c0a440e59bc5c5921de1811512f6125960036426a7481b125495bf6c280194cc6c0f401cf78f40b6da3408a550023e71da2976fa2ca15";
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

  it("should return TRIVIAL_PARTITION_KEY when event is undefined", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });
});
