const expect = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`expect ${actual} to be ${expected}`);
    }
  },
  toBeGreaterThan: (expected) => {
    if (actual <= expected) {
      throw new Error(`expect ${actual} to be greater than ${expected}`);
    }
  },
});
