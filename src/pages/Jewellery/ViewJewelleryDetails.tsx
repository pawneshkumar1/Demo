import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ShoppingBag, Star, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../../components/Button";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProductDetail } from "../../features/jewellery/jewelleryApi";
import { clearSelectedProduct } from "../../features/jewellery/jewellerySlice";
import fallbackImage from "../../assets/images/NoImage/noImage.avif";

interface Product {
  id: string;
  title: string;
  sku: string;
  weight: string;
  price: number;
  images: string[];
  category: string;
  purity: string;
  metal: string;
  badge?: string;
  metaDescription: string;
  productTags?: string[];
}

interface ViewJewelleryDetailsProps {
  product?: Product;
}

export const ViewJewelleryDetails: React.FC<ViewJewelleryDetailsProps> = ({
  product: initialProduct,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [activeImage, setActiveImage] = useState<string>("");

  const locationState = location.state as {
    product?: Product;
    clientId?: string;
  } | null;

  const finalProductId =
    productId || initialProduct?.id || locationState?.product?.id;
  const clientIdFromParams = searchParams.get("clientId");
  const clientId =
    locationState?.clientId ||
    clientIdFromParams ||
    sessionStorage.getItem("jewellery_selected_client") ||
    undefined;

  const { selectedProduct, productDetailLoading, productDetailError } =
    useSelector((state: RootState) => state.jewellery);

  const [noProductId, setNoProductId] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      setNoProductId(false);
      dispatch(fetchProductDetail(productId));
    } else {
      setNoProductId(true);
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, finalProductId]);

  useEffect(() => {
    if (selectedProduct) {
      sessionStorage.removeItem("view_jewellery_product");
    }
  }, [selectedProduct]);

  // ✅ MAP API DATA TO PRODUCT INTERFACE
  const product = useMemo(() => {
    if (!selectedProduct) return null;

    const item = selectedProduct;
    const metalType =
      item.subCategory?.category?.metalType?.metalType || "Gold";
    const metalFitness = item.subCategory?.category?.metalType?.metalFitness;

    let purity = "24K";
    if (metalFitness === 916) purity = "22K";
    else if (metalFitness === 750) purity = "18K";
    else if (metalFitness === 585) purity = "14K";

    // ✅ Main Image
    const mainImage =
      item.productImage && item.productImage !== "0"
        ? item.productImage
        : item.productImages?.[0]?.URL || fallbackImage;

    // ✅ Merge main image + gallery images
    const allImages = [
      mainImage,
      ...(item.productImages?.map((img: any) => img.URL) || []),
    ].filter(Boolean);

    // ✅ Remove duplicates
    const uniqueImages = [...new Set(allImages)];

    return {
      id: item.id.toString(),
      title: item.productName,
      sku: item.sku,
      weight: item.weight,
      price: item.productPrice?.[0]?.finalProductPrice || 0,
      metaDescription: item.metaDescription,
      image: mainImage,
      images: uniqueImages,
      category: item.subCategory?.category?.categoryName || "Other",
      purity: item.subCategory?.category?.conversionFactor,
      metal: metalType.charAt(0).toUpperCase() + metalType.slice(1),
      productTags: item.productTags,
    };
  }, [selectedProduct]);

  // ✅ Set default image
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  if (productDetailLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-slate-600 font-bold animate-pulse">
          Polishing your premium selection...
        </p>
      </div>
    );
  }

  if (
    noProductId ||
    productDetailError ||
    (!product && !productDetailLoading)
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-800">
          {noProductId ? "No Product Selected" : "Selection Unreachable"}
        </h2>
        <p className="text-slate-600 max-w-sm">
          {noProductId
            ? "Please select a product from the catalog to view its details."
            : productDetailError ||
              "We couldn't retrieve the details for this exquisite piece at the moment."}
        </p>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          {productId && !noProductId && (
            <Button onClick={() => dispatch(fetchProductDetail(productId))}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
        {/* Product Image Section */}
        <motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group h-[400px] rounded-2xl overflow-hidden bg-white border border-primary/5 flex flex-col"
          >
            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={activeImage || product.image}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-1000 rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Thumbnail Grid (NEW) */}
          {product.images.length > 0 && (
            <div className="grid grid-cols-9 gap-2 p-2 bg-slate-100 mt-1 rounded-2xl">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`h-14 w-14 rounded-lg border cursor-pointer flex items-center justify-center bg-white overflow-hidden
                    ${
                      activeImage === img
                        ? "border-primary"
                        : "border-gray-200 hover:border-primary"
                    }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold px-2 py-1 rounded-2xl bg-amber-50 text-amber-600 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {product.metal}
            </span>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-2xl bg-slate-100 text-slate-600 ">
              {product.purity} Purity
            </span>
          </div>

          <h2 className="text-xl font-semibold text-slate-900  leading-tight">
            {product.title}
          </h2>

          <div className="flex items-center gap-2 mb-2 text-[10px] font-medium">
            {product.productTags?.map((tag, i) => (
              <div
                key={i}
                className="text-green-500 bg-green-500/5 px-2 py-1 rounded-full border border-green-500/10"
              >
                {tag.trim()}
              </div>
            ))}
          </div>

          <div className="mb-2">
            <div className="text-xl font-semibold text-primary  mb-1">
              ₹{product.price.toLocaleString()}
            </div>
            <p className="text-sm font-medium text-slate-600 italic">
              *Inclusive of all taxes and craftsmanship charges
            </p>
          </div>
          {product.metaDescription && (
            <>
              <div className="mb-4">
                <span className="text-md font-semibold text-slate-900 mb-4  leading-tight">
                  Description
                </span>
                <div className="text-sm font-medium text-slate-600">
                  {product.metaDescription}
                </div>
              </div>
            </>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4 p-4 rounded-2xl bg-slate-50 border border-primary/5 shadow-sm">
            <div>
              <div className="text-[10px] font-semibold text-slate-400">
                Collection Category
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {product.category}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400">
                Metal Purity
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {product.purity}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400">
                Weight
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {product.weight} g
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400">
                SKU ID
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {product.sku}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400">
                Availability
              </div>
              <div className="text-sm font-black text-green-600 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                In Stock & Ready
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              size="md"
              className="flex items-center justify-center gap-2 w-full"
              onClick={() => {
                navigate(
                  `/dashboard/jewellery/buy-selected-jewellery/${product.id}/checkout?clientId=${clientId}`,
                  { state: { product } },
                );
              }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span>Purchase Now</span>
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
