(() => {
  console.log('Echo360+ - Hide Future Lectures');

  // Parse date from format like "Fri, May 23, 2025"
  const parseLectureDate = (dateText) => {
      const months = {Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, 
                    Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11};
      const parts = dateText.match(/(\w{3}), (\w{3}) (\d{1,2}), (\d{4})/);
      if (parts) {
          return new Date(parts[4], months[parts[2]], parts[3]);
      }
      return null;
  };

  // Hide future lectures
  const hideFutureLectures = () => {
      const now = new Date();
      document.querySelectorAll('.content-wrapper').forEach(lecture => {
          const dateElement = lecture.querySelector('.date');
          if (dateElement) {
              const lectureDate = parseLectureDate(dateElement.textContent.trim());
              if (lectureDate && lectureDate > now) {
              lecture.style.display = 'none';
              }
          }
      });
  };

  // Sort by newest and then hide future lectures
  const sortAndHide = () => {
      const sortDropdown = document.querySelector('.selection-value');
      if (!sortDropdown) return;

      // Click to open sort dropdown
      sortDropdown.click();

      setTimeout(() => {
          // Find and click "Newest" option
          const options = document.querySelectorAll('.active-result');
          const newestOption = Array.from(options).find(opt => 
              opt.textContent.trim().toLowerCase().includes('newest')
          );

          if (newestOption) {
              newestOption.click();
              console.log('Sorted by newest');
              
              // After sorting, hide future lectures
              setTimeout(hideFutureLectures, 500);
          }
      }, 200);
  };

  // Initialize - wait for page to load
  const initInterval = setInterval(() => {
      if (document.querySelector('.selection-value')) {
          clearInterval(initInterval);
          sortAndHide();
      }
  }, 200);

  // Fallback in case sorting fails
  setTimeout(hideFutureLectures, 3000);
})();
