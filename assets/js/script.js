const id = {
  inputs: { year: "year_input", month: "month_input", days: "day_input" },
  age: { year: "age_in_years", month: "age_in_months", days: "age_in_days" },
};
const yearInput = document.getElementById(id.inputs.year);
const monthInput = document.getElementById(id.inputs.month);
const dayInput = document.getElementById(id.inputs.days);

const ageInYearsPreviewContainer = document
  .getElementById(id.age.year)
  ?.getElementsByTagName("span")[0];
const ageInMontsPreviewContainer = document
  .getElementById(id.age.month)
  ?.getElementsByTagName("span")[0];
const ageInDaysPreviewContainer = document
  .getElementById(id.age.days)
  ?.getElementsByTagName("span")[0];

const DateOfBirth = new Proxy(
  {},
  {
    get(target, prop) {
      return {
        year: target.year,
        day: target.day,
        month: target.month,
      };
    },
    set(target, prop, newValue) {
      ageInDaysPreviewContainer.textContent = "--";
      ageInMontsPreviewContainer.textContent = "--";
      ageInYearsPreviewContainer.textContent = "--";
      if (prop == "year") {
        target.year = parseInt(newValue.toString());
      } else if (prop == "month") {
        target.month = parseInt(newValue.toString());
      } else if (prop == "day") {
        target.day = parseInt(newValue.toString());
      }
      console.log(target, !!target.year && !!target.month && !!target.year);

      if (!!target.year && !!target.month && !!target.day) {
        let numberOfDays =
          new Date().getTime() -
          new Date(`${target.month}/${target.day}/${target.year}`).getTime();
        numberOfDays /= 1000 * 3600 * 24;
        numberOfDays = Math.ceil(numberOfDays);
        // console.log(numberOfDays);
        ageInYearsPreviewContainer.textContent = Math.floor(numberOfDays / 365)
          .toString()
          .padStart(2, 0);

        numberOfDays %= 365;
        // console.log(numberOfDays);

        ageInMontsPreviewContainer.textContent = Math.floor(numberOfDays / 30)
          .toString()
          .padStart(2, 0);

        numberOfDays %= 30;
        // console.log(numberOfDays);

        ageInDaysPreviewContainer.textContent = Math.ceil(numberOfDays)
          .toString()
          .padStart(2, 0);
      }
    },
  }
);

yearInput.onchange = (e) => {
  const value = e.target.value;
  const label = e.target.parentNode;
  const errContainer = label.getElementsByTagName("span")[0];
  const nextYear = parseInt(new Date().getFullYear()) + 1;
  label.classList.remove("text-red-800");
  errContainer.innerText = "";
  label.classList.remove("text-green-800");
  if (!isNaN(value) && parseInt(value) < nextYear && parseInt(value) > 1800) {
    label.classList.add("text-green-800");
    DateOfBirth.year = value;
    return;
  }
  console.log(e);
  label.classList.add("text-red-800");
  errContainer.innerText = "Must be a valid year";
};
monthInput.onchange = (e) => {
  const value = e.target.value;
  const label = e.target.parentNode;
  const errContainer = label.getElementsByTagName("span")[0];
  label.classList.remove("text-red-800");
  label.classList.remove("text-green-800");

  errContainer.innerText = "";
  if (!isNaN(value) && value > 0 && value < 13) {
    label.classList.add("text-green-800");
    DateOfBirth.month = e.target.value;
    return;
  }
  console.log(e);
  label.classList.add("text-red-800");
  errContainer.innerText = "Must be a valid month";
};
dayInput.onchange = (e) => {
  const value = e.target.value;
  const label = e.target.parentNode;
  const errContainer = label.getElementsByTagName("span")[0];
  label.classList.remove("text-red-800");
  label.classList.remove("text-green-800");

  errContainer.innerText = "";
  if (!isNaN(value) && value > 0 && value < 32) {
    label.classList.add("text-green-800");
    DateOfBirth.day = e.target.value;
    return;
  }
  console.log(e);
  label.classList.add("text-red-800");
  errContainer.innerText = "Must be a valid day";
};
