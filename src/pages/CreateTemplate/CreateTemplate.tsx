import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "motion/react";
import {
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Globe,
  Play,
  Apple,
  User,
  Building2,
  Loader2,
} from "lucide-react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  getTemplateData,
  updateTemplateData,
} from "../../features/template/templateApi";
import { toast } from "react-hot-toast";

import BatukLogoGold from "../../assets/logo/BatukLogoGold.avif";
import BestPriceIcon from "../../assets/icons/CreateTemplate/BestPrice.avif";
import BuyAndSellAnytimeIcon from "../../assets/icons/CreateTemplate/BuyandSellAnytime.avif";
import BuyJewelleryIcon from "../../assets/icons/CreateTemplate/BuyJewellery.avif";
import Certified24KPurityIcon from "../../assets/icons/CreateTemplate/Certified24KPurity.avif";
import DigitalGoldIcon from "../../assets/icons/CreateTemplate/DigitalGold.avif";
import DigitalSilverIcon from "../../assets/icons/CreateTemplate/DigitalSilver.avif";
import EasyToPurchaseIcon from "../../assets/icons/CreateTemplate/EasytoPurchase.avif";
import GoldSIPIcon from "../../assets/icons/CreateTemplate/GoldSIP.avif";
import SilverSIPIcon from "../../assets/icons/CreateTemplate/SilverSIP.avif";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const featureIcons = [
  { label: "Certified 24K Purity", src: Certified24KPurityIcon },
  { label: "Best Price", src: BestPriceIcon },
  { label: "Buy and Sell Anytime", src: BuyAndSellAnytimeIcon },
  { label: "Easy to Purchase", src: EasyToPurchaseIcon },
];

const getStartedIcons = [
  { label: "Digital Gold", src: DigitalGoldIcon },
  { label: "Digital Silver", src: DigitalSilverIcon },
  { label: "Buy Jewellery", src: BuyJewelleryIcon },
  { label: "Gold SIP", src: GoldSIPIcon },
  { label: "Silver SIP", src: SilverSIPIcon },
];

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const SectionHeader = ({
  title,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  icon: React.ElementType;
  iconClassName: string;
}) => (
  <div className="px-6 py-2 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
    <div className={`p-2.5 rounded-2xl ${iconClassName}`}>
      <Icon size={20} />
    </div>
    <h3 className="font-semibold text-slate-800">{title}</h3>
  </div>
);

