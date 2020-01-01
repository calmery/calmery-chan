import { getName } from ".";

describe("Test", () => {
  it("getName({})", () => expect(getName({})).toBeNull());
  it('getName({ name: "calmery-chan" })', () =>
    expect(getName({ name: "calmery-chan" })).toBe("calmery-chan"));
});
