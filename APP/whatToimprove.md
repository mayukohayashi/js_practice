# Implement

## API
### restriction that users can only review a tour that they have actually booked
### nested booking routes: /tours/:id/booking and /users/:id/bookings
### improve tour dates
  add a participants and soldOut field to each date.
  A date then becomes like an instance of the tour.
  Then, when a user books, they need to select one of the dates.
  A new booking will increase number of participants in the date, until it is booked out.
  (participants > maxGroupSize)
  so when a user want to book, you need to check if tour on the selected date is still available
## advanced authentication features:
  confirm user email, keep users logged in with refresh tokens, two-factors authentication etc...

## WEB
### sign up form: similar to the login form
### tour detail page, if a user has taken a tour, allow them add a review directly on the website.
  impleent a form for this
### hide the entire booking section on the tour detail pafe if current user has already booked the tour(also prevent dupulicate booking on the model)
### implement "like tour" functionalu with favorite tour page
### On the user account page, impleent the "My reviews" page where all reviews are displayed and a user can edit them
  (if knoe React or so this would be an amazing way to use API and train)
### for administraors, impleent all the "Manage" pages, where they can CRUD tours, users, reviews and bookings