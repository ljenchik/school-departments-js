import { requestValidation } from './requestValidation';

const request1 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1975-10-04",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "+44 0126 612365",
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
  "phone": "+44 1267 612365" ,
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
  "phone": "+44 1266 129365" ,
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
  "phone": "+44 3126 612365" ,
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

const request12 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "" ,
  "email": "jnj@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("empty phone", async () => {
    const validationResult = requestValidation(request12);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Empty phone number");
  });
});

const request13 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "asjd 122223" ,
  "email": "jnj@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("not only digits in phone", async () => {
    const validationResult = requestValidation(request13);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Phone number must contain only digits");
  });
});

const request14 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "+44122223" ,
  "email": "jnj@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("wrong length of phine number", async () => {
    const validationResult = requestValidation(request14);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Enter phone number in format +44 xxxx xxxxxx");
  });
});

const request15 = {
  "name" : "Roberta",
  "role" : "Teacher",
  "dob": "1978-12-09",
  "address": "23 Kings Road, London, SW19 3AA",
  "phone": "-44 1222 236767" ,
  "email": "jnj@gmail.com",
  "salary": 42594,
  "start_date": "2022-08-23",
  "photo": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
}

describe("checks if date request is valid", () => {
  it("wrong length of phine number", async () => {
    const validationResult = requestValidation(request15);
    expect(validationResult.success).toBe(false);
    expect(validationResult.error).toBe("Enter phone number in format +44 xxxx xxxxxx");
  });
});