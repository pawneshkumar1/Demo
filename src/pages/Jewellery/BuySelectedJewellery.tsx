import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Heart, Filter as FilterIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../../lib/utils";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import { JewelleryFilters } from "../../components/JewelleryFilters";
import { ViewJewelleryDetails } from "./ViewJewelleryDetails";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProducts } from "../../features/jewellery/jewelleryApi";
import { fetchKycClientList } from "../../features/kyc/kycApi";
import { Select } from "../../components/Select";
import fallbackImage from "../../assets/images/NoImage/noImage.avif";

const STORAGE_KEY_CLIENT_ID = "jewellery_selected_client";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  purity: string;
  metal: string;
  badge?: string;
  isFeatured?: boolean;
}

const DEFAULTS = {
  metal: "Gold",
  price: 200000,
};

export const BuySelectedJewellery: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, productsLoading, productsError } = useSelector(
    (state: RootState) => state.jewellery,
  );
  const { kycClientList } = useSelector((state: RootState) => state.kyc);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const getInitialClientId = () => {
    const fromUrl = searchParams.get("clientId");
    if (fromUrl) {
      sessionStorage.setItem(STORAGE_KEY_CLIENT_ID, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(STORAGE_KEY_CLIENT_ID) || "";
  };

  const [clientId, setClientId] = useState(getInitialClientId);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (clientId) {
      sessionStorage.setItem(STORAGE_KEY_CLIENT_ID, clientId);
    } else {
      sessionStorage.removeItem(STORAGE_KEY_CLIENT_ID);
    }
  }, [clientId]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetal, setSelectedMetal] = useState<string>(DEFAULTS.metal);
  const [priceRange, setPriceRange] = useState(DEFAULTS.price);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchKycClientList());
  }, [dispatch]);

  // ✅ MAP API DATA TO PRODUCT INTERFACE
  const mappedProducts = useMemo(() => {
    return products.map((item: any) => {
      const metalType =
        item.subCategory?.category?.metalType?.metalType || "Gold";
      const metalFitness = item.subCategory?.category?.metalType?.metalFitness;

      let purity = "24K";
      if (metalFitness === 916) purity = "22K";
      if (metalFitness === 750) purity = "18K";
      if (metalFitness === 585) purity = "14K";

      return {
        id: item.id.toString(),
        title: item.productName,
        price: item.productPrice?.[0]?.finalProductPrice || 0,
        image:
          item.productImage && item.productImage !== "0"
            ? item.productImage
            : item.productImages?.[0]?.URL || fallbackImage,
        category: item.subCategory?.subCategoryName || "Other",
        purity: purity,
        metal: metalType.charAt(0).toUpperCase() + metalType.slice(1),
        badge: item.productTags?.includes("new") ? "New Arrival" : undefined,
        isFeatured: item.productTags?.includes(" best seller"),
      };
    });
  }, [products]);

  // ✅ ACTUAL FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    return mappedProducts.filter((product) => {
      const matchesSearch = (product.title || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesMetal =
        selectedMetal === DEFAULTS.metal ||
        product.metal.toLowerCase() === selectedMetal.toLowerCase();

      const matchesPrice = product.price <= priceRange;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMetal &&
        matchesPrice
      );
    });
  }, [
    mappedProducts,
    searchTerm,
    selectedCategories,
    selectedMetal,
    priceRange,
  ]);

  // ✅ FILTER COUNT LOGIC (for badge)
  const filterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedMetal !== DEFAULTS.metal) count += 1;
    if (priceRange !== DEFAULTS.price) count += 1;
    return count;
  }, [selectedCategories, selectedMetal, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange(DEFAULTS.price);
    setSearchTerm("");
    setSelectedMetal(DEFAULTS.metal);
  };

  return (
    <div className="flex bg-background-light">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-md">
            <Select
              value={clientId}
              onChange={(val) => setClientId(val)}
              showSearch={true}
              options={kycClientList.map((client: any) => ({
                value: client._id,
                label: `${client.name} (${client.mobileNo || "No Mobile"})`,
              }))}
              placeholder="Search and select investor"
              size="md"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="sm:block">
              <Input
                size="md"
                placeholder="Search premium pieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                containerClassName="p-0 space-y-0"
              />
            </div>

            <Button size="md" onClick={() => setIsFilterModalOpen(true)}>
              <div className="flex items-center">
                Filters
                <FilterIcon size={16} />
                {/* ✅ BADGE */}
                {filterCount > 0 && (
                  <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center text-[10px] font-black">
                    {filterCount}
                  </span>
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 overflow-y-auto px-4 bg-slate-50/20 custom-scrollbar pb-24">
          {!clientId ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
                <FilterIcon size={40} className="opacity-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800">
                  Select an Investor
                </h3>
                <p className="text-slate-600 max-w-xs mx-auto">
                  Please choose an investor from the dropdown above to browse
                  our premium collection.
                </p>
              </div>
            </div>
          ) : productsLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-slate-600 font-bold animate-pulse">
                Discovering premium pieces...
              </p>
            </div>
          ) : productsError ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                !
              </div>
              <h3 className="text-lg font-black text-slate-800">
                Unable to load collection
              </h3>
              <p className="text-slate-600 max-w-xs">{productsError}</p>
              <Button size="md" onClick={() => dispatch(fetchProducts())}>
                Try Again
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2 font-black">
                ?
              </div>
              <h3 className="text-lg font-black text-slate-800">
                No pieces found
              </h3>
              <p className="text-slate-600 max-w-xs">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <Button size="md" onClick={handleReset}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() =>
                      navigate(
                        `/dashboard/jewellery/buy-selected-jewellery/${product.id}/details?clientId=${clientId}`,
                        { state: { product } },
                      )
                    }
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(91,44,144,0.12)] transition-all border border-primary/5 group cursor-pointer"
                  >
                    {/* Image Area */}
                    <div className="h-40 relative overflow-hidden bg-white">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0" /> */}

                      {product.badge && (
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl text-[9px] font-semibold text-white border border-primary/10 shadow-lg ">
                          {product.badge}
                        </div>
                      )}

                      {product.isFeatured && (
                        <div className="absolute top-5 left-5 bg-primary text-white px-2 py-1 rounded-xl text-[9px] font-semibold  shadow-lg shadow-primary/20">
                          Featured Selection
                        </div>
                      )}
                    </div>
                    {/* Content Area */}
                    <div className="p-4 bg-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-semibold px-3 py-1 rounded-xl bg-amber-50 text-amber-600 flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                          {product.metal}
                        </span>
                        <span className="text-[9px] font-semibold px-3 py-1 rounded-xl bg-slate-50 text-slate-600 ">
                          {product.purity}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors mb-2">
                        {product.title}
                      </h3>

                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-sm font-semibold text-primary ">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <Button
                          size="md"
                          fullWidth
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/dashboard/jewellery/buy-selected-jewellery/${product.id}/details?clientId=${clientId}`,
                              { state: { product } },
                            );
                          }}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Reusable Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Refine Collection"
        size="md"
      >
        <JewelleryFilters
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedMetal={selectedMetal}
          setSelectedMetal={setSelectedMetal}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          onReset={handleReset}
        />

        <div className=" flex gap-4 mt-4">
          <Button size="md" fullWidth onClick={handleReset}>
            Clear Filters
          </Button>
          <Button
            size="md"
            fullWidth
            onClick={() => setIsFilterModalOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </Modal>
    </div>
  );
};
