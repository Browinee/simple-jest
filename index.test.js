const fs = require("fs");
const { sum, read } = require("./");
jest.mock("fs");

test("sum test", () => {
  expect(sum(1, 2)).toBe(3);
});

test("read test", () => {
  fs.readFileSync.mockReturnValue('{"version":"1.0.0"}');
  expect(read()).toBe(111);

  fs.readFileSync.mockReturnValue('{"version":"2.0.0"}');
  expect(read()).toBe(222);
});
