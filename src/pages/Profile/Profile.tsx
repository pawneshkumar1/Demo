import React, { useState, ChangeEvent, useEffect } from "react";
import {
  BadgeCheck,
  Download,
  Edit,
  User,
  MapPin,
  Landmark,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { Input } from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getProfile, updateProfile } from "../../features/user/userApi";
import { toast } from "react-hot-toast";
import noProfileImage from "../../assets/icons/Profile/no_profile.avif";

type SectionKey = "personal" | "address" | "bank";

export const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const [savingSections, setSavingSections] = useState<
    Record<SectionKey, boolean>
  >({
    personal: false,
    address: false,
    bank: false,
  });

  const [editingSections, setEditingSections] = useState<
    Record<SectionKey, boolean>
  >({
    personal: false,
    address: false,
    bank: false,
  });

  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    dob: "",
    mobile: "",
    aadhar: "",
    email: "",
    gstin: "",
    // Address Details
    address: "",
    city: "",
    state: "",
    pincode: "",
    // Bank Details
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    pan: "",
    // Extra Info
    userName: "",
    registerType: "",
    // Entity & Commission Info
    entityType: "",
    entityIdNo: "",
    entityName: "",
    companyAddress: "",
    commission: "",
    mmtcCommission: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const isEntity = profile.registerType === "entity";

      setFormData({
        fullName: isEntity ? profile.authpersonName || "" : profile.name || "",
        dob: profile.dob || "",
        mobile: profile.mobileNo || "",
        aadhar: profile.aadharNo || "",
        email: isEntity ? profile.Entityemail || "" : profile.email || "",
        address: profile.Address || "",
        city: profile.city || "",
        state: profile.state || "",
        pincode: profile.pincode || "",
        accountHolder: profile.accHoldername || "",
        accountNumber: profile.accNo || "",
        ifsc: profile.Ifsccode || "",
        pan: profile.panNo || "",
        gstin: profile.Gstin || "",
        userName: profile.userName || "",
        registerType: profile.registerType || "Individual",
        entityType: profile.EntityType || "N/A",
        entityIdNo: profile.EntityidentificationNo || "N/A",
        entityName: profile.Entityname || "",
        companyAddress: profile.companyAddress || "",
        commission: profile.commission_per || "0",
        mmtcCommission: profile.mmtc_commission_per || "0",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (section: SectionKey) => {
    setEditingSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const buildProfilePayload = () => {
    const isEntity = profile?.registerType === "entity";

    return {
      name: isEntity ? undefined : formData.fullName,
      email: isEntity ? undefined : formData.email,
      Entityemail: isEntity ? formData.email : undefined,
      Entityname: isEntity ? formData.entityName : undefined,
      mobileNo: formData.mobile,
      city: formData.city,
      state: formData.state,
      Address: formData.address,
      companyAddress: isEntity ? formData.companyAddress : undefined,
      panNo: formData.pan,
      aadharNo: formData.aadhar || null,
      accHoldername: formData.accountHolder || null,
      accNo: formData.accountNumber || null,
      Ifsccode: formData.ifsc || null,
      dob: formData.dob,
      userName: formData.userName,
      Gstin: isEntity ? formData.gstin || null : profile?.Gstin || null,
      pincode: formData.pincode,
    };
  };

  const handleSave = async (section: SectionKey) => {
    setSavingSections((prev) => ({ ...prev, [section]: true }));
    try {
      const payload = buildProfilePayload();

      await dispatch(updateProfile(payload));
      toast.success(
        `${section.charAt(0).toUpperCase() + section.slice(1)} details updated!`,
      );
      setEditingSections((prev) => ({ ...prev, [section]: false }));
    } catch (err: any) {
      // Error handled by Redux state and useEffect
    } finally {
      setSavingSections((prev) => ({ ...prev, [section]: false }));
    }
  };

  const handleCancel = (section: SectionKey) => {
    setEditingSections((prev) => ({ ...prev, [section]: false }));
    // Revert logic: profile handle will update formData via useEffect
    if (profile) {
      // Manual revert if needed, but the object reference change in Slice will trigger useEffect
    }
  };

  const SectionHeader = ({
    title,
    icon: Icon,
    sectionKey,
    isViewOnly = true,
  }: {
    title: string;
    icon: any;
    sectionKey?: SectionKey;
    isViewOnly?: boolean;
  }) => (
    <div className="px-4 py-2 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="text-primary" size={20} />
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      {!isViewOnly && sectionKey && (
        <>
          {!editingSections[sectionKey] ? (
            <button
              onClick={() => toggleEdit(sectionKey)}
              className="text-primary transition-all duration-300 flex items-center gap-2 text-xs font-semibold cursor-pointer"
            >
              <Edit size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <button
                onClick={() => handleCancel(sectionKey)}
                className="text-slate-600 transition-all duration-300 flex items-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => handleSave(sectionKey)}
                disabled={savingSections[sectionKey]}
                className="text-primary transition-all duration-300 flex items-center gap-2 text-xs font-bold disabled:opacity-50 cursor-pointer"
              >
                {savingSections[sectionKey] ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 w-full mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: User Overview */}
        <div className="lg:col-span-4 space-y-4">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                  alt={`${formData.fullName} Profile`}
                  src={noProfileImage}
                />
                <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-4 border-white">
                  <BadgeCheck size={16} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {formData.fullName || "User"}
              </h2>
              <p className="text-slate-600 font-medium">
                Username: {formData.userName || "N/A"}
              </p>
              <div className="mt-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase ">
                {formData.registerType}
              </div>
            </div>
          </motion.div>

          {/* Identification & Commissions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <SectionHeader
              title="Identity & Referrals"
              icon={BadgeCheck}
              isViewOnly
            />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-600 ">
                  Entity Type
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {formData.registerType}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-600 ">
                  Augmont Commission
                </span>
                <span className="text-sm font-semibold text-primary">
                  {formData.commission}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-600 ">
                  MMTC Commission
                </span>
                <span className="text-sm font-semibold text-primary">
                  {formData.mmtcCommission}%
                </span>
              </div>
              {formData.registerType !== "individual" && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-600 ">
                      Entity ID
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formData.entityIdNo}
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Details Forms */}
        <div className="lg:col-span-8 space-y-4">
          {/* Personal Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <SectionHeader
              title="Personal Details"
              icon={User}
              sectionKey="personal"
            />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.registerType === "entity" ? (
                <>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label={
                          formData.registerType === "entity"
                            ? "Authorised Person Name"
                            : "Name"
                        }
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          {formData.registerType === "entity"
                            ? "Authorised Person Name"
                            : "Name"}
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.fullName}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Entity ID No."
                        name="entityIdNo"
                        value={formData.entityIdNo}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Entity ID No.
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.entityIdNo}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Mobile No."
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Mobile No.
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.mobile}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="GSTIN"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          GSTIN
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.gstin || "N/A"}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Email
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.email}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Company Name"
                        name="entityName"
                        value={formData.entityName}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Company Name
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.entityName || "N/A"}
                        </p>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Full Name
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.fullName}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Date of Birth"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Date of Birth
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.dob}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Mobile Number
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.mobile}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Aadhar Number"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Aadhar Number
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.aadhar}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    {editingSections.personal ? (
                      <Input
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        size="sm"
                      />
                    ) : (
                      <>
                        <label className="text-xs font-bold text-slate-600 uppercase ">
                          Email Address
                        </label>
                        <p className="text-slate-900 text-[14px]">
                          {formData.email}
                        </p>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Address Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <SectionHeader
              title="Address Details"
              icon={MapPin}
              sectionKey="address"
            />
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3 space-y-1">
                {formData.registerType === "entity" ? (
                  editingSections.address ? (
                    <Input
                      label="Company Address"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      size="sm"
                    />
                  ) : (
                    <>
                      <label className="text-xs font-bold text-slate-600 uppercase ">
                        Company Address
                      </label>
                      <p className="text-slate-900 text-[14px]">
                        {formData.companyAddress || "N/A"}
                      </p>
                    </>
                  )
                ) : editingSections.address ? (
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      Address
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.address}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.address ? (
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      City
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.city}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.address ? (
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      State
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.state}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.address ? (
                  <Input
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      Pincode
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.pincode}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Bank Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <SectionHeader
              title="Bank Details"
              icon={Landmark}
              sectionKey="bank"
              isViewOnly={!!profile?.accNo}
            />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                {editingSections.bank ? (
                  <Input
                    label="Account Holder Name"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      Account Holder Name
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.accountHolder}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.bank ? (
                  <Input
                    label="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      Account Number
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.accountNumber}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.bank ? (
                  <Input
                    label="IFSC Code"
                    name="ifsc"
                    value={formData.ifsc}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      IFSC Code
                    </label>
                    <p className="text-slate-900 text-[14px]">
                      {formData.ifsc}
                    </p>
                  </>
                )}
              </div>
              <div className="space-y-1">
                {editingSections.bank ? (
                  <Input
                    label="PAN Number"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    size="sm"
                  />
                ) : (
                  <>
                    <label className="text-xs font-bold text-slate-600 uppercase ">
                      PAN Number
                    </label>
                    <p className="text-slate-900 text-[14px]">{formData.pan}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
