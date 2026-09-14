// =======================================
// 1. Mongoose Import
// =======================================
const mongoose = require("mongoose");


// =======================================
// 2. MongoDB Connection
// =======================================
// amazon database se connect ho raha hai
main()
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

// =======================================
// 3. Book Schema with Validations
// =======================================
// Schema me fields + validation rules define kiye gaye hain
const bookSchema = new mongoose.Schema({

  // ---- Title Field ----
  title: {
    type: String,
    required: true,      // Title dena mandatory hai
    maxlength: 20        // Max 20 characters allowed
  },

  // ---- Author Field ----
  author: {
    type: String
  },

  // ---- Price Field ----
  price: {
    type: Number,
    min: [1, "Price must be greater than 0"],  
    // Price 1 se kam hua to error message aayega
  },

  // ---- Discount Field ----
  discount: {
    type: Number,
    default: 0    // Agar value nahi di to 0 set ho jayega
  },

  // ---- Category Field ----
  category: {
    type: String,
    enum: ["Fiction", "Non-Fiction"]  
    // Sirf ye 2 values allowed hain
  },

  // ---- Genre Field (Array of Strings) ----
  genre: [String]

});

// =======================================
// 4. Model Banana
// =======================================
const Book = mongoose.model("Book", bookSchema);

// =======================================
// 5. Update Operation with Validation
// =======================================

// Yaha hum book ko update kar rahe hain ID se
Book.findByIdAndUpdate(
  "6995a5077936b9c4e616132e",
  { 
    price: -200,    // Invalid value (min rule break karega)
    discount: 10 
  },
  { runValidators: true }   // IMPORTANT: Update me validation chalane ke liye
)
.then((res) => {
  console.log(res);   // Old document return karega by default
})
.catch((err) => {
  // Custom validation error message print
  console.log(err.errors.price.properties.message);
});
// =======================================
// 6. Create New Book (Commented Example)
// =======================================
/*
let book1 = new Book({
  title: "Mathematics XII",
  author: "R.D. Sharma",
  price: 500,
  category: "Non-Fiction",
  genre: ["Education", "Mathematics"]
});

book1.save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
*/
