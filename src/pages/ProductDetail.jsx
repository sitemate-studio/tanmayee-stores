import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useLang } from "@/context/LanguageContext.jsx";

import {
  PRODUCTS,
  STORE_CONFIG,
  getProductName,
  getProductDescription,
  getWhatsAppProductURL,
  getCategoryName,
} from "@/lib/storeData";

const WA_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="#fff"
    style={{
      width: 20,
      height: 20,
      flexShrink: 0,
    }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.43a.5.5 0 0 0 .608.61l5.7-1.49A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.031-1.378l-.36-.214-3.733.977.999-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
  </svg>
);

const CARD_COLORS = [
  "#fbeaf2",
  "#eeeaf8",
  "#eaf5ee",
  "#faf0e4",
  "#eaf5f5",
  "#f0eaf8",
];

export default function ProductDetail() {
  const { id } = useParams();

  const { lang, setLang } = useLang();

  const [activeImage, setActiveImage] =
    useState(0);

  const product = PRODUCTS.find(
    (item) =>
      String(item.id) === String(id)
  );

  const relatedProducts =
    product?.category
      ? PRODUCTS.filter(
          (item) =>
            item.category ===
              product.category &&
            item.id !== product.id
        ).slice(0, 6)
      : [];

  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Product not found</p>

        <Link to="/collections">
          Back to collections
        </Link>
      </div>
    );
  }

  const images =
    product.images || [];

  const productName =
    getProductName(
      product,
      lang
    );

  const description =
    getProductDescription(
      product,
      lang
    );

  const categoryName =
    getCategoryName(
      product.category,
      lang
    );

  const waUrl =
    getWhatsAppProductURL(
      product.name_en
    );

  return (
    <div className="min-h-screen bg-[#fdf6ed] pb-20">

      <div className="px-6 py-4 border-b">
        <div className="flex gap-2 text-xs">

          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/collections">
            Collections
          </Link>

          <span>/</span>

          <span>
            {product.name_en}
          </span>

        </div>
      </div>

      <div className="grid md:grid-cols-2 max-w-6xl mx-auto">

        <div className="p-6">

          <div className="aspect-square overflow-hidden rounded-xl border bg-white mb-3">

            {images.length > 0 ? (
              <img
                src={
                  images[
                    activeImage
                  ]
                }
                alt={
                  product.name_en
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">
                ✦
              </div>
            )}

          </div>

          {images.length > 1 && (
            <div className="flex gap-2">

              {images.map(
                (
                  img,
                  index
                ) => (
                  <button
                    key={
                      index
                    }
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                    className="w-20 h-20 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={
                        img
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}

            </div>
          )}

        </div>

        <div className="p-6">

          <p className="text-xs uppercase tracking-widest">
            {categoryName}
          </p>

          <h1 className="text-3xl font-semibold mt-4 mb-2">
            {productName}
          </h1>

          <div className="text-2xl font-semibold mb-6">
            ₹
            {product.price?.toLocaleString(
              "en-IN"
            )}
          </div>

          <div className="flex gap-2 mb-4">

            {[
              {
                code: "en",
                label: "EN",
              },
              {
                code: "te",
                label: "తె",
              },
              {
                code: "hi",
                label: "हि",
              },
            ].map(
              (
                item
              ) => (
                <button
                  key={
                    item.code
                  }
                  onClick={() =>
                    setLang(
                      item.code
                    )
                  }
                  className="border px-3 py-1 rounded-full text-sm"
                >
                  {
                    item.label
                  }
                </button>
              )
            )}

          </div>

          {description && (
            <p className="mb-6 leading-7">
              {
                description
              }
            </p>
          )}

          <div className="mb-6">
            {product.in_stock
              ? "In stock"
              : "Out of stock"}
          </div>

          <div className="flex flex-col gap-3">

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-4 rounded-lg flex items-center justify-center gap-3"
            >
              {WA_ICON}
              Enquire on WhatsApp
            </a>

            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="border px-6 py-4 rounded-lg text-center"
            >
              Call Store
            </a>

          </div>

        </div>

      </div>

      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-12">

          <h2 className="text-xl font-semibold mb-6">
            You may also like
          </h2>

          <div className="flex gap-4 overflow-x-auto">

            {relatedProducts.map(
              (
                item,
                index
              ) => (
                <Link
                  key={
                    item.id
                  }
                  to={`/product/${item.id}`}
                  className="min-w-[160px] border rounded-xl overflow-hidden bg-white"
                >

                  <div
                    className="h-32 flex items-center justify-center"
                    style={{
                      background:
                        CARD_COLORS[
                          index %
                            CARD_COLORS.length
                        ],
                    }}
                  >

                    {item
                      .images?.[0] ? (
                      <img
                        src={
                          item
                            .images[0]
                        }
                        alt={
                          item.name_en
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "✦"
                    )}

                  </div>

                  <div className="p-3">

                    <p className="text-sm">
                      {getProductName(
                        item,
                        lang
                      )}
                    </p>

                    <p className="font-semibold mt-2">
                      ₹
                      {item.price?.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </Link>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}