import React, { useState } from "react";
import axios from "axios";
import {
  House,
  User,
  Store,
  Layers,
  FolderCog,
  ShoppingCart,
  FileText,
  LogOut,
  Search,
  Bell,
  ShieldQuestionMark,
  Plus,
  Trash2,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";

import Admin from "../assets/admin.png";
import cardboard from "../assets/cardboard.png";
import clothing from "../assets/clothing.png";
import metal from "../assets/metal.png";
import organic from "../assets/organic.png";
import paper from "../assets/paper.png";
import plastic from "../assets/plastic.png";
import wood from "../assets/wood.png";
import glass from "../assets/glass.png";

export default function Vendor() {
  const [categories, setCategories] = useState([
    { name: "Plastic", img: plastic, active: true },
    { name: "Glass", img: glass, active: true },
    { name: "Paper", img: paper, active: true },
    { name: "Organic", img: organic },
    { name: "Metal", img: metal },
    { name: "Clothing", img: clothing },
    { name: "Cardboard", img: cardboard },
    { name: "Wood", img: wood },
  ]);

  const [formData, setFormData] = useState({
    shopName: "",
    gstNumber: "",
    mobileNumber: "",
    altMobile: "",
    email: "",
    subscriptionPackage: "",
    subscriptionType: "",
    discountType: "",
    actualPrice: "",
    discount: "",
    discountedPrice: "",
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    aboutCompany: "",
  });

  const [variants, setVariants] = useState([
    { scrapType: "Plastic", weightFrom: "", weightTo: "", price: "" },
    { scrapType: "Glass", weightFrom: "", weightTo: "", price: "" },
  ]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants,{ scrapType: "", weightFrom: "", weightTo: "", price: "" },
]);
  };

  const removeVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const isVariantFieldInvalid = (variant, field) => {
    return !variant[field] || variant[field].toString().trim() === "";
  };

  const handleSubmit = async () => {
    const activeCategories = categories
      .filter((cat) => cat.active)
      .map((cat) => cat.name);
    const payload = { ...formData, variants, categories: activeCategories };
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        payload
      );
      console.log("Response from API:", response.data);
      alert("Vendor submitted successfully!");
    } catch (error) {
      console.error("Error submitting vendor:", error);
      alert("Failed to submit vendor");
    }
  };

  const isFormValid = () => {
  if (!formData.shopName.trim()) return false;
  if (!formData.gstNumber.trim()) return false;
  if (!formData.mobileNumber.trim()) return false;
  if (!formData.email.trim()) return false;
  for (let variant of variants) {
    if (!variant.scrapType || !variant.weightFrom || !variant.weightTo || !variant.price)
      return false;
  }

  return true;
};


  return (
    <div className="min-h-screen flex bg-[#f4f7fe] font-['Inter']">
      <aside className="w-64 bg-white hidden md:flex flex-col">
        <div className="p-6">
          <button className="px-8 py-2.5 bg-[#f3a83c] text-white rounded-2xl font-bold text-sm">
            Logo
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <SidebarItem icon={House} label="Dashboard" />
          <SidebarItem icon={User} label="Customers" />
          <SidebarItem icon={Store} label="Vendors" active />
          <SidebarItem icon={Layers} label="Categories" />
          <SidebarItem icon={FolderCog} label="Subscriptions" />
          <SidebarItem icon={ShoppingCart} label="Orders" />
          <SidebarItem icon={FileText} label="CMS" />
        </nav>
        <div className="p-4 space-y-1 mb-4">
          <SidebarItem icon={ShieldQuestionMark} label="Help" />
          <SidebarItem icon={LogOut} label="Logout" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white flex items-center justify-between px-4 md:px-8 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-[#1B212D]">Vendor</h1>
          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer" />
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl cursor-pointer">
              <img src={Admin} className="w-8 h-8 rounded-full" alt="admin" />
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-700">
                  Super Admin
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-350 mx-auto">
          <div className="bg-white rounded-4xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#333333] mb-8">
              Add New Vendor
            </h2>
            <FormGrid formData={formData} onChange={handleInputChange} />
            <div className="mt-12">
              <h3 className="text-sm font-bold text-gray-800 mb-6">
                Categories Dealing with
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {categories.map((cat, idx) => (
                  <div 
                  key={idx}
                  onClick={() => {
                  setCategories(categories.map((c, i) =>
                   i === idx ? { ...c, active: !c.active } : c
                 ));
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer aspect-square ${
                cat.active? "border-[#2F98F4] bg-[#f0f7ff]": "border-gray-50 bg-white hover:bg-gray-50"}`}
              >
                <img src={cat.img} alt={cat.name} className="w-10 h-10 mb-2 object-contain" />
                 <span className="text-xs font-bold text-gray-700">{cat.name}</span>
             </div>

                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-4xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-gray-800">
                Follow General Price
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-11 h-6 bg-red-600 rounded-full flex items-center p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-sm font-semibold text-gray-500">No</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 mb-6">
              Pricing Details
            </h3>
            <div className="space-y-6">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="border border-gray-100 rounded-[28px] p-6"
                >
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                    <span className="text-sm font-bold text-gray-700">
                      Variant {index + 1}
                    </span>
                    <button
                      onClick={addVariant}
                      className="bg-[#2F98F4] text-white px-4 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" /> Add Another variant
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-end">
                    <Select
                      label="Scrap type"
                      value={variant.scrapType}
                      onChange={(v) =>
                        handleVariantChange(index, "scrapType", v)
                      }
                      invalid={isVariantFieldInvalid(variant, "scrapType")}
                    />
                    <Input
                      label="Weight range from"
                      value={variant.weightFrom}
                      onChange={(v) =>
                        handleVariantChange(index, "weightFrom", v)
                      }
                      invalid={isVariantFieldInvalid(variant, "weightFrom")}
                    />
                    <Input
                      label="Weight Range To"
                      value={variant.weightTo}
                      onChange={(v) =>
                        handleVariantChange(index, "weightTo", v)
                      }
                      invalid={isVariantFieldInvalid(variant, "weightTo")}
                    />
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Input
                          label="Price"
                          value={variant.price}
                          onChange={(v) =>
                            handleVariantChange(index, "price", v)
                          }
                          invalid={isVariantFieldInvalid(variant, "price")}
                        />
                      </div>
                      <button
                        onClick={() => addVariant()}
                        className="bg-[#2F98F4] p-2.5 rounded-lg text-white shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeVariant(index)}
                        className="bg-red-500 p-2.5 rounded-lg text-white shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button
               type="button"
               onClick={handleSubmit}
               disabled={!isFormValid()}
               className={`w-full md:w-auto px-16 py-3.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                isFormValid()? "bg-[#f3a83c] text-white shadow-orange-100 hover:scale-[1.02]"
               : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"}`}>
                Submit
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl cursor-pointer transition-all ${
        active
          ? "bg-[#2F98F4] text-white shadow-md shadow-blue-200"
          : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      <Icon className="w-4.5 h-4.5" />
      <span className={`text-base ${active ? "font-bold" : "font-semibold"}`}>
        {label}
      </span>
    </div>
  );
}

function Input({ label, value, onChange, invalid }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-bold text-gray-800 mb-0.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
          invalid
            ? "border-red-500 bg-red-50"
            : "border-gray-200 bg-white focus:border-[#2F98F4]"
        }`}
      />
    </div>
  );
}

function Select({ label, value, onChange, invalid }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-bold text-gray-800 mb-0.5">{label}</label>
      <div
        className={`relative rounded-xl border ${
          invalid ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
        }`}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none cursor-pointer ${
            invalid ? "border-red-500 bg-red-50" : ""
          }`}
        >
          <option value="">Select</option>
          {["Plastic","Glass","Paper","Organic","Metal","Clothing","Cardboard","Wood",].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function UploadBox({ label }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold text-gray-800 uppercase">{label}</p>
      <div className="w-32 h-32 rounded-3xl border border-gray-200 bg-white flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-all">
        <div className="flex flex-col items-center">
          <ImageIcon className="w-8 h-8 opacity-20 mb-1" />
          <Plus className="w-4 h-4 opacity-40" />
        </div>
      </div>
    </div>
  );
}

function FormGrid({ formData, onChange }) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6">
        <Input
          label="Shop Name"
          value={formData.shopName}
          onChange={(v) => onChange("shopName", v)}
        />
        <Input
          label="GST Number"
          value={formData.gstNumber}
          onChange={(v) => onChange("gstNumber", v)}
        />
        <Input
          label="Mobile Number"
          value={formData.mobileNumber}
          onChange={(v) => onChange("mobileNumber", v)}
        />
        <Input
          label="Alternate Mobile Number"
          value={formData.altMobile}
          onChange={(v) => onChange("altMobile", v)}
        />
        <Input
          label="Email Id"
          value={formData.email}
          onChange={(v) => onChange("email", v)}
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold text-gray-800">Subscription Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6">
          <Select
            label="Subscription Package"
            value={formData.subscriptionPackage}
            onChange={(v) => onChange("subscriptionPackage", v)}
          />
          <Select
            label="Subscription type"
            value={formData.subscriptionType}
            onChange={(v) => onChange("subscriptionType", v)}
          />
          <Select
            label="Discount type"
            value={formData.discountType}
            onChange={(v) => onChange("discountType", v)}
          />
          <Input
            label="Actual price"
            value={formData.actualPrice}
            onChange={(v) => onChange("actualPrice", v)}
          />
          <Input
            label="Discount"
            value={formData.discount}
            onChange={(v) => onChange("discount", v)}
          />
          <Input
            label="Discounted price"
            value={formData.discountedPrice}
            onChange={(v) => onChange("discountedPrice", v)}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-bold text-gray-800">Address Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-6">
          <Input
            label="Address"
            value={formData.address}
            onChange={(v) => onChange("address", v)}
          />
          <Input
            label="Pincode"
            value={formData.pincode}
            onChange={(v) => onChange("pincode", v)}
          />
          <Select
            label="Country"
            value={formData.country}
            onChange={(v) => onChange("country", v)}
          />
          <Select
            label="State/province"
            value={formData.state}
            onChange={(v) => onChange("state", v)}
          />
          <Select
            label="City/Town"
            value={formData.city}
            onChange={(v) => onChange("city", v)}
          />
          <Input
            label="Landmark"
            value={formData.landmark}
            onChange={(v) => onChange("landmark", v)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-800">About the Company</label>
        <textarea
          value={formData.aboutCompany}
          onChange={(e) => onChange("aboutCompany", e.target.value)}
          className="w-full h-32 p-3.5 rounded-2xl border border-gray-200 text-sm outline-none resize-none focus:border-[#2F98F4]"
        />
      </div>

      <div className="flex gap-6 mt-6 flex-wrap">
        <UploadBox label="Add Shop Logo" />
        <UploadBox label="Add Shop Images" />
      </div>
    </div>
  );
}
