document.addEventListener('DOMContentLoaded', function() {
    // Initialize displayed month and year from the current date (local)
    const today = new Date();
    let displayedMonth = today.getMonth(); // 0 = January
    let displayedYear = today.getFullYear();
  
    const calendarHeader = document.getElementById("calendar-month-year");
    const calendarContainer = document.getElementById('simple-calendar');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Function to render the calendar grid for the given displayedMonth and displayedYear
    function renderCalendar() {
      // Update the header with the month and year
      calendarHeader.textContent = `${monthNames[displayedMonth]} ${displayedYear}`;
  
      // Build a date object for the first and last day of the displayed month
      const firstDayDisplayed = new Date(displayedYear, displayedMonth, 1);
      const lastDayDisplayed = new Date(displayedYear, displayedMonth + 1, 0);
      const daysInMonth = lastDayDisplayed.getDate();
      // For Monday-Sunday, shift the day index: (getDay() returns 0 for Sunday; adjust so Monday=0)
      const startDayIndex = (firstDayDisplayed.getDay() + 6) % 7;
  
      // Build HTML for the calendar grid:
      let calendarHTML = '<div class="calendar">';
      // Day-of-week headers (Monday to Sunday)
      const dayNamesHeader = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < dayNamesHeader.length; i++) {
        calendarHTML += `<div class="day-header">${dayNamesHeader[i]}</div>`;
      }
      // Empty cells for days before the first day of the month
      for (let i = 0; i < startDayIndex; i++) {
        calendarHTML += '<div class="day"></div>';
      }
      // Create day cells for each day of the month
      for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<div class="day" data-day="${day}"><div class="date-number">${day}</div></div>`;
      }
      calendarHTML += '</div>';
      calendarContainer.innerHTML = calendarHTML;
  
      // After building the calendar grid, load and display events
      loadEvents();
    }
  
    // Function to load events from schedule.json and display those matching the displayed month/year
    function loadEvents() {
      fetch('data/schedule.json')
        .then(response => response.json())
        .then(data => {
          // Support JSON wrapped with an "events" property
          const events = data.events ? data.events : data;
          events.forEach(event => {
            // Parse event.date into a local Date object
            const parts = event.date.split("-");
            const eventDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            // Only display events that match the currently displayed month and year
            if (eventDate.getMonth() === displayedMonth && eventDate.getFullYear() === displayedYear) {
              const eventDay = eventDate.getDate();
              const dayCell = calendarContainer.querySelector(`.day[data-day="${eventDay}"]`);
              if (dayCell) {
                // Define color mapping for event types
                const eventTypeColors = {
                  "ELKT": "#ff0000",       // Red
                  "WMKC": "#008000",       // Green
                  "NonPoints": "#ffff00",  // Yellow
                  "Practice": "#ffffff"    // White
                };
                const bgColor = eventTypeColors[event.type] || "#000000";
                // For events with yellow (NonPoints) or white (Practice) backgrounds, use black text
                const textColor = (event.type === "NonPoints" || event.type === "Practice") ? "#000000" : "#ffffff";
                const eventHTML = `<div class="event" style="background-color: ${bgColor}; border: 1px solid ${bgColor}; color: ${textColor};" title="${event.name}">${event.name}</div>`;
                dayCell.innerHTML += eventHTML;
              }
            }
          });
        })
        .catch(error => {
          console.error("Error loading schedule data:", error);
        });
    }
  
    // Navigation button event listeners to update displayed month/year and re-render the calendar
    document.getElementById("prev-month").addEventListener("click", function() {
      displayedMonth--;
      if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
      }
      renderCalendar();
    });
  
    document.getElementById("next-month").addEventListener("click", function() {
      displayedMonth++;
      if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
      }
      renderCalendar();
    });
  
    // Initial render
    renderCalendar();
  });
  