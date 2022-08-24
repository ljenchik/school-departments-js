import { requestValidation } from './requestValidation';

const request1 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1975-10-04",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2015-09-01",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("valid request", async () => {
    const validationResult = requestValidation(request1);
    console.log(validationResult);
    expect(validationResult.success).toBe(true);
  });
});

const request2 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2015-09-01",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("empty date of birth", async () => {
    const validationResult = requestValidation(request2);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});

const request3 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-12",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}


describe("checks if date request is valid", () => {
  it("empty start date of birth", async () => {
    const validationResult = requestValidation(request3);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid hiring date");
  });
});

const request4 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("empty start date of birth and hiring date", async () => {
    const validationResult = requestValidation(request4);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid dates");
  });
});

const request5 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1878-12-12",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("date of birth is over 100", async () => {
    const validationResult = requestValidation(request5);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Check the dates. Employee must be less than 100 years old");
  });
});


const request6 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "2017-12-12",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("date of birth is less 18", async () => {
    const validationResult = requestValidation(request6);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Check the dates. Employee must be over 18 years old");
  });
});


const request7 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-13-12",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}


describe("checks if date request is valid", () => {
  it("invalid date of birth", async () => {
    const validationResult = requestValidation(request7);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});

const request8 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-34",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "robert@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("invalid date of birth", async () => {
    const validationResult = requestValidation(request8);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid date of birth");
  });
});

const request9 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "a..dmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("invalid email", async () => {
    const validationResult = requestValidation(request9);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Invalid email address");
  });
});

const request10 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "0126 612365" ,
  "email": "",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("empty email", async () => {
    const validationResult = requestValidation(request10);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Empty email address");
  });
});


const request11 = {}

describe("checks if date request is valid", () => {
  it("empty request", async () => {
    const validationResult = requestValidation(request11);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Fill in all required information");
  });
});
