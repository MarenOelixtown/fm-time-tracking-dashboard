const activityList = document.querySelector('[data-js="activity-list"]');

let activities = null;
fetch("/data.json")
  .then((request) => {
    if (!request.ok) {
      console.log("Oops! Something went wrong.");
      return null;
    }

    return request.json();
  })
  .then((data) => {
    activities = data;
    console.log(activities);
    activities.forEach((item) => {
      appendActivity(item);
    });
  });

const appendActivity = (item) => {
  const newActivity = document.createElement("li");
  newActivity.innerHTML = `
    <p>Hello Activity ${item.title}</p>`;
  activityList.append(newActivity);
};
