import { decimalPlaceValidator, latlongValidator, telephoneNumberValidator, urlValidator } from "@/validation/validators";
import { describe, expect, it } from "vitest";

describe("LatLongValidator", () => {
  it("should accept a valid lat long", () => {
    expect(latlongValidator("1.2, 2.1")).toBe(true);
  });

  it("should reject a invalid lat long", () => {
    expect(latlongValidator("asd")).toBe(false);
  });
});

describe("DecimalPlaceValidator", () => {
  it("should accept 2 decimal places", () => {
    expect(decimalPlaceValidator("1.23")).toBe(true);
  });
  it("should accept whole numbers", () => {
    expect(decimalPlaceValidator("1")).toBe(true);
  });
  it("should reject 3 decimal places", () => {
    expect(decimalPlaceValidator("1.234")).toBe(false);
  });
  it("should reject non numeric values", () => {
    expect(decimalPlaceValidator("hello")).toBe(false);
  });
  it("should accept negative decimals", () => {
    expect(decimalPlaceValidator("-1.23")).toBe(true);
  });
});

describe("TelephoneValidator", () => {
  it("should accept valid uk phone numbers", () => {
    expect(telephoneNumberValidator("17546342432")).toBe(true);
  });

  /*   it('should reject invalid uk phone numbers', () => {
      expect(telephoneNumberValidator('1236')).toBe(false);
    }); */

  it("should reject words", () => {
    expect(telephoneNumberValidator("hello world")).toBe(false);
  });
});

describe("urlValidator", () => {
  it("should accept non-http/https value", () => {
    expect(urlValidator("test123.com")).toBe(true);
  });
  it("should accept http value", () => {
    expect(urlValidator("http://test123.com")).toBe(true);
  });
  it("should accept https value", () => {
    expect(urlValidator("https://test123.com")).toBe(true);
  });
  it("should accept alternate domain extension value", () => {
    expect(urlValidator("http://test123.us")).toBe(true);
  });
  it("should accept URLs containing www.", () => {
    expect(urlValidator("http://www.test123.us")).toBe(true);
    expect(urlValidator("www.test123.us")).toBe(true);
  });
  it("should accept URLs including paths, query strings and fragments", () => {
    expect(urlValidator("test123.com/extras")).toBe(true);
    expect(urlValidator("test123.com/extras/more")).toBe(true);
    expect(urlValidator("test123.com/extras/more/?query=test")).toBe(true);
    expect(urlValidator("test123.com/extras/more/?query=test#thisIsAFragment")).toBe(true);
  });
  it("should not accept invalid URLs", () => {
    expect(urlValidator("https//test123.com")).toBe(false);
    expect(urlValidator("htps://test123.com")).toBe(false);
    expect(urlValidator("htps:/test123.com")).toBe(false);
    expect(urlValidator("htps://test123com")).toBe(false);
    expect(urlValidator("test123com")).toBe(false);
    expect(urlValidator("htps://test123.")).toBe(false);
    expect(urlValidator("test123.")).toBe(false);
    expect(urlValidator("test123com")).toBe(false);
  });
});
