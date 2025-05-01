(() => {
  console.log('Echo360+ - hide future lectures');

  // Wait until the dropdown and options are available
  const waitForSortElements = setInterval(() => {
    const dropdown = document.getElementsByClassName("selection-value")[0];
    const options = document.getElementsByClassName("active-result");

    if (dropdown && options.length > 1) {
      clearInterval(waitForSortElements);
      dropdown.click();
      options[1].click(); // Assumes "Newest" is at index 1
    }
  }, 500); // Check every 500ms

  // Reference to info the info bar, which also displays the sort-by dropdown.
  const infoBar = document.getElementsByClassName('info-bar')[0];

  // Create a new checkbox element
  let toggleFutureLectures = document.createElement('input');
  toggleFutureLectures.type = 'checkbox';

  // This value can safely be altered to control the default visibility of future lectures
  toggleFutureLectures.checked = true;
  toggleFutureLectures.id = 'showFutureLectures';

  // Store all the lectures that we hide, so we can bring them back.
  let futureLectures = [];

  toggleFutureLectures.onchange = () => {
    for (const lecture of futureLectures) {
      lecture.style.display = toggleFutureLectures.checked ? 'none' : '';
    }
  };

  // Create a container element on the info bar to hold a toggle box for this feature
  const hideFutureDiv = document.createElement('div');
  infoBar.appendChild(hideFutureDiv);
  hideFutureDiv.className = 'hide-future';

  // Place a label in this container
  const label = document.createElement('label');
  label.textContent = "Hide future lectures";
  hideFutureDiv.appendChild(label);

  // Place the checkbox element in this container
  hideFutureDiv.appendChild(toggleFutureLectures);

  // The div which holds all the lectures
  const lectureContainer = document.getElementsByClassName('contents-wrapper')[0];

  // Hide any lectures which are already in the document before script loads
  futureLectures = Array.from(document.getElementsByClassName('class-row future'));
  toggleFutureLectures.onchange();

  // As lectures are loaded asynchronously after page loads, we need a listener
  lectureContainer.addEventListener('DOMNodeInserted', (evt) => {
    const target = evt.target;
    if (target.classList && target.classList.contains('class-row') && target.classList.contains('future')) {
      if (document.getElementById('showFutureLectures').checked) {
        target.style.display = 'none';
      }
      futureLectures.push(target);
    }
  });
})();
