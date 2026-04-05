import { useState } from "react";

const BD_LOCATIONS = {
  ঢাকা: ["ঢাকা","নারায়ণগঞ্জ","গাজীপুর","মানিকগঞ্জ","মুন্সীগঞ্জ","নরসিংদী","কিশোরগঞ্জ","টাঙ্গাইল","ফরিদপুর","মাদারীপুর","শরীয়তপুর","গোপালগঞ্জ","রাজবাড়ী"],
  চট্টগ্রাম: ["চট্টগ্রাম","কক্সবাজার","কুমিল্লা","ফেনী","ব্রাহ্মণবাড়িয়া","চাঁদপুর","লক্ষ্মীপুর","নোয়াখালী","বান্দরবান","রাঙ্গামাটি","খাগড়াছড়ি"],
  রাজশাহী: ["রাজশাহী","নাটোর","বগুড়া","চাঁপাইনবাবগঞ্জ","নওগাঁ","জয়পুরহাট","পাবনা","সিরাজগঞ্জ"],
  খুলনা: ["খুলনা","যশোর","সাতক্ষীরা","বাগেরহাট","নড়াইল","মাগুরা","ঝিনাইদহ","মেহেরপুর","কুষ্টিয়া","চুয়াডাঙ্গা"],
  সিলেট: ["সিলেট","মৌলভীবাজার","হবিগঞ্জ","সুনামগঞ্জ"],
  বরিশাল: ["বরিশাল","পটুয়াখালী","ভোলা","পিরোজপুর","ঝালকাঠি","বরগুনা"],
  রংপুর: ["রংপুর","দিনাজপুর","কুড়িগ্রাম","গাইবান্ধা","নীলফামারী","লালমনিরহাট","ঠাকুরগাঁও","পঞ্চগড়"],
  ময়মনসিংহ: ["ময়মনসিংহ","নেত্রকোণা","জামালপুর","শেরপুর"],
};

const selectClass =
  "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4c9e]/30 focus:border-[#1d4c9e] transition disabled:opacity-40 disabled:cursor-not-allowed";

const inputClass =
  "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4c9e]/30 focus:border-[#1d4c9e] transition";

const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ShippingAddress = ({ register, errors, setValue }) => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const districts = division ? BD_LOCATIONS[division] || [] : [];

  const handleDivision = (val) => {
    setDivision(val);
    setDistrict("");

   
    setValue("division", val);
    setValue("district", "");
  };

  const handleDistrict = (val) => {
    setDistrict(val);

   
    setValue("district", val);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <h2 className="text-base font-bold text-gray-900 mb-1">
        ডেলিভারি ঠিকানা
      </h2>
      <p className="text-xs text-gray-400 mb-4">Delivery Address</p>

      <div className="space-y-4">

        {/* Division + District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="বিভাগ (Division)" required error={errors.division?.message}>
            <select
              value={division}
              onChange={(e) => handleDivision(e.target.value)}
              className={selectClass}
            >
              <option value="">বিভাগ বেছে নিন</option>
              {Object.keys(BD_LOCATIONS).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="জেলা (District)" required error={errors.district?.message}>
            <select
              value={district}
              onChange={(e) => handleDistrict(e.target.value)}
              disabled={!division}
              className={selectClass}
            >
              <option value="">জেলা বেছে নিন</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Hidden inputs for react-hook-form */}
        <input type="hidden" {...register("division", { required: "বিভাগ নির্বাচন করুন" })} />
        <input type="hidden" {...register("district", { required: "জেলা নির্বাচন করুন" })} />

        {/* Address */}
        <Field label="বিস্তারিত ঠিকানা" required error={errors.address?.message}>
          <input
            {...register("address", { required: "ঠিকানা লিখুন" })}
            placeholder="বাসা নং, রোড, এলাকা..."
            className={inputClass}
          />
        </Field>

        {/* Postal + Landmark */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="পোস্টাল কোড">
            <input {...register("postalCode")} className={inputClass} />
          </Field>

          <Field label="Landmark">
            <input {...register("landmark")} className={inputClass} />
          </Field>
        </div>

        {/* Note */}
        <Field label="Note">
          <input {...register("note")} className={inputClass} />
        </Field>

        {/* Delivery Time */}
        {/* <Field label="Delivery Time">
          <select {...register("deliveryTime")} className={selectClass}>
            <option value="">যেকোনো সময়</option>
            <option value="সকাল ৯টা - দুপুর ১টা">সকাল ৯টা - দুপুর ১টা</option>
            <option value="দুপুর ১টা - বিকাল ৫টা">দুপুর ১টা - বিকাল ৫টা</option>
            <option value="বিকাল ৫টা - রাত ৯টা">বিকাল ৫টা - রাত ৯টা</option>
          </select>
        </Field> */}

      </div>
    </div>
  );
};

export default ShippingAddress;