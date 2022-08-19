import { createEmployeeRequestValidation } from './createEmployeeRequestValidation';

describe("checks if request is valid", () => {
  it("valid request", async () => {
    const request = {
        "name" : "Peter",
        "role": "teacher",
        "dob": "1984-07-23",
        "address" : "Brentwood",
        "phone": "467-3768",
        "email": "hgjhkg@gmail.con",
        "salary" : 34657,
        "start_date": "2020-03-18",
        "department_id": 57
    }
    const validationResult = createEmployeeRequestValidation(request);
    expect(validationResult.success).toBe(true);
  });
});

describe("checks if request is valid", () => {
    it("invalid request: empty name", async () => {
      const request = {
          "name" : "",
          "role": "teacher",
          "dob": "1984-07-23",
          "address" : "",
          "phone": "467-3768",
          "email": "hgjhkg@gmail.con",
          "salary" : 34657,
          "start_date": "2020-03-18",
          "department_id": 57
      }
      const validationResult = createEmployeeRequestValidation(request);
      expect(validationResult.success).toBe(false);
      expect(validationResult.error).toBe("Empty name");
    });
  });

  describe("checks if request is invalid", () => {
    it("empty request", async () => {
      const request = {
          
      }
      const validationResult = createEmployeeRequestValidation(request);
      expect(validationResult.success).toBe(false);
    });
  });

  describe("checks if request is invalid", () => {
    it("few empty fields", async () => {
        const request = {
            "name" : "",
            "role": "teacher",
            "dob": "1984-07-23",
            "address" : "",
            "phone": "467-3768",
            "email": "",
            "salary" : null,
            "start_date": "2020-03-18",
            "department_id": 57
        }
      const validationResult = createEmployeeRequestValidation(request);
      expect(validationResult.success).toBe(false);
      expect(validationResult.error).toBe("Empty name");
    });
  });