export const CreateTemplate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templateData, loading, error } = useSelector(
    (state: RootState) => state.template,
  );
  const [saving, setSaving] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<{
    logo: File | null;
    photo: File | null;
  }>({
    logo: null,
    photo: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    logo: "",
    photo: "",
    mobile: "",
    email: "",
    address: "",
    companyName: "",
  });

  const logoSrc: string = resolveImageUrl(formData.logo);
  const photoSrc: string = resolveImageUrl(formData.photo);

  useEffect(() => {
    dispatch(getTemplateData());
  }, [dispatch]);

  useEffect(() => {
    if (templateData) {
      setFormData({
        name: templateData.name || "",
        profession: templateData.profession || "",
        logo: templateData.logo || "",
        photo: templateData.photo || "",
        mobile: templateData.mobile || "",
        email: templateData.email || "",
        address: templateData.address || "",
        companyName: templateData.companyName || "",
      });
      setUploadFiles({
        logo: null,
        photo: null,
      });
    }
  }, [templateData]);

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

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: "logo" | "photo",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadFiles((prev) => ({ ...prev, [type]: file }));
      setFormData((prev) => ({ ...prev, [type]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateTemplate = async () => {
    setSaving(true);
    try {
      const formDataToSend = new FormData();

      const textFields: Array<keyof typeof formData> = [
        "name",
        "profession",
        "mobile",
        "email",
        "address",
        "companyName",
      ];

      textFields.forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (uploadFiles.logo) {
        formDataToSend.append("logo", uploadFiles.logo);
      }

      if (uploadFiles.photo) {
        formDataToSend.append("photo", uploadFiles.photo);
      }

      await dispatch(updateTemplateData(formDataToSend));
      await dispatch(getTemplateData());
      toast.success("Template updated successfully!");
    } catch (err: any) {
      // Error handled by Redux state
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Live Preview (Sticky) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 lg:sticky lg:top-28 space-y-4 mb-4 flex flex-col items-center lg:items-start"
        >
          <div className="max-w-md w-full bg-primary rounded-[1rem] overflow-hidden shadow-2xl">
            <div className="p-4 pb-2">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <span className="text-[10px] text-white text-center">
                      YOUR LOGO
                    </span>
                  )}
                </div>
                <div className="flex justify-end">
                  <img
                    src={BatukLogoGold}
                    alt="Batuk logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h6 className="text-white text-sm font-bold uppercase">
                  JOIN US FOR A SMART
                </h6>
                <h1 className="text-yellow-300 text-md font-semibold  uppercase">
                  GOLD & SILVER SAVING
                </h1>
                <h2 className="text-white text-2xl font-extrabold uppercase">
                  WITH BATUK
                </h2>
                <p className="text-yellow-300 text-[11px] font-semibold mt-2">
                  Enjoy Seamless, Secure, and High Quality Gold Savings with
                  Batuk
                </p>
              </div>
            </div>
            <div className="relative px-4 py-2">
              {/* Feature Icons */}
              <div className="grid grid-cols-4 items-start max-w-[250px] mb-4">
                {featureIcons.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-between h-[60px]"
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <p className="text-[7px] text-white text-center leading-tight line-clamp-2 min-h-[16px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="text-white font-semibold text-lg mb-4">
                Get Started Now
              </h3>

              {/* Get Started Icons */}
              <div className="grid grid-cols-5 items-start max-w-[250px]">
                {getStartedIcons.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-between h-[60px]"
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="text-[7px] text-white text-center leading-tight line-clamp-2 min-h-[16px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Profile Image */}
              <div className="absolute right-4 top-7 w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                <img
                  src={
                    photoSrc ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Arpita"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            <div className="bg-white rounded-t-2xl p-4 text-batuk-purple relative">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary p-1 rounded-full text-white w-6 h-6 flex items-center justify-center">
                      <Phone size={12} />
                    </div>
                    <span className="text-sm font-semibold">
                      {formData.mobile}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary p-1 rounded-full text-white w-6 h-6 flex items-center justify-center">
                      <Mail size={12} />
                    </div>
                    <span className="text-sm font-semibold">
                      {formData.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary p-1 rounded-full text-white w-6 h-6 flex items-center justify-center">
                      <MapPin size={12} />
                    </div>
                    <span className="text-sm font-semibold">
                      {formData.address}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="text-md font-semibold">{formData.name}</h4>
                  <p className="text-xs font-semibold text-gray-600">
                    {formData.profession}
                  </p>
                  <p className="text-xs font-semibold text-blue-800">
                    {formData.companyName}
                  </p>
                </div>
              </div>

              <div className="mt-1 pt-2 border-t border-gray-100 flex justify-between items-center">
                {/* Website */}
                <div className="flex items-center gap-1">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <Globe size={10} />
                  </div>

                  <a
                    href="https://www.batuk.gold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm hover:underline"
                  >
                    www.batuk.gold
                  </a>
                </div>

                {/* Store Buttons */}
                <div className="flex gap-2">
                  {/* Google Play */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.batuk.application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-2.5 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-black/10 transition-transform active:scale-95"
                  >
                    <Play size={14} className="fill-current" />
                    <div className="text-left leading-none">
                      <p className="text-[7px] uppercase font-bold text-slate-400">
                        Get it on
                      </p>
                      <p className="text-[9px] font-bold text-white">
                        Google Play
                      </p>
                    </div>
                  </a>

                  {/* App Store */}
                  <a
                    href="https://apps.apple.com/in/app/batuk-digital-gold-silver/id6478106976"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-2.5 py-1.5 rounded-lg flex items-center gap-2 shadow-lg shadow-black/10 transition-transform active:scale-95"
                  >
                    <Apple size={14} />
                    <div className="text-left leading-none">
                      <p className="text-[7px] uppercase font-bold text-slate-400">
                        Download on
                      </p>
                      <p className="text-[9px] font-bold text-white">
                        App Store
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Configuration Form */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section: Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[1rem] border border-primary/5 shadow-sm overflow-hidden"
          >
            <SectionHeader
              title="Brand Assets"
              icon={ImageIcon}
              iconClassName="bg-primary/10 text-primary"
            />

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Upload Logo (Size: w-252 x h-72px)
                </label>
                <div className="relative border-2 border-dashed border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-primary/5 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, "logo")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt="Logo"
                      className="w-20 h-20 object-contain"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-600 text-center">
                        Drag and drop or{" "}
                        <span className="text-primary underline">browse</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase ">
                        PNG, JPG (Max 2MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Upload Photo (Size: w-450 x h-450px)
                </label>
                <div className="relative border-2 border-dashed border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-primary/5 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, "photo")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt="Photo"
                      className="w-20 h-20 object-cover rounded-full"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-600 text-center">
                        Upload your{" "}
                        <span className="text-primary underline">headshot</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase ">
                        Square aspect ratio
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section: Personal Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[1rem] border border-primary/5 shadow-sm overflow-hidden"
          >
            <SectionHeader
              title="Personal Details"
              icon={User}
              iconClassName="bg-blue-500/10 text-blue-500"
            />

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleInputChange}
                size="sm"
              />
              <Input
                label="Profession"
                name="profession"
                placeholder="e.g. Marketing Executive"
                value={formData.profession}
                onChange={handleInputChange}
                size="sm"
              />
              <Input
                label="Mobile Number"
                name="mobile"
                placeholder="+1 (555) 000-0000"
                value={formData.mobile}
                onChange={handleInputChange}
                size="sm"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                size="sm"
              />
            </div>
          </motion.div>

          {/* Section: Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[1rem] border border-primary/5 shadow-sm overflow-hidden"
          >
            <SectionHeader
              title="Company Information"
              icon={Building2}
              iconClassName="bg-purple-500/10 text-purple-500"
            />

            <div className="p-5 space-y-6">
              <Input
                label="Company Name"
                name="companyName"
                placeholder="e.g. Batuk Solutions"
                value={formData.companyName}
                onChange={handleInputChange}
                size="sm"
              />
              <Input
                label="Office Address"
                name="address"
                placeholder="Street, City, State, ZIP"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={3}
                size="sm"
              />
            </div>
          </motion.div>

          {/* Action Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-end gap-4 mb-4"
          >
            <div className="flex gap-4 w-full sm:w-auto">
              <Button
                size="md"
                onClick={handleUpdateTemplate}
                disabled={saving || loading}
                className="flex-1 sm:flex-none py-4 px-6 rounded-2xl font-semibold uppercase  bg-primary shadow-xl shadow-primary/30 transition-transform active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Update Template"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
