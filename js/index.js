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
  newActivity.classList.add("activity-list__item");
  newActivity.innerHTML = `
    <button aria-pressed="false">
    <span class="sr-only">Menu</span>
    <img src="./images/icon-ellipsis.svg"/></button>    
    <h3>${item.title}</h3>
    <p>${item.timeframes.daily.current}hours</p>
    <p>Last week - ${item.timeframes.daily.previous}hours</p>`;
  activityList.append(newActivity);
};
