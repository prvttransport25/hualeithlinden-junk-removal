# Hualeithlinden Junk Removal Services

Professional junk removal services across New York, New Jersey, Pennsylvania, and Connecticut.

## Features

- **Service Areas**: Coverage across all 5 NYC boroughs and surrounding states (NY, PA, NJ, CT)
- **Load-Based Pricing**: Simple pricing structure based on load size (Small, Medium, Large, Extra Large)
- **Online Booking**: Easy-to-use booking form with date, time, and load size selection
- **Photo Gallery**: Showcase before/after photos of completed projects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Admin Dashboard**: Built-in booking management system (localStorage-based)

## Service Areas

### New York
- Manhattan
- Brooklyn
- Queens
- Bronx
- Staten Island

### Other States
- New Jersey (Statewide)
- Pennsylvania (Statewide)
- Connecticut (Statewide)

## Pricing

| Load Size | Capacity | Price Range |
|-----------|----------|-------------|
| Small | 1/4 Truck Bed | $150 - $250 |
| Medium | 1/2 Truck Bed | $300 - $450 |
| Large | Full Truck Bed | $500 - $750 |
| Extra Large | Multiple Trips | $750+ |

*Final pricing determined after site assessment. Additional services may apply.*

## Getting Started

### For Customers
1. Visit the website
2. Fill out the booking form with your details
3. Select your preferred date, time, and load size
4. Describe the items you need removed
5. Submit your request
6. We'll contact you within 24 hours to confirm and finalize pricing

### For Administrators
The site includes a built-in admin dashboard accessible via browser console:

```javascript
// View all bookings
admin.getAllBookings()

// Filter bookings by state
admin.getBookingsByState('NY')

// Filter bookings by date
admin.getBookingsByDate('2024-01-15')

// Generate summary report
admin.generateReport()

// Export bookings to CSV
admin.exportToCSV()

// Confirm a specific booking
admin.confirmBooking(0)

// Delete a booking
admin.deleteBooking(0)
```

## Files

- `index.html` - Main HTML structure
- `styles.css` - Complete styling and responsive design
- `script.js` - Interactive features and admin dashboard
- `README.md` - Documentation

## Deployment

This site is built with pure HTML, CSS, and JavaScript and can be deployed to GitHub Pages.

### To Deploy:
1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select `main` branch as the source
4. Your site will be available at `https://prvttransport25.github.io/hualeithlinden-junk-removal/`

## Features Included

- ✅ Responsive navigation bar
- ✅ Hero section with call-to-action
- ✅ Service area information
- ✅ Load-based pricing calculator
- ✅ Photo gallery
- ✅ Comprehensive booking form
- ✅ Contact information
- ✅ Form validation (phone, zip code)
- ✅ localStorage-based booking system
- ✅ Admin dashboard commands
- ✅ CSV export functionality
- ✅ Mobile-friendly design

## Future Enhancements

Consider adding:
- Integration with a real backend service (Firebase, Supabase, etc.)
- Email notifications using a service like EmailJS
- Real calendar/scheduling system
- Payment processing
- Customer reviews/ratings
- Photo upload for before/after gallery
- SMS notifications

## Contact

**Hualeithlinden Junk Removal**
- Phone: (123) 456-7890
- Email: info@hualeithlinden.com
- Hours: Monday - Saturday, 8 AM - 6 PM

## License

© 2024 Hualeithlinden Junk Removal. All rights reserved.