import moment from "moment";
export function datesValidation(date1, date2) {
  var date1 = moment(date1, "YYYY-MM-DD");
  var date2 = moment(date2, "YYYY-MM-DD");
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
  return { success: true, error: "" };
}
