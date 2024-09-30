// Check if 'events' already exists in local storage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Handle event form submission on the "Create Event" page
const eventForm = document.getElementById('eventForm');
if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;

        const newEvent = {
            name: eventName,
            date: eventDate,
            description: eventDescription
        };

        // Add new event to events array and save to local storage
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        alert('Event created successfully!');
        window.location.href = 'view-events.html';  // Redirect to "View Events" page
    });
}

// Display events on the "View Events" page
const eventList = document.getElementById('eventList');
if (eventList) {
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="event-details.html?index=${index}">${event.name} - ${event.date}</a>`;
        eventList.appendChild(li);
    });
}

// Display event details on the "Event Details" page
const urlParams = new URLSearchParams(window.location.search);
const eventIndex = urlParams.get('index');
if (eventIndex !== null && document.getElementById('eventTitle')) {
    const event = events[eventIndex];

    document.getElementById('eventTitle').textContent = event.name;
    document.getElementById('eventDate').textContent = event.date;
    document.getElementById('eventDescription').textContent = event.description;
}

// Handle event registration on the "Register Event" page
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userPhone = document.getElementById('phone').value;

        const registration = {
            name: userName,
            email: userEmail,
            phone: userPhone,
            event: events[eventIndex].name
        };

        let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        registrations.push(registration);
        localStorage.setItem('registrations', JSON.stringify(registrations));

        alert('Registration successful!');
        window.location.href = 'index.html';  // Redirect to home page
    });
}
