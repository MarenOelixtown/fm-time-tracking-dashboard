const activityList = document.querySelector('[data-js="activity-list"]');

fetch("/data.json")
  .then((request) => {
    if (!request.ok) {
      console.log("Oops! Something went wrong.");
      return null;
    }

    return request.json();
  })
  .then((data) => {
    const allActivities = data;
    console.log(allActivities);
    allActivities.forEach((activity) => {
      appendActivity(activity);
    });
  });

const appendActivity = (activity) => {
  const newActivity = document.createElement("li");
  newActivity.classList.add("activity-list__item");
  newActivity.innerHTML = `
    <button aria-pressed="false">
    <span class="sr-only">Menu</span>
    <img src="./images/icon-ellipsis.svg"/></button>    
    <h4>${activity.title}</h4>
    <div id="timeframe-daily" aria-labelledby="daily" tabindex="0" class="timeframe-content--hidden">
      <p>${activity.timeframes.daily.current}hours</p>
      <p>Last week - ${activity.timeframes.daily.previous}hours</p>
    </div>
    <div id="timeframe-weekly" aria-labelledby="weekly" tabindex="0" class="timeframe-content--hidden">
      <p>${activity.timeframes.weekly.current}hours</p>
      <p>Last week - ${activity.timeframes.weekly.previous}hours</p>
    </div>
    <div id="timeframe-monthly" aria-labelledby="weekly" tabindex="0" class="timeframe-content--hidden">
      <p>${activity.timeframes.monthly.current}hours</p>
      <p>Last week - ${activity.timeframes.monthly.previous}hours</p>
    </div>`;
  activityList.append(newActivity);
};
