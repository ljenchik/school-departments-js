import { request } from "express";
import moment from "moment";

export function requestValidation(request) {
  const date1 = moment(request.dob, "YYYY-MM-DD");
  const date2 = moment(request.start_date, "YYYY-MM-DD");
  const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!request.name && !request.role && !request.dob && 
    !request.address && !request.phone && !request.email && !request.start_date && !request.salary) {
    return { success: false, error: "Fill in all required information" };
  }

  if (!date1.isValid() && !date2.isValid()) {
    return { success: false, error: "Invalid dates" };
  }

  if (!date1.isValid()) {
    return { success: false, error: "Invalid date of birth" };
  }

  if (!date2.isValid()) {
    return { success: false, error: "Invalid hiring date" };
  }
  const years = moment(date2).diff(date1, "year");
  if (years < 18) {
    return { success: false, error: "Check the dates. Employee must be over 18 years old" };
  }
  if (years > 100) {
    return {
      success: false,
      error: "Check the dates. Employee must be less than 100 years old",
    };
  }

  if (!request.email) {
    return { success: false, error: "Empty email address" };
  }

  if (!emailFormat.test(request.email)) {
    return { success: false, error: "Invalid email address" };
  }

  return { success: true, error: "" };
}
 