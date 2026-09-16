import { CLINIC_INFO, CLINIC_UNITS, SERVICES_LIST, GENERAL_FAQS } from "./clinic-data";

export function generateVeterinaryCareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["VeterinaryCare", "LocalBusiness", "MedicalBusiness", "Organization"],
    "@id": `${CLINIC_INFO.website}/#organization`,
    "name": CLINIC_INFO.name,
    "alternateName": [CLINIC_INFO.shortName, CLINIC_INFO.legalName, "Inuvet Maringá", "Inuvet Sarandi", "Hospital Veterinário Inuvet"],
    "description":
      "Clínica e Hospital Veterinário 24 horas em Maringá e Sarandi - PR. Atendimento de emergência 24h, consultas, cirurgias, vacinas, ultrassom, exames laboratoriais e internação monitorada para cães e gatos.",
    "url": CLINIC_INFO.website,
    "telephone": CLINIC_INFO.phone,
    "email": CLINIC_INFO.email,
    "image": [
      `${CLINIC_INFO.website}/images/humanizado/inuvet-oficial.jpg`,
      `${CLINIC_INFO.website}/images/inuvet-estrutura.jpg`,
      `${CLINIC_INFO.website}/images/inuvet-cirurgia.jpg`,
    ],
    "logo": `${CLINIC_INFO.website}/images/logo.png`,
    "priceRange": "$$",
    "currenciesAccepted": "BRL",
    "paymentAccepted": "Cash, Credit Card, Debit Card, PIX, Pet Health Insurance",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_INFO.address.street,
      "addressLocality": CLINIC_INFO.address.city,
      "addressRegion": CLINIC_INFO.address.state,
      "postalCode": CLINIC_INFO.address.postalCode,
      "addressCountry": "BR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CLINIC_INFO.geo.latitude,
      "longitude": CLINIC_INFO.geo.longitude,
    },
    "hasMap": CLINIC_INFO.googleMapsUrl,
    "sameAs": [
      CLINIC_INFO.website,
      CLINIC_INFO.googleMapsUrl,
      CLINIC_INFO.social.instagram,
      CLINIC_INFO.social.instagramSarandi,
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
        "description": "Unidade Maringá - Atendimento 24 horas",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:30",
        "closes": "18:00",
        "description": "Unidade Sarandi",
      },
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Maringá, PR" },
      { "@type": "AdministrativeArea", "name": "Sarandi, PR" },
      { "@type": "AdministrativeArea", "name": "Paiçandu, PR" },
      { "@type": "Place", "name": "Parque das Grevíleas" },
      { "@type": "Place", "name": "Jardim Independência II" },
    ],
    "department": CLINIC_UNITS.map((unit) => ({
      "@type": "VeterinaryCare",
      "name": unit.name,
      "telephone": unit.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": unit.address.street,
        "addressLocality": unit.address.city,
        "addressRegion": unit.address.state,
        "postalCode": unit.address.postalCode,
        "addressCountry": "BR",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": unit.geo.latitude,
        "longitude": unit.geo.longitude,
      },
      "hasMap": unit.googleMapsUrl,
    })),
    "makesOffer": SERVICES_LIST.map((srv) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": srv.name,
        "description": srv.shortDescription,
        "provider": {
          "@type": "VeterinaryCare",
          "name": CLINIC_INFO.name,
        },
      },
    })),
  };
}

export function generateFAQSchema(faqs = GENERAL_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CLINIC_INFO.website}/#website`,
    "url": CLINIC_INFO.website,
    "name": CLINIC_INFO.name,
    "description": "Site oficial da Inuvet - Clínica e Hospital Veterinário 24h em Maringá e Sarandi - PR.",
    "inLanguage": "pt-BR",
    "publisher": {
      "@id": `${CLINIC_INFO.website}/#organization`,
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${CLINIC_INFO.website}/servicos?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function generateServiceSchema(serviceName: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": "Veterinary Service",
    "provider": {
      "@type": "VeterinaryCare",
      "name": CLINIC_INFO.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_INFO.address.street,
        "addressLocality": CLINIC_INFO.address.city,
        "addressRegion": CLINIC_INFO.address.state,
        "postalCode": CLINIC_INFO.address.postalCode,
      },
      "telephone": CLINIC_INFO.phone,
    },
    "areaServed": ["Maringá - PR", "Sarandi - PR"],
    "description": description,
    "url": url,
  };
}
