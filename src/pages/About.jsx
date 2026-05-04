import { Link } from "react-router-dom";
import { STORE_CONFIG } from "@/lib/storeData";

// Safe phone formatting for WhatsApp
const phoneNumber = String(
  STORE_CONFIG?.whatsappNumber || STORE_CONFIG?.phone || ""
).replace(/\D/g, "");

const waUrl = `https://wa.me/${phoneNumber}`;

const mapsUrl =
  "https://maps.google.com/?q=Tanmayee+Fancy+Store+Nizamabad";

const WA_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="#fff"
    style={{ width: 18, height: 18, flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.43a.5.5 0 0 0 .608.61l5.7-1.49A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.031-1.378l-.36-.214-3.733.977.999-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"
      fillRule="evenodd"
    />
  </svg>
);

const VALUES = [
  {
    title: "Trusted Quality",
    desc:
      "Carefully selected imitation jewellery and clothing from reliable suppliers",
  },
  {
    title: "New Stock Weekly",
    desc:
      "Fresh arrivals every week so there is always something new to find",
  },
  {
    title: "Customer First",
    desc:
      "Friendly service and a warm shopping experience every visit",
  },
  {
    title: "Affordable Prices",
    desc:
      "Premium look at prices that work for everyday budgets",
  },
];

const OFFERS = [
  {
    title: "Jewellery & Accessories",
    sub:
      "Necklace sets, bangles, Jhumka earrings, Chandbali, Mangalsutra and more",
  },
  {
    title: "Sarees",
    sub:
      "Traditional sarees with decorative borders for all occasions",
  },
  {
    title: "Dress Materials",
    sub:
      "Unstitched and semi-stitched suit pieces and fabrics",
  },
  {
    title: "Ready-to-wear",
    sub:
      "Long gowns, nighties and maxi dresses",
  },
  {
    title: "Handbags & Purses",
    sub:
      "Modern ladies handbags, clutches and purses",
  },
  {
    title: "Hair Accessories",
    sub:
      "Colourful hair scrunchies, clips and bands",
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "10:00 am – 8:00 pm" },
  { day: "Saturday", time: "10:00 am – 9:00 pm" },
  { day: "Sunday", time: "11:00 am – 7:00 pm" },
];

export default function About() {
  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh" }}>
      
      {/* Breadcrumb */}
      <div
        style={{
          padding: "14px 24px",
          borderBottom: "0.5px solid #e8d5b0",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <Link
            to="/"
            style={{
              fontSize: 11,
              color: "#8b6320",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <span>›</span>
          <span style={{ fontSize: 11, color: "#b09080" }}>
            About Us
          </span>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          background: "#2d0a1c",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 4,
            color: "#9a6050",
            marginBottom: 14,
            textTransform: "uppercase",
          }}
        >
          Our Story
        </div>

        <h1
          style={{
            color: "#f0c96e",
            fontSize: "clamp(32px,6vw,54px)",
            marginBottom: 10,
            fontStyle: "italic",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Tanmayee Fancy Store
        </h1>

        <div
          style={{
            color: "#7a5060",
            marginBottom: 20,
          }}
        >
          తన్మయీ ఫ్యాన్సీ స్టోర్
        </div>

        <p
          style={{
            color: "#c9a0a8",
            maxWidth: 550,
            margin: "0 auto",
            lineHeight: 1.8,
            fontSize: 14,
          }}
        >
          Nizamabad's destination for ethnic fashion,
          jewellery, sarees, handbags and accessories.
        </p>
      </div>

      {/* Values */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "50px 24px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: "#2d0a1c",
          }}
        >
          Why Customers Love Us
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {VALUES.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff9f2",
                border: "0.5px solid #e8d5b0",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  color: "#2d0a1c",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: 12,
                  color: "#8b6320",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div
        style={{
          background: "#fff9f2",
          padding: "50px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              color: "#2d0a1c",
              marginBottom: 30,
            }}
          >
            What We Offer
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: 14,
            }}
          >
            {OFFERS.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fdf6ed",
                  padding: 18,
                  borderRadius: 10,
                  border: "0.5px solid #e8d5b0",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "#2d0a1c",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#8b6320",
                    lineHeight: 1.6,
                  }}
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Us */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "50px 24px",
        }}
      >
        <h2
          style={{
            color: "#2d0a1c",
            marginBottom: 20,
          }}
        >
          Visit Our Store
        </h2>

        {HOURS.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom:
                i !== HOURS.length - 1
                  ? "0.5px solid #e8d5b0"
                  : "none",
            }}
          >
            <span>{item.day}</span>
            <span>{item.time}</span>
          </div>
        ))}

        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#f0c96e",
              color: "#2d0a1c",
              textDecoration: "none",
              textAlign: "center",
              padding: 14,
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Open in Google Maps
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25d366",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
              padding: 14,
              borderRadius: 8,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            {WA_ICON}
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}