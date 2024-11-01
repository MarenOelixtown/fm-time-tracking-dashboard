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
    <img src="./images/icon-ellipsis.svg"/>
    <h3>${item.title}</h3>
    <p>${item.timeframes.daily.current}hrs</p>
    <p>Last week - ${item.timeframes.daily.previous}hrs</p>`;
  activityList.append(newActivity);
};
