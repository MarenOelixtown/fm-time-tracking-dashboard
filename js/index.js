const iconElipsis = `<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>`;
const activityList = document.querySelector('[data-js="activity-list"]');
const timeframeButtonList = document.querySelector(
  '[data-js="btn-group-timeframe"]'
);
const allTimeframeButtons = timeframeButtonList.querySelectorAll(
  ':scope > [role="tab"]'
);

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
  newActivity.classList.add("activity__item--border");
  newActivity.setAttribute("data-js", "activity-item");
  newActivity.style.backgroundColor = activity.backgroundColor;
  newActivity.style.backgroundImage = activity.backgroundImage;

  newActivity.innerHTML = `
    <div class="activity__item container--bg-dark" data-js="activity-item-container">
      <h3 class="activity__title">${activity.title}</h3>    
      <button class="activity__button" type="button" aria-pressed="false">
        <span class="sr-only">Menu</span>
        ${iconElipsis}
      </button>             
      <!-- location for timeframeContainer -->
    </div>`;

  const timeframeContainer = document.createElement("div");
  timeframeContainer.classList.add("activity__timeframe");

  newActivity
    .querySelector('[data-js="activity-item-container"]')
    .append(timeframeContainer);
  activityList.append(newActivity);

  showTimeframePanel(timeframeContainer, activity, "daily");

  allTimeframeButtons.forEach((button) => {
    button.addEventListener("click", (event) =>
      changeTimeframe(event, activity, timeframeContainer)
    );
  });
};

const changeTimeframe = (event, activity, timeframeContainer) => {
  const targetTimeframeBtn = event.target;
  const selectedTimeframe = targetTimeframeBtn.getAttribute("id");

  allTimeframeButtons.forEach((button) =>
    button.setAttribute("aria-selected", false)
  );

  targetTimeframeBtn.setAttribute("aria-selected", true);

  showTimeframePanel(timeframeContainer, activity, selectedTimeframe);
};

const showTimeframePanel = (container, activity, timeframe) => {
  container.innerHTML = "";

  const timeframeData = activity.timeframes[timeframe];
  const timeframePanel = document.createElement("div");
  timeframePanel.setAttribute("role", "tabpanel");
  timeframePanel.setAttribute("aria-labelledby", `${timeframe}`);

  timeframePanel.innerHTML = `
    <div class="activity__timeframe--aligning">
      <p class="activity__current">${timeframeData.current} ${
    timeframeData.current > 1 ? "hrs" : "hr"
  }</p>
    <p class="activity__previous">${
      timeframe === "daily"
        ? "Yesterday"
        : timeframe === "weekly"
        ? "Last week"
        : "Last month"
    } - ${timeframeData.previous} ${
    timeframeData.previous > 1 ? "hrs" : "hr"
  }</p>
    </div>
  `;
  container.append(timeframePanel);
};

// arrow-navigation for button-timeframe-tablist

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
