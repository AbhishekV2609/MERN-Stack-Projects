import { useState } from "react";
import ProfileSidebar from "../../components/Profile/ProfileSidebar.jsx";
import ProfileInfo from "../../components/Profile/ProfileInfo.jsx";
import AddressManager from "../../components/Profile/AddressManager.jsx";
import OrderHistory from "../../components/Profile/OrderHistory.jsx";
import Settings from "../../components/Profile/Settings.jsx";
import Pro from "./Profile.module.css";
import HelpSupport from "../../components/Profile/HelpSupport.jsx";
import Wishlist from "../../pages/cartpages/Wishlist.jsx"
import Dashboard from "../../components/Profile/Dashboard.jsx"
import userData from "../../utils/UserInfo.js";
import ProductForm from "../../components/Profile/ProductForm.jsx";

function Profile({ wishlist, removeFromWishlist }) {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className={Pro["profile-container"]}>
      <ProfileSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
     <main className={Pro["profile-main"]}>
        {
          activeSection === "profile" ? (
            <ProfileInfo />
          ) : activeSection === "addresses" ? (
            <AddressManager />
          ) : activeSection === "orders" ? (
            <OrderHistory />
          ) : activeSection === "wishlist" ? (
            <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : activeSection === "help" ? (
            <HelpSupport />
          ) : activeSection === "dashboard" ? (
            <Dashboard user={userData}/>
          ) : activeSection === "productform" ? (
            <ProductForm />
          ):
          (
            <ProfileInfo />
          )
        }
      </main> 
    </div>
  );
}

export default Profile;
