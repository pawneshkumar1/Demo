import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/user/userApi";
import {
  fetchHeaderPrices,
  fetchQrCode,
} from "../../features/header/headerApi";
import { logoutUser } from "../../features/auth/authApi";
import type { RootState, AppDispatch } from "../../redux/store";
import BatukLogoGold from "../../assets/logo/BatukLogoGold.avif";
import AugmontLogo from "../../assets/logo/Augmont_Logo.avif";
import MMTCLogo from "../../assets/logo/MMTC_Logo.avif";
import noProfileImage from "../../assets/icons/Profile/no_profile.avif";
import {
  Menu,
  HelpCircle,
  User,
  Lock,
  LogOut,
  ChevronDown,
  LayoutGrid,
  QrCode,
  Download,
  X,
  TrendingUp,
  TrendingDown,
  MessageCircleQuestionMark,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { toast } from "react-hot-toast";
import supportIcon from "../../assets/support/supportIcon.svg";
import { DraggableChat } from "../DraggableChat";

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  onCollapseToggle: () => void;
}

const getProviderBranding = (provider?: string) => {
  const normalized = (provider || "").trim().toLowerCase();

  if (normalized.includes("augmont")) {
    return {
      logo: AugmontLogo,
      alt: "Augmont",
      className: "h-4 w-auto brightness-0 invert",
    };
  }

  if (normalized.includes("mmtc")) {
    return {
      logo: MMTCLogo,
      alt: "MMTC-PAMP",
      className: "h-5 w-auto brightness-0 invert",
    };
  }

  return null;
};

