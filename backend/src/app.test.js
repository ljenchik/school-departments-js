import { datesValidation } from './datesValidation';
const date1 ="1981-09-23"
const date2 ="2022-09-05"

describe("checks if date request is valid", () => {
  it("valid request", async () => {
    const validationResult = datesValidation(date1, date2);
    console.log(validationResult);
    expect(validationResult.success).toBe(true);
  });
});

describe("checks if date request is valid", () => {
  it("empty date of birth", async () => {
    const validationResult = datesValidation("", date2);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});

describe("checks if date request is valid", () => {
  it("empty start date of birth", async () => {
    const validationResult = datesValidation(date1, "");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid hiring date");
  });
});

describe("checks if date request is valid", () => {
  it("empty start date of birth", async () => {
    const validationResult = datesValidation("", "");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid dates");
  });
});

describe("checks if date request is valid", () => {
  it("date of birth is over 100", async () => {
    const validationResult = datesValidation("1889-12-12", "2022-01-01");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Employee must be less than 100 years old");
  });
});

describe("checks if date request is valid", () => {
  it("date of birth is less 18", async () => {
    const validationResult = datesValidation("2010-12-12", "2022-01-01");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Employee must be over 18 yesrs old");
  });
});

describe("checks if date request is valid", () => {
  it("invalid date of birth", async () => {
    const validationResult = datesValidation("2010-13-12", "2022-01-01");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});

describe("checks if date request is valid", () => {
  it("invalid date of birth", async () => {
    const validationResult = datesValidation("2010-24-04", "2022-01-01");
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});
