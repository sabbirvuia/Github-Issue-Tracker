const d = new Date("2024-03-15T10:30:00Z");
const year = d.getFullYear();
const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 because Jan is 0
const day = String(d.getDate()).padStart(2, '0');

const formatted = `${month}-${day}-${year}`; // "09-03-2026"

console.log(formatted)
// shot cut


const formatted2 = new Date("2024-03-15T10:30:00Z")
  .toLocaleDateString("en-US")
  .replaceAll("/", "-");

  console.log(formatted2)