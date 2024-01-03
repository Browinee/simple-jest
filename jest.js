const jest = {
  fn(impl = () => {}) {
    const mockFn = (...args) => {
      mockFn.mock.calls.push(args);
      return impl(...args);
    };
    mockFn.mock = { calls: [] };
    return mockFn;
  },
  mock(path, mockExports = {}) {
    const path = require.resolve(path);
    require.cache[path] = {
      id: path,
      filename: path,
      loaded: true,
      exports: mockExports,
    };
  },
};
const dispatch = (event) => {
  const { fn, type, name, pass } = event;
  switch (type) {
    case "ADD_TEST":
      const { testBlock } = global["STATE"];
      testBlock.push({ fn, name });
      break;
    case "BEFORE_EACH":
      const { beforeEachBlock } = global["STATE"];
      beforeEachBlock.push(fn);
      break;
    case "BEFORE_ALL":
      const { beforeAllBlock } = global["STATE"];
      beforeAllBlock.push(fn);
      break;
    case "AFTER_EACH":
      const { afterEachBlock } = global["STATE"];
      afterEachBlock.push(fn);
      break;
    case "AFTER_ALL":
      const { afterAllBlock } = global["STATE"];
      afterAllBlock.push(fn);
      break;
    case "COLLECT_REPORT":
      const { reports } = global["STATE"];
      reports.push({ name, pass });
      break;
  }
};

const test = (name, fn) => dispatch({ type: "ADD_TEST", fn, name });
const afterAll = (fn) => dispatch({ type: "AFTER_ALL", fn });
const afterEach = (fn) => dispatch({ type: "AFTER_EACH", fn });
const beforeAll = (fn) => dispatch({ type: "BEFORE_ALL", fn });
const beforeEach = (fn) => dispatch({ type: "BEFORE_EACH", fn });

const createState = () => {
  global["STATE"] = {
    testBlock: [],
    beforeEachBlock: [],
    beforeAllBlock: [],
    afterEachBlock: [],
    afterAllBlock: [],
    reports: [],
  };
};

createState();

module.exports = { jest };
