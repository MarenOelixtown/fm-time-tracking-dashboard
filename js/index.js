const iconElipsis = `<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>`;
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
    allActivities.forEach((activity) => {
      appendActivity(activity);
    });
  });

const appendActivity = (activity) => {
  const newActivity = document.createElement("li");
  newActivity.classList.add("activity-list__item", "container--bg-dark");
  newActivity.setAttribute("data-js", "activity-item");
  newActivity.innerHTML = `
      <h4 class="activity__title">${activity.title}</h4>    
      <button class="activity__button" type="button" aria-pressed="false">
      <span class="sr-only">Menu</span>
      ${iconElipsis}</button>          
      <div class="activity__timeframe" id="timeframe-daily" role="tabpanel" aria-labelledby="daily" class="timeframe-content">
        <div class="activity__timeframe--aligning">  
        <p class="activity__current">${activity.timeframes.daily.current}hrs</p>
        <p class="activity__previous">Yesterday - ${activity.timeframes.daily.previous}hrs</p>
        </div>
      </div>
      <div class="activity__timeframe" id="timeframe-weekly" role="tabpanel" aria-labelledby="weekly" class="timeframe-content" hidden>
        <div class="activity__timeframe--aligning">  
        <p class="activity__current">${activity.timeframes.weekly.current}hrs</p>
        <p class="activity__previous">Last week - ${activity.timeframes.weekly.previous}hrs</p>
        </div>
      </div>
      <div class="activity__timeframe" id="timeframe-monthly" role="tabpanel" aria-labelledby="monthly" class="timeframe-content" hidden>
        <div class="activity__timeframe--aligning"> 
        <p class="activity__current">${activity.timeframes.monthly.current}hrs</p>
        <p class="activity__previous">Last month - ${activity.timeframes.monthly.previous}hrs</p>
        </div>
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

let buttonFocus = 0;

timeframeButtonList.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    allTimeframeButtons[buttonFocus].setAttribute("tabindex", -1);
    if (event.key === "ArrowDown") {
      buttonFocus++;
      // If we're at the end, go to the start
      if (buttonFocus >= allTimeframeButtons.length) {
        buttonFocus = 0;
      }
      // Move up
    } else if (event.key === "ArrowUp") {
      buttonFocus--;
      // If we're at the start, move to the end
      if (buttonFocus < 0) {
        buttonFocus = allTimeframeButtons.length - 1;
      }
    }

    allTimeframeButtons[buttonFocus].setAttribute("tabindex", 0);
    allTimeframeButtons[buttonFocus].focus();
  }
});
