// ===============================
// 1. Import Mongoose
// ===============================
const mongoose = require("mongoose");


// ===============================
// 2. MongoDB se Connection
// ===============================
// main() function database se connect karega
main()
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => console.log(err));

// Async function to connect MongoDB
async function main() {
  // test naam ke database se connect hoga
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}


// ===============================
// 3. Schema Banana
// ===============================
// Schema structure define karta hai ki document me kya fields hongi
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  city: String,
});


// ===============================
// 4. Model Banana
// ===============================
// Model = Collection ka reference
// MongoDB me collection ka naam "users" ban jayega
const User = mongoose.model("User", userSchema);



// =====================================================
// 5. CREATE Operations (Data Insert Karna)
// =====================================================

// ---- Single User Insert ----
/*
const user1 = new User({
  name: "Abhishek",
  email: "abhi@gmail.com",
  age: 24,
  city: "Bhopal"
});

user1.save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
*/


// ---- Multiple Users Insert ----
/*
User.insertMany([
  { name: "Tony", email: "tony@gmail.com", age: 24 },
  { name: "Peter", email: "peter@gmail.com", age: 42 },
  { name: "Bruce", email: "bruce@gmail.com", age: 32 },
]).then((res) => {
  console.log(res);
});
*/



// =====================================================
// 6. READ Operations (Data Fetch Karna)
// =====================================================

// ---- Sab users fetch ----
// User.find().then(res => console.log(res));

// ---- Condition ke saath ----
// User.find({ age: { $gt: 25 } }).then(res => console.log(res));

// ---- Ek user find ----
// User.findOne({ age: { $gt: 23 } }).then(res => console.log(res));

// ---- ID se find ----
/*
User.findById("699468340adc2d62bfa1208c")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
*/



// =====================================================
// 7. UPDATE Operations
// =====================================================

// ---- Single Update ----
// User.updateOne({ name: "Abhishek" }, { age: 30 });

// ---- Multiple Update ----
// User.updateMany({ age: { $gt: 29 } }, { age: 20 });

// ---- Find and Update (Updated document return karega) ----
/*
User.findOneAndUpdate(
  { name: "Jay" },
  { age: 18 },
  { new: true }   // updated document return karega
).then((res) => {
  console.log(res);
});
*/


// ---- ID se Update ----
/*
User.findByIdAndUpdate(
  "699468340adc2d62bfa1208c",
  { age: 31 },
  { new: true }
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
*/



// =====================================================
// 8. DELETE Operations
// =====================================================

// ---- Ek document delete ----
// User.deleteOne({ name: "Bruce" }).then(res => console.log(res));

// ---- Multiple delete ----
// User.deleteMany({ age: { $gt: 23 } }).then(res => console.log(res));

// ---- ID se delete (Currently Active) ----
User.findByIdAndDelete("699468340adc2d62bfa1208c")
  .then((res) => {
    console.log("Deleted Document:", res);
  })
  .catch((err) => {
    console.log(err);
  });

