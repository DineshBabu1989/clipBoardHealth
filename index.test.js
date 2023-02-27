const { deterministicPartitionKey } = require("./index");

/**
 * The mock helps us test our code independant of the imports
 */
jest.mock("crypto", () => ({
  createHash: () => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnValue("encrypt 123"),
  }),
}));

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

    expect(deterministicPartitionKey(event)).toBe("encrypt 123");
  });

  it("should hash entire event when there is no partition key", () => {
    const event = {
      name: "dinesh",
    };

    expect(deterministicPartitionKey(event)).toBe("encrypt 123");
  });

  it("should return TRIVIAL_PARTITION_KEY when event is undefined", () => {
    expect(deterministicPartitionKey()).toBe("0");
  });
});
