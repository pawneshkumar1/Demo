import React, { useEffect, useState } from "react";
import {
  Download,
  RefreshCw,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { Select } from "../../components/Select";
import { getTemplateGallery } from "../../features/template/templateApi";
import { AppDispatch, RootState } from "../../redux/store";

const regionOptions = [
  { value: "all", label: "All Regions" },
  { value: "north", label: "North" },
  { value: "west", label: "West" },
  { value: "east", label: "East" },
  { value: "south", label: "South" },
];

const socialIcons = [
  { icon: MessageCircle, title: "WhatsApp" },
  { icon: Facebook, title: "Facebook" },
  { icon: Instagram, title: "Instagram" },
  { icon: Twitter, title: "X / Twitter" },
];

type TemplateCardProps = {
  card: {
    title: string;
    description: string;
    imagePath: string;
  };
  index: number;
};

const TemplateCard: React.FC<TemplateCardProps> = ({ card, index }) => {
  /**
   * =========================================
   * DOWNLOAD IMAGE
   * =========================================
   */

  const getImageUrl = (path: string) => {
    // Base64 image
    if (path.startsWith("data:image")) {
      return path;
    }

    // External URL
    if (path.startsWith("http")) {
      return path;
    }

    // Local image path
    return `${window.location.origin}${path}`;
  };

  const handleDownload = async () => {
    try {
      const imageUrl = getImageUrl(card.imagePath);

      const link = document.createElement("a");

      link.href = imageUrl;
      link.download = `${card.title || "template"}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Image downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  /**
   * =========================================
   * SHARE IMAGE
   * =========================================
   */
  const handleShare = async (platform: string) => {
    try {
      const shareTitle = card.title || "Check out this banner!";
      const imageUrl = getImageUrl(card.imagePath);

      /**
       * BASE64 IMAGES
       */
      let file: File | null = null;

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        file = new File([blob], "banner.png", {
          type: blob.type,
        });
      } catch (err) {
        console.error("File creation failed", err);
      }

      /**
       * MOBILE NATIVE SHARE
       */
      if (
        file &&
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: shareTitle,
          text: card.description,
          files: [file],
        });

        return;
      }

      /**
       * FALLBACK URL SHARING
       */
      const encodedTitle = encodeURIComponent(shareTitle);
      const encodedUrl = encodeURIComponent(imageUrl);

      let shareLink = "";

      switch (platform) {
        case "WhatsApp":
          shareLink = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
          break;

        case "Facebook":
          shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          break;

        case "X / Twitter":
          shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
          break;

        case "Instagram":
          toast.success("Downloading image for Instagram...");
          handleDownload();
          return;

        default:
          return;
      }

      window.open(shareLink, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
      toast.error("Unable to share image");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={card.imagePath}
          alt={card.title}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* ACTION BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-t border-white/20 flex items-center justify-between px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {/* DOWNLOAD */}
          <button
            type="button"
            title="Download"
            onClick={handleDownload}
            className="text-white hover:text-amber-400 transition-colors"
          >
            <Download size={16} />
          </button>

          {/* SOCIAL SHARE */}
          <div className="flex items-center gap-2.5">
            {socialIcons.map(({ icon: Icon, title }) => (
              <button
                key={title}
                type="button"
                title={title}
                onClick={() => handleShare(title)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Template: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [region, setRegion] = useState("all");
  const [skip, setSkip] = useState(0);

  const { templates, templatesLoading, templatesError, hasMoreTemplates } =
    useSelector((state: RootState) => state.template);

  /**
   * =========================================
   * FETCH TEMPLATES
   * =========================================
   */
  useEffect(() => {
    dispatch(getTemplateGallery(skip, region) as any);
  }, [dispatch, skip, region]);

  /**
   * =========================================
   * ERROR TOAST
   * =========================================
   */
  useEffect(() => {
    if (templatesError) {
      toast.error(templatesError);
    }
  }, [templatesError]);

  /**
   * =========================================
   * REGION CHANGE
   * =========================================
   */
  const handleRegionChange = (value: string) => {
    setRegion(value);
    setSkip(0);
  };

  /**
   * =========================================
   * LOAD MORE
   * =========================================
   */
  const handleLoadMore = () => {
    if (!templatesLoading && hasMoreTemplates) {
      setSkip((prev) => prev + 4);
    }
  };

  return (
    <div className="p-4 mx-auto w-full">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row justify-end mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-44">
            <Select
              options={regionOptions}
              value={region}
              onChange={handleRegionChange}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* LOADING */}
      {templatesLoading && skip === 0 ? (
        <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-600">
          Loading templates...
        </div>
      ) : templates.length === 0 ? (
        /* EMPTY */
        <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-600">
          No templates available
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {templates.map((card, index) => (
              <TemplateCard
                key={`${card.title}-${card.description}-${index}`}
                card={card}
                index={index}
              />
            ))}
          </div>

          {/* LOAD MORE */}
          {hasMoreTemplates && (
            <div className="mt-4 mb-4 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={templatesLoading}
                className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  size={16}
                  className={templatesLoading ? "animate-spin" : ""}
                />

                {templatesLoading ? "Loading..." : "Load More Templates"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import {
//   Download,
//   RefreshCw,
//   MessageCircle,
//   Facebook,
//   Instagram,
//   Twitter,
// } from "lucide-react";
// import { motion } from "motion/react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { Select } from "../../components/Select";
// import { getTemplateGallery } from "../../features/template/templateApi";
// import { AppDispatch, RootState } from "../../redux/store";

// const regionOptions = [
//   { value: "all", label: "All Regions" },
//   { value: "north", label: "North" },
//   { value: "west", label: "West" },
//   { value: "east", label: "East" },
//   { value: "south", label: "South" },
// ];

// const socialIcons = [
//   { icon: MessageCircle, title: "WhatsApp" },
//   { icon: Facebook, title: "Facebook" },
//   { icon: Instagram, title: "Instagram" },
//   { icon: Twitter, title: "X / Twitter" },
// ];

// type TemplateCardProps = {
//   card: {
//     title: string;
//     description: string;
//     imagePath: string;
//   };
//   index: number;
// };

// const TemplateCard: React.FC<TemplateCardProps> = ({ card, index }) => {
//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = card.imagePath;
//     link.download = `${card.title || "template"}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleShare = async (platform: string) => {
//     const shareTitle = card.title || "Check out this banner!";
//     const imageUrl = card.imagePath;

//     // Check if image is local or external
//     const isExternal = imageUrl.startsWith("http");
//     const fullImageUrl = isExternal
//       ? imageUrl
//       : `${window.location.origin}${imageUrl}`;

//     // Try Web Share API (Best for Mobile/Modern Browsers)
//     if (navigator.share) {
//       try {
//         const response = await fetch(fullImageUrl);
//         const blob = await response.blob();
//         const file = new File([blob], "banner.png", { type: "image/png" });

//         if (navigator.canShare && navigator.canShare({ files: [file] })) {
//           await navigator.share({
//             files: [file],
//             title: shareTitle,
//             text: card.description,
//           });
//           return;
//         }
//       } catch (error) {
//         console.error("Web Share failed:", error);
//       }
//     }

//     // Fallback to social media URLs
//     let shareLink = "";
//     const encodedTitle = encodeURIComponent(shareTitle);
//     const encodedUrl = encodeURIComponent(fullImageUrl);

//     switch (platform) {
//       case "WhatsApp":
//         shareLink = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
//         break;
//       case "Facebook":
//         shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
//         break;
//       case "X / Twitter":
//         shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
//         break;
//       case "Instagram":
//         toast.success("To share on Instagram, please download the image.");
//         handleDownload();
//         return;
//       default:
//         return;
//     }

//     if (shareLink) {
//       window.open(shareLink, "_blank", "noopener,noreferrer");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.07 }}
//       className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
//     >
//       <div className="relative overflow-hidden bg-slate-100">
//         <img
//           src={card.imagePath}
//           alt={card.title}
//           className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
//         />

//         <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-t border-white/20 flex items-center justify-between px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
//           <button
//             type="button"
//             title="Download"
//             onClick={handleDownload}
//             className="text-white hover:text-amber-400 transition-colors"
//           >
//             <Download size={16} />
//           </button>

//           <div className="flex items-center gap-2.5">
//             {socialIcons.map(({ icon: Icon, title }) => (
//               <button
//                 key={title}
//                 type="button"
//                 title={title}
//                 onClick={() => handleShare(title)}
//                 className="text-white/80 hover:text-white transition-colors"
//               >
//                 <Icon size={14} />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export const Template: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [region, setRegion] = useState("all");
//   const [skip, setSkip] = useState(0);
//   const { templates, templatesLoading, templatesError, hasMoreTemplates } =
//     useSelector((state: RootState) => state.template);

//   useEffect(() => {
//     dispatch(getTemplateGallery(skip, region) as any);
//   }, [dispatch, skip, region]);

//   useEffect(() => {
//     if (templatesError) {
//       toast.error(templatesError);
//     }
//   }, [templatesError]);

//   const handleRegionChange = (value: string) => {
//     setRegion(value);
//     setSkip(0);
//   };

//   const handleLoadMore = () => {
//     if (!templatesLoading && hasMoreTemplates) {
//       setSkip((prev) => prev + 4);
//     }
//   };

//   return (
//     <div className="p-4 mx-auto w-full">
//       <div className="flex flex-col md:flex-row justify-end mb-4 gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-44">
//             <Select
//               options={regionOptions}
//               value={region}
//               onChange={handleRegionChange}
//               size="md"
//             />
//           </div>
//         </div>
//       </div>

//       {templatesLoading && skip === 0 ? (
//         <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-600">
//           Loading templates...
//         </div>
//       ) : templates.length === 0 ? (
//         <div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-slate-600">
//           No templates available
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {templates.map((card, index) => (
//               <TemplateCard
//                 key={`${card.title}-${card.description}-${index}`}
//                 card={card}
//                 index={index}
//               />
//             ))}
//           </div>

//           {hasMoreTemplates && (
//             <div className="mt-4 mb-4 flex flex-col items-center gap-3">
//               <button
//                 type="button"
//                 onClick={handleLoadMore}
//                 disabled={templatesLoading}
//                 className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw
//                   size={16}
//                   className={templatesLoading ? "animate-spin" : ""}
//                 />
//                 {templatesLoading ? "Loading..." : "Load More Templates"}
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };
