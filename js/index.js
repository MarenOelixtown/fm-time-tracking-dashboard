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
    <div class="timeframe-content--hidden visible" data-js="daily">
      <p>${item.timeframes.daily.current}hours</p>
      <p>Last week - ${item.timeframes.daily.previous}hours</p>
    </div>
    <div class="timeframe-content--hidden" data-js="weekly">
      <p>${item.timeframes.weekly.current}hours</p>
      <p>Last week - ${item.timeframes.weekly.previous}hours</p>
    </div>
    <div class="timeframe-content--hidden" data-js="monthly">
      <p>${item.timeframes.monthly.current}hours</p>
      <p>Last week - ${item.timeframes.monthly.previous}hours</p>
    </div>`;
  activityList.append(newActivity);
};
