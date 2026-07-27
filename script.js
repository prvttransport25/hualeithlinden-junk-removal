// Load Size Selection
function selectLoad(size) {
    const radio = document.getElementById(size);
    radio.checked = true;
}

// Booking Form Submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        zip: document.getElementById('zip').value,
        state: document.getElementById('state').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        load: document.getElementById('load').value,
        description: document.getElementById('description').value,
        address: document.getElementById('address').value,
        timestamp: new Date().toISOString()
    };

    // Validate service area (basic check)
    const validStates = ['NY', 'NJ', 'PA', 'CT'];
    if (!validStates.includes(formData.state)) {
        alert('We currently serve NY, NJ, PA, and CT only.');
        return;
    }

    // Save to localStorage (for admin dashboard)
    saveBooking(formData);

    // Show success message
    alert('Thank you for your booking request! We will contact you within 24 hours at ' + formData.phone + ' to confirm and finalize pricing.');
    
    // Reset form
    this.reset();

    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Save booking to localStorage
function saveBooking(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    console.log('Booking saved:', bookingData);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Set minimum date to today
document.getElementById('date').addEventListener('load', setMinDate);
window.addEventListener('DOMContentLoaded', setMinDate);

function setMinDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Validate zip code format
document.getElementById('zip').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
});

// Validate phone number
document.getElementById('phone').addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    if (value.length >= 6) {
        this.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        this.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
        this.value = value;
    }
});

// Simple Admin Dashboard (accessible via console or separate page)
class AdminDashboard {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    }

    getAllBookings() {
        return this.bookings;
    }

    getBookingsByState(state) {
        return this.bookings.filter(b => b.state === state);
    }

    getBookingsByDate(date) {
        return this.bookings.filter(b => b.date === date);
    }

    getBookingsByLoad(load) {
        return this.bookings.filter(b => b.load === load);
    }

    getPendingBookings() {
        return this.bookings.filter(b => !b.confirmed);
    }

    confirmBooking(index) {
        if (this.bookings[index]) {
            this.bookings[index].confirmed = true;
            this.bookings[index].confirmedAt = new Date().toISOString();
            localStorage.setItem('bookings', JSON.stringify(this.bookings));
            console.log('Booking confirmed:', this.bookings[index]);
        }
    }

    deleteBooking(index) {
        this.bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
        console.log('Booking deleted');
    }

    generateReport() {
        return {
            totalBookings: this.bookings.length,
            byState: this.groupByProperty('state'),
            byLoadSize: this.groupByProperty('load'),
            confirmedCount: this.bookings.filter(b => b.confirmed).length,
            pendingCount: this.bookings.filter(b => !b.confirmed).length
        };
    }

    groupByProperty(property) {
        return this.bookings.reduce((acc, booking) => {
            const key = booking[property];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }

    exportToCSV() {
        if (this.bookings.length === 0) {
            console.log('No bookings to export');
            return;
        }

        const headers = Object.keys(this.bookings[0]);
        const csvContent = [
            headers.join(','),
            ...this.bookings.map(booking => 
                headers.map(header => {
                    const value = booking[header];
                    return typeof value === 'string' && value.includes(',') 
                        ? `"${value}"` 
                        : value;
                }).join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize admin dashboard
const admin = new AdminDashboard();

// Console commands for admin
console.log('%c=== Hualeithlinden Admin Dashboard ===', 'color: #2c5aa0; font-size: 16px; font-weight: bold;');
console.log('Use the following commands:');
console.log('admin.getAllBookings() - View all bookings');
console.log('admin.getBookingsByState("NY") - Filter by state');
console.log('admin.getBookingsByDate("2024-01-15") - Filter by date');
console.log('admin.generateReport() - Generate summary report');
console.log('admin.exportToCSV() - Download bookings as CSV');
console.log('admin.confirmBooking(index) - Confirm a booking');
console.log('admin.deleteBooking(index) - Delete a booking');