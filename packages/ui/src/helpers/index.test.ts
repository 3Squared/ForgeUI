import { describe, it, expect } from "vitest";
import { convertToMultiSelectOption, enumToMultiSelectList, enumToSelectList, stringFilterMatch } from "@/helpers/index";

describe("string filter tests", () => {
  it("should match on exact strings", () => {
    expect(stringFilterMatch("a", "a")).toBeTruthy();
  });
  it("should match on partial strings", () => {
    expect(stringFilterMatch("Example string", "ex")).toBeTruthy();
  });

  it("should be case insensitive", () => {
    expect(stringFilterMatch("aBc", "ABC")).toBeTruthy();
  });

  it("should be match true on null", () => {
    expect(stringFilterMatch("aBc", null)).toBeTruthy();
  });

  it("should be match false on value is null", () => {
    expect(stringFilterMatch(null, "abc")).toBeFalsy();
  });
});

describe("enumToSelectList", () => {
  it("should convert array of strings to select list format", () => {
    expect(enumToSelectList(["a", "b", "c"])).toStrictEqual([
      { text: "a", value: "a" },
      { text: "b", value: "b" },
      { text: "c", value: "c" }
    ]);
  });

  it("convert array of strings to select list format and formatters apply to text", () => {
    expect(
      enumToSelectList(["a", "b", "c"], (v) => {
        if (v === "a") {
          return "This was a";
        }
        return v;
      })
    ).toStrictEqual([
      { text: "This was a", value: "a" },
      { text: "b", value: "b" },
      { text: "c", value: "c" }
    ]);
  });
});

describe("enumToMultiSelectList", () => {
  it("should convert array of strings to multiSelect list format", () => {
    expect(enumToMultiSelectList(["a", "b", "c"])).toStrictEqual([
      { label: "a", id: "a" },
      { label: "b", id: "b" },
      { label: "c", id: "c" }
    ]);
  });

  it("convert array of strings to select list format and formatters apply to label", () => {
    const result = enumToMultiSelectList(["a", "b", "c"], (v) => {
      if (v === "a") {
        return "This was a";
      }
      return v;
    });
    const [a, b, c] = result;
    expect(a).toStrictEqual({ id: "a", label: "This was a" });
    expect(b).toStrictEqual({ id: "b", label: "b" });
    expect(c).toStrictEqual({ id: "c", label: "c" });
  });
});

describe("convertToMultiSelectOption", () => {
  it("should convert the parameters passed in to a multiselect option", () => {
    expect(convertToMultiSelectOption("a", "a - label", "a - short label")).toStrictEqual({ id: "a", label: "a - label", shortLabel: "a - short label" });
  });

  it("should set the id as the label and short label if they aren't specified", () => {
    expect(convertToMultiSelectOption("a")).toStrictEqual({ id: "a", label: "a", shortLabel: undefined });
  });
});
