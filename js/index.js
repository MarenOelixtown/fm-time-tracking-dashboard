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
  newActivity.setAttribute("data-js", "activity-item");
  newActivity.innerHTML = `
      <button aria-pressed="false">
      <span class="sr-only">Menu</span>
      <img src="./images/icon-ellipsis.svg"/></button>    
      <h4>${activity.title}</h4>
      <div id="timeframe-daily" role="tabpanel" aria-labelledby="daily" class="timeframe-content">
        <p>${activity.timeframes.daily.current}hours</p>
        <p>Yesterday - ${activity.timeframes.daily.previous}hours</p>
      </div>
      <div id="timeframe-weekly" role="tabpanel" aria-labelledby="weekly" class="timeframe-content" hidden>
        <p>${activity.timeframes.weekly.current}hours</p>
        <p>Last week - ${activity.timeframes.weekly.previous}hours</p>
      </div>
      <div id="timeframe-monthly" role="tabpanel" aria-labelledby="monthly" class="timeframe-content" hidden>
        <p>${activity.timeframes.monthly.current}hours</p>
        <p>Last month - ${activity.timeframes.monthly.previous}hours</p>
      </div>`;
  activityList.append(newActivity);
};

const timeframeButtonList = document.querySelector(
  '[data-js="btn-group-timeframe"]'
);
const allTimeframeButtons = timeframeButtonList.querySelectorAll(
  ':scope > [role="tab"]'
);
allTimeframeButtons.forEach((button) => {
  button.addEventListener("click", changeTimeframe);
});

function changeTimeframe(event) {
  const targetTimeframeBtn = event.target;
  const selectedTimeframe = targetTimeframeBtn.getAttribute("aria-controls");
  const allActivityItems = document.querySelectorAll(
    '[data-js="activity-item"]'
  );

  allTimeframeButtons.forEach((button) =>
    button.setAttribute("aria-selected", false)
  );

  targetTimeframeBtn.setAttribute("aria-selected", true);

  allActivityItems.forEach((activityItem) => {
    activityItem
      .querySelectorAll('[role="tabpanel"]')
      .forEach((timeframe) => timeframe.setAttribute("hidden", ""));
    activityItem
      .querySelector(`#${selectedTimeframe}`)
      .removeAttribute("hidden");
  });
}