export const Header: React.FC<HeaderProps> = ({
  setIsSidebarOpen,
  onCollapseToggle,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [priceIndex, setPriceIndex] = useState(0);
  const hasRequestedProfile = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { prices, pricesError, qrCodeUrl, qrLoading, qrError } = useSelector(
    (state: RootState) => state.header,
  );
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setIsProfileOpen(false);
    navigate("/");
  };

  const currentPriceItems = prices;
  const currentPrices =
    currentPriceItems.length > 0
      ? currentPriceItems[priceIndex % currentPriceItems.length]
      : null;
  const providerBranding = getProviderBranding(currentPrices?.provider);

  useEffect(() => {
    if (currentPriceItems.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setPriceIndex((prev) => (prev + 1) % currentPriceItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentPriceItems.length]);

  useEffect(() => {
    if (!hasRequestedProfile.current && !profile && !profileLoading) {
      hasRequestedProfile.current = true;
      dispatch(getProfile());
    }
  }, [dispatch, profile, profileLoading]);

  useEffect(() => {
    dispatch(fetchHeaderPrices());
    const intervalId = window.setInterval(() => {
      dispatch(fetchHeaderPrices());
    }, 180000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isQrOpen || !profile?.userName) {
      return;
    }

    console.log("Fetching QR code for partnerUsername:", profile.userName);
    dispatch(fetchQrCode(profile.userName));
  }, [isQrOpen, profile?.userName]);

  useEffect(() => {
    if (isQrOpen) {
      console.log("QR state:", {
        qrCodeUrl,
        qrLoading,
        qrError,
        partnerUsername: profile?.userName,
      });
    }
  }, [isQrOpen, qrCodeUrl, qrLoading, qrError, profile?.userName]);

  // Tawk.to Visitor Attributes Sync
  useEffect(() => {
    const tawk = (window as any).Tawk_API;
    if (tawk && profile && tawk.setAttributes) {
      tawk.setAttributes(
        {
          name: profile.name || profile.authpersonName,
          email: profile.email || "",
          mobile: profile.mobileNo || "",
          partnerCode: profile.userName || "",
        },
        (error: any) => {
          if (error) console.log("Tawk.to attributes sync error:", error);
        },
      );
    }
  }, [profile]);

  // ==========================================
  // MAIN CARD SIZE
  // ==========================================

  const CARD_WIDTH = 900;
  const CARD_HEIGHT = 1400;

  // ==========================================
  // LOGO SIZE
  // ==========================================

  const LOGO_WIDTH = 550;
  const LOGO_HEIGHT = 180;

  // ==========================================
  // LOGO POSITION
  // ==========================================

  const LOGO_X = CARD_WIDTH / 2 - LOGO_WIDTH / 2;
  const LOGO_Y = 35;

  // ==========================================
  // QR SIZE
  // ==========================================

  const QR_WIDTH = 600;
  const QR_HEIGHT = 600;

  // ==========================================
  // QR POSITION
  // ==========================================

  const QR_X = 150;
  const QR_Y = 440;

  const handleDownloadQr = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const image = new Image();
      const logo = new Image();

      image.crossOrigin = "anonymous";
      logo.crossOrigin = "anonymous";

      logo.src = BatukLogoGold;

      logo.onload = () => {
        image.onload = () => {
          const canvas = document.createElement("canvas");

          // ==========================================
          // CARD WIDTH & HEIGHT
          // ==========================================

          canvas.width = CARD_WIDTH;
          canvas.height = CARD_HEIGHT;

          const context = canvas.getContext("2d");

          if (!context) {
            window.open(qrCodeUrl, "_blank", "noopener,noreferrer");
            return;
          }

          // ==========================================
          // HELPERS
          // ==========================================

          const drawRoundedRect = (
            x: number,
            y: number,
            width: number,
            height: number,
            radius: number,
            fillStyle: string,
          ) => {
            context.beginPath();

            context.moveTo(x + radius, y);

            context.lineTo(x + width - radius, y);

            context.quadraticCurveTo(x + width, y, x + width, y + radius);

            context.lineTo(x + width, y + height - radius);

            context.quadraticCurveTo(
              x + width,
              y + height,
              x + width - radius,
              y + height,
            );

            context.lineTo(x + radius, y + height);

            context.quadraticCurveTo(x, y + height, x, y + height - radius);

            context.lineTo(x, y + radius);

            context.quadraticCurveTo(x, y, x + radius, y);

            context.closePath();

            context.fillStyle = fillStyle;
            context.fill();
          };

          const drawCenteredText = (
            text: string,
            y: number,
            font: string,
            color: string,
          ) => {
            context.font = font;
            context.fillStyle = color;
            context.textAlign = "center";

            context.fillText(text, canvas.width / 2, y);
          };

          // ==========================================
          // BACKGROUND
          // ==========================================

          context.fillStyle = "#5F259F";

          context.fillRect(0, 0, canvas.width, canvas.height);

          // ==========================================
          // TOP WHITE CURVE
          // ==========================================

          context.beginPath();

          context.moveTo(0, 0);

          context.lineTo(canvas.width, 0);

          context.lineTo(canvas.width, 270);

          context.quadraticCurveTo(canvas.width / 2, 330, 0, 270);

          context.closePath();

          context.fillStyle = "#ffffff";

          context.fill();

          // ==========================================
          // BATUK LOGO
          // ==========================================

          context.drawImage(logo, LOGO_X, LOGO_Y, LOGO_WIDTH, LOGO_HEIGHT);

          // ==========================================
          // QR FRAME
          // SAME SIZE AS QR
          // ==========================================

          const QR_FRAME_PADDING = 25;

          drawRoundedRect(
            QR_X - QR_FRAME_PADDING,
            QR_Y - QR_FRAME_PADDING,
            QR_WIDTH + QR_FRAME_PADDING * 2,
            QR_HEIGHT + QR_FRAME_PADDING * 2,
            35,
            "#ffffff",
          );

          // ==========================================
          // INNER QR FRAME
          // ==========================================

          drawRoundedRect(
            QR_X - 10,
            QR_Y - 10,
            QR_WIDTH + 20,
            QR_HEIGHT + 20,
            25,
            "#f8fafc",
          );

          // ==========================================
          // QR IMAGE
          // ==========================================

          context.drawImage(image, QR_X, QR_Y, QR_WIDTH, QR_HEIGHT);

          // ==========================================
          // USER NAME BELOW QR
          // ==========================================

          drawCenteredText(
            (profile?.name || profile?.authpersonName).toUpperCase(),
            QR_Y + QR_HEIGHT + 120,
            "bold 58px Arial",
            "#ffffff",
          );

          // ==========================================
          // MOBILE NUMBER
          // ==========================================

          drawCenteredText(
            profile?.mobileNo || "",
            QR_Y + QR_HEIGHT + 190,
            "bold 46px Arial",
            "#ffffff",
          );

          // ==========================================
          // USER CODE BADGE
          // ==========================================

          const badgeY = QR_Y + QR_HEIGHT + 250;

          drawRoundedRect(CARD_WIDTH / 2 - 195, badgeY, 390, 70, 40, "#ffffff");

          drawCenteredText(
            `CODE : ${profile?.userName || "PK001"}`,
            badgeY + 47,
            "bold 28px Arial",
            "#5F259F",
          );

          // ==========================================
          // DOWNLOAD IMAGE
          // ==========================================

          canvas.toBlob((pngBlob) => {
            if (!pngBlob) {
              window.open(qrCodeUrl, "_blank", "noopener,noreferrer");

              URL.revokeObjectURL(objectUrl);

              return;
            }

            const pngUrl = URL.createObjectURL(pngBlob);

            const link = document.createElement("a");

            link.href = pngUrl;

            link.download = `${profile?.name || profile?.authpersonName}-qr-card.png`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(pngUrl);
            URL.revokeObjectURL(objectUrl);
          }, "image/png");
        };

        image.onerror = () => {
          URL.revokeObjectURL(objectUrl);

          window.open(qrCodeUrl, "_blank", "noopener,noreferrer");
        };

        image.src = objectUrl;
      };

      logo.onerror = () => {
        window.open(qrCodeUrl, "_blank", "noopener,noreferrer");
      };
    } catch (error) {
      console.error(error);

      window.open(qrCodeUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Click outside to close backdrop */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-[40] bg-transparent"
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      <header className="sticky top-0 z-[50] bg-primary backdrop-blur-md border-b border-primary/20 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-white/80 hover:bg-white/10 rounded-xl transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={onCollapseToggle}
            className="hidden lg:flex p-2 text-white/80 hover:bg-white/10 rounded-xl transition-all order-first"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 bg-white/10 rounded-full px-4 py-1.5 overflow-hidden whitespace-nowrap hidden sm:flex h-9 relative w-full">
            <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase  shrink-0 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>{" "}
              Live
            </div>
            <div className="h-3 w-px bg-white/20 shrink-0 z-10"></div>

            <div className="relative flex-grow h-full min-w-[280px]">
              <AnimatePresence mode="wait">
                {currentPrices ? (
                  <motion.div
                    key={priceIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center gap-4 h-full absolute inset-0"
                  >
                    <span className="flex items-center justify-center min-w-[72px] h-6 px-2">
                      {providerBranding ? (
                        <img
                          src={providerBranding.logo}
                          alt={providerBranding.alt}
                          className={providerBranding.className}
                        />
                      ) : (
                        <span className="text-[9px] font-black text-white uppercase ">
                          {currentPrices.provider}
                        </span>
                      )}
                    </span>
                    <div className="flex gap-6 items-center text-xs font-bold">
                      <span className="text-white/80 flex items-center gap-1">
                        Gold:{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                          ₹{currentPrices.gold}/g
                        </span>
                        {currentPrices.goldTrend &&
                          currentPrices.goldTrend.direction !== "none" && (
                            <span
                              className={cn(
                                "flex items-center text-[10px]",
                                currentPrices.goldTrend.direction === "up"
                                  ? "text-green-400"
                                  : "text-red-400",
                              )}
                            >
                              {currentPrices.goldTrend.direction === "up" ? (
                                <TrendingUp size={10} className="mr-0.5" />
                              ) : (
                                <TrendingDown size={10} className="mr-0.5" />
                              )}
                              {Math.abs(
                                parseFloat(currentPrices.goldTrend.change),
                              ).toFixed(2)}
                              %
                            </span>
                          )}
                      </span>
                      <span className="text-white/80 hidden md:flex items-center gap-1">
                        Silver:{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                          ₹{currentPrices.silver}/g
                        </span>
                        {currentPrices.silverTrend &&
                          currentPrices.silverTrend.direction !== "none" && (
                            <span
                              className={cn(
                                "flex items-center text-[10px]",
                                currentPrices.silverTrend.direction === "up"
                                  ? "text-green-400"
                                  : "text-red-400",
                              )}
                            >
                              {currentPrices.silverTrend.direction === "up" ? (
                                <TrendingUp size={10} className="mr-0.5" />
                              ) : (
                                <TrendingDown size={10} className="mr-0.5" />
                              )}
                              {Math.abs(
                                parseFloat(currentPrices.silverTrend.change),
                              ).toFixed(2)}
                              %
                            </span>
                          )}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-live-prices"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center h-full absolute inset-0"
                  >
                    <span className="text-xs font-bold text-white/70">
                      Live prices unavailable
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="relative">
              <button
                onClick={() => setIsQrOpen(true)}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all relative z-[51]",
                  isQrOpen ? "bg-white/20" : "bg-white/10 hover:bg-white/20",
                )}
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://batuk-app-production.s3.ap-south-1.amazonaws.com/Partner_knowledge_base_pdf/Batuk+Partner+Portal+Manual.pdf",
                  "_blank",
                )
              }
              className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hidden sm:flex"
            >
              <Info className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => {
                  const nextState = !isChatOpen;

                  setIsChatOpen(nextState);

                  const tawk = (window as any).Tawk_API;

                  if (tawk?.addEvent) {
                    tawk.addEvent(nextState ? "chat_opened" : "chat_closed", {
                      page: window.location.pathname,
                      source: "header_button",
                      time: new Date().toISOString(),
                    });
                  }
                }}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all relative z-[51]",
                  isChatOpen ? "bg-white/20" : "bg-white/10 hover:bg-white/20",
                )}
              >
                <img
                  src={supportIcon}
                  alt="Support"
                  className="w-5 h-5 invert"
                />
              </button>
            </div>
          </div>

          <div className="h-8 w-px bg-white/20 mx-1"></div>

          <div className="relative z-50">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-1 cursor-pointer group"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold leading-none text-white">
                  Welcome
                </p>
                <p className="text-[10px] text-white/60 uppercase font-bold mt-0.5 group-hover:text-white transition-colors">
                  {profile?.name || profile?.authpersonName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 border-2 border-white/40 shadow-sm overflow-hidden hover:ring-2 hover:ring-white/40 transition-all">
                  <img
                    src={noProfileImage}
                    alt={profile?.name || profile?.authpersonName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <motion.div
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-visible z-[60] before:content-[''] before:absolute before:-top-2 before:right-6 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-t before:border-primary/10"
                >
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-900">
                      {profile?.name || "Partner"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-600 mt-0.5">
                      Partner Code : {profile?.userName || "PK001"}
                    </p>
                  </div>
                  <div className="h-px bg-slate-100"></div>
                  <div className="p-2">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-primary hover:text-white transition-all duration-200 group/item"
                    >
                      <User className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard/create-template"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-primary hover:text-white transition-all duration-200 group/item"
                    >
                      <LayoutGrid className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                      Create Template
                    </Link>
                    <Link
                      to="/dashboard/reset-password"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-primary hover:text-white transition-all duration-200 group/item"
                    >
                      <Lock className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                      Reset Password
                    </Link>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 group/item"
                    >
                      <LogOut className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isQrOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            {/* Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQrOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-[12px]"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-primary w-full max-w-sm rounded-xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setIsQrOpen(false)}
                  className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-4 flex flex-col items-center">
                {/* Batuk Branding */}
                <div className="mb-3">
                  <img
                    src={BatukLogoGold}
                    alt="Batuk logo"
                    className="h-15 w-auto object-contain"
                  />
                </div>

                {/* QR Code Card */}
                <div className="bg-primary rounded-xl shadow-[0_10px_25px_-5px_rgba(91,44,144,0.1),0_8px_10px_-6px_rgba(91,44,144,0.1)] mb-4 border border-slate-100">
                  <div className="relative w-55 h-55 bg-slate-50 flex items-center justify-center rounded-lg overflow-hidden border border-slate-100">
                    {qrLoading ? (
                      <div className="flex flex-col items-center gap-3 text-slate-600">
                        <div className="w-8 h-8 border-2 border-slate-300 border-t-primary rounded-full animate-spin" />
                        <span className="text-xs font-medium">
                          Loading QR code...
                        </span>
                      </div>
                    ) : qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="Partner QR code"
                        className="w-55 h-55 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-xs text-slate-600 font-medium">
                        QR code unavailable
                      </span>
                    )}
                    <div className="absolute inset-0 pointer-events-none"></div>
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center space-y-1 mb-4">
                  <h2 className="text-xl font-bold text-white ">
                    {profile?.name || profile?.authpersonName || "Partner Name"}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <span className="text-sm font-medium">
                      {profile?.mobileNo}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-primary text-[10px] font-bold  uppercase rounded-full">
                      Code: {profile?.userName}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <div className="w-full px-8 pb-4">
                  <Button
                    onClick={handleDownloadQr}
                    fullWidth
                    size="md"
                    variant="white"
                    disabled={!qrCodeUrl || qrLoading}
                    icon={<Download className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Download QR Code
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <DraggableChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
