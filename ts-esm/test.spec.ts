import { helloWorld } from "./index";

describe("hello world", () => {
  it("should return 'Hello World'", async () => {
    const result = await helloWorld();
    expect(result).toBe("Hello World");
  });
});
