(() => {
  console.log('Echo360+ - Hide Future Lectures');

  // Add UI controls
  const addControls = () => {
      const controlsContainer = document.querySelector('.page-controls, .toolbar');
      if (!controlsContainer || document.getElementById('hideFutureContainer')) return;

      const container = document.createElement('div');
      container.id = 'hideFutureContainer';
      container.className = 'hide-future';
      container.innerHTML = `
          <label>
              <input type="checkbox" id="hideFutureToggle">
              Hide future lectures
          </label>
      `;
      controlsContainer.appendChild(container);

      // Add event listener
      document.getElementById('hideFutureToggle').addEventListener('change', toggleFutureLectures);
  };

  // Toggle future lectures visibility
  const toggleFutureLectures = (e) => {
      if (e.target.checked) {
          hideFutureLectures();
      } else {
          showAllLectures();
      }
  };

  // Hide future lectures
  const hideFutureLectures = () => {
      const lectures = document.querySelectorAll('.lecture-item, .PagedList-item');
      const now = new Date();
      
      lectures.forEach(lecture => {
          const dateElement = lecture.querySelector('.date, .lecture-date');
          if (!dateElement) return;
          
          try {
              const dateText = dateElement.textContent.trim();
              const lectureDate = new Date(dateText);
              
              if (lectureDate > now) {
                  lecture.classList.add('future-lecture-hidden');
              }
          } catch (e) {
              console.error('Error parsing date:', e);
          }
      });
  };

  // Show all lectures
  const showAllLectures = () => {
      const lectures = document.querySelectorAll('.lecture-item, .PagedList-item');
      lectures.forEach(lecture => {
          lecture.classList.remove('future-lecture-hidden');
      });
  };

  // Initialize
  const init = () => {
      // Wait for page to fully load
      const checkReady = setInterval(() => {
          if (document.querySelector('.selection-value')) {
              clearInterval(checkReady);
              addControls();
              
              // Set default sort to Newest
              setTimeout(sortByNewest, 500);
          }
      }, 200);
  };

  // Sort by newest (original functionality)
  const sortByNewest = () => {
      const label = document.querySelector('.selection-value');
      if (!label) return;

      label.click();

      setTimeout(() => {
          const options = document.querySelectorAll('.active-result');
          const newestOption = Array.from(options).find(el => 
              el.textContent.trim().toLowerCase().includes('newest')
          );
          
          if (newestOption) {
              newestOption.click();
              console.log('Sorted by newest');
          }
      }, 200);
  };

  // Start the extension
  init();
})();
