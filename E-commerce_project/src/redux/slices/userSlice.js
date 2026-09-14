import { createSlice } from "@reduxjs/toolkit";

// ✅ Default User Structure
const defaultUserData = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  profileImage: "",
  dateOfBirth: "",
  gender: "",
  joinedDate: new Date().toISOString().split("T")[0],

  addresses: [],

  cart: [],

  wishlist: [],

  orders: [],

  paymentMethods: [],

  settings: {
    language: "English",
    currency: "INR",
    darkMode: false,
  },
};

// ✅ Load User From LocalStorage
let initialUserData = defaultUserData;

try {
  const storedUser = localStorage.getItem("user");

  initialUserData = storedUser
    ? JSON.parse(storedUser)
    : defaultUserData;
} catch (error) {
  localStorage.removeItem("user");

  initialUserData = defaultUserData;
}

// ✅ Save User To LocalStorage
const saveUserToLocalStorage = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

const userSlice = createSlice({
  name: "user",

  initialState: {
    data: initialUserData,
    loading: false,
    error: null,
  },

  reducers: {
    // ✅ Set Logged In User
    setUser: (state, action) => {
      state.data = action.payload;

      saveUserToLocalStorage(state.data);
    },

    // ✅ Update Profile
    updateProfile: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };

      saveUserToLocalStorage(state.data);
    },

    // ✅ Delete Profile
    deleteProfile: (state) => {
      state.data = defaultUserData;

      localStorage.removeItem("user");
    },

    // ✅ Logout User
    logoutUser: (state) => {
      state.data = defaultUserData;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    // ✅ Update Address
    updateAddress: (state, action) => {
      const { addressId, updatedAddress } = action.payload;

      const addressIndex = state.data.addresses.findIndex(
        (addr) => addr.addressId === addressId
      );

      if (addressIndex !== -1) {
        state.data.addresses[addressIndex] = {
          ...state.data.addresses[addressIndex],
          ...updatedAddress,
        };

        saveUserToLocalStorage(state.data);
      }
    },

    // ✅ Add Address
    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        addressId: Date.now(),
      };

      state.data.addresses.push(newAddress);

      saveUserToLocalStorage(state.data);
    },

    // ✅ Delete Address
    deleteAddress: (state, action) => {
      state.data.addresses = state.data.addresses.filter(
        (addr) => addr.addressId !== action.payload
      );

      saveUserToLocalStorage(state.data);
    },

    // ✅ Update Settings
    updateSettings: (state, action) => {
      state.data.settings = {
        ...state.data.settings,
        ...action.payload,
      };

      saveUserToLocalStorage(state.data);
    },

    // ✅ Add To Cart
    addToCart: (state, action) => {
      const existingProduct = state.data.cart.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.data.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveUserToLocalStorage(state.data);
    },

    // ✅ Remove From Cart
    removeFromCart: (state, action) => {
      state.data.cart = state.data.cart.filter(
        (item) => item.productId !== action.payload
      );

      saveUserToLocalStorage(state.data);
    },

    // ✅ Add To Wishlist
    addToWishlist: (state, action) => {
      const alreadyExists = state.data.wishlist.find(
        (item) => item.productId === action.payload.productId
      );

      if (!alreadyExists) {
        state.data.wishlist.push(action.payload);
      }

      saveUserToLocalStorage(state.data);
    },

    // ✅ Remove From Wishlist
    removeFromWishlist: (state, action) => {
      state.data.wishlist = state.data.wishlist.filter(
        (item) => item.productId !== action.payload
      );

      saveUserToLocalStorage(state.data);
    },

    // ✅ Add Payment Method
    addPaymentMethod: (state, action) => {
      state.data.paymentMethods.push({
        ...action.payload,
        paymentId: Date.now(),
      });

      saveUserToLocalStorage(state.data);
    },

    // ✅ Update Payment Method
    updatePaymentMethod: (state, action) => {
      const { paymentId, updatedPayment } = action.payload;

      const paymentIndex = state.data.paymentMethods.findIndex(
        (payment) => payment.paymentId === paymentId
      );

      if (paymentIndex !== -1) {
        state.data.paymentMethods[paymentIndex] = {
          ...state.data.paymentMethods[paymentIndex],
          ...updatedPayment,
        };

        saveUserToLocalStorage(state.data);
      }
    },

    // ✅ Delete Payment Method
    deletePaymentMethod: (state, action) => {
      state.data.paymentMethods =
        state.data.paymentMethods.filter(
          (payment) => payment.paymentId !== action.payload
        );

      saveUserToLocalStorage(state.data);
    },

    // ✅ Add Order
    addOrder: (state, action) => {
      state.data.orders.push(action.payload);

      // Optional: Clear Cart
      state.data.cart = [];

      saveUserToLocalStorage(state.data);
    },
  },
});

export const {
  setUser,
  updateProfile,
  deleteProfile,
  logoutUser,

  updateAddress,
  addAddress,
  deleteAddress,

  updateSettings,

  addToCart,
  removeFromCart,

  addToWishlist,
  removeFromWishlist,

  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,

  addOrder,
} = userSlice.actions;

export default userSlice.reducer;