// Step 1: Require Express
///const express = require('express');

// Step 2: Initialize the Express app
///const app = express();

// Step 3: Create a simple route
///app.get('/', (req, res) => {
  ///res.send('Welcome to Full Stack Food Ordering App!');
///});

// Step 4: Set the app to listen on port 3000
///app.listen(3000, () => {
  ///console.log('Server is running on port 3000');
///});


// Require Express
const express = require('express');
const app = express();

// Json parsing middleware
app.use(express.json()); // To parse JSON bodies

// Sample profile object
const profile = {
  name: 'Hanjoline Julceus',
  email: 'hjulceus@stetson.edu',
  address: '421 N. Woodland Blvd, DeLand, FL',
};
// storage for profiles
const profiles = [];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Full Stack Food Ordering App!');
});

// API route to get user profile 
//maybe delete
//app.get('/api/profile', (req, res) => {
  //res.json(profile);  // Respond with the profile object as JSON
//});

// get to check for duplicate profiles by email
app.get('/api/profile/:email', (req, res) => {
    const profile = profiles.find(p => p.email === req.params.email);
    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
});

/// Post endpoint to create a new profile

app.post('/profile', (req, res) => {
    const { name, email, address } = req.body;

    // Validate email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the profile with the same email already exists
    const existingProfile = profiles.find(profile => profile.email === email);
    if (existingProfile) {
        return res.status(400).json({ message: 'Profile with this email already exists.' });
    }

    // Validate input
    if (!name || !email || !address) {
        return res.status(400).json({ message: 'All fields are required: name, email, address' });
    }

    // Create new profile
    const newProfile = { name, email, address };

    // Add to in-memory profiles array
    profiles.push(newProfile);

    return res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
});

// Put endpoint to update an existing profile
app.put('/profile/:email', (req, res) => {
    const { email } = req.params;
    const { name, address } = req.body;

    // Find the profile by email
    const profile = profiles.find(p => p.email === email);

    if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
    }

    // Update profile if new data is provided
    if (name) profile.name = name;
    if (address) profile.address = address;

    return res.status(200).json({ message: 'Profile updated successfully', profile });
});

// Server listens on port 3000
// keep port as last in this file!!!!!
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


