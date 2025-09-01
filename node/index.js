import express from 'express';

const app = express();
const port = 5000;

const users = [
  { name: 'Alice', dob: '2000-02-29' },
  { name: 'Bob', dob: '1990-12-31' },
  { name: 'Charlie', dob: '2005-08-28' },
];

function getAdults(users) {
  const today = new Date();

  // Filter users
  const filteredUsers = users.filter((user) => {
    const birthDate = new Date(user.dob);

    // Get age
    let age = today.getFullYear() - birthDate.getFullYear();

    // Verify birthday
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) {
      age--;
    }

    return age >= 18;
  });

  return filteredUsers;
}

app.get('/', (req, res) => {
  res.json({ message: 'App running' });
});

app.get('/adults', (req, res) => {
  res.json(getAdults(users));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
