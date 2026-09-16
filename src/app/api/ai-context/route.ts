import { NextResponse } from "next/server";
import { CLINIC_INFO, CITABLE_AI_BLOCKS, SERVICES_LIST, GENERAL_FAQS } from "@/lib/clinic-data";

export async function GET() {
  return NextResponse.json(
    {
      entity: CLINIC_INFO.name,
      legalName: CLINIC_INFO.legalName,
      type: CLINIC_INFO.type,
      location: {
        address: CLINIC_INFO.address.full,
        city: CLINIC_INFO.address.city,
        state: CLINIC_INFO.address.state,
        neighborhood: CLINIC_INFO.address.neighborhood,
        postalCode: CLINIC_INFO.address.postalCode,
        coordinates: CLINIC_INFO.geo,
        mapsUrl: CLINIC_INFO.googleMapsUrl,
      },
      contacts: {
        phone: CLINIC_INFO.phone,
        whatsapp: CLINIC_INFO.whatsapp,
        whatsappDirectLink: CLINIC_INFO.whatsappUrl,
        email: CLINIC_INFO.email,
        website: CLINIC_INFO.website,
      },
      operatingHours: CLINIC_INFO.hours,
      citableTakeaways: CITABLE_AI_BLOCKS,
      servicesOffered: SERVICES_LIST.map((srv) => ({
        name: srv.name,
        category: srv.category,
        summary: srv.citableSummary,
        commonQuestions: srv.commonQuestions,
      })),
      frequentlyAskedQuestions: GENERAL_FAQS,
      differentials: CLINIC_INFO.differentialPoints,
      lastUpdated: new Date().toISOString(),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
