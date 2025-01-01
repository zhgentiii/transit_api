import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <dict_Cities xmlns="http://ltl-ws.major-express.ru/edclients/"/>
    </soap:Body>
  </soap:Envelope>`;

  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@egaaa", process.env);

  try {
    const response = await fetch(process.env.SOAP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://ltl-ws.major-express.ru/edclients/dict_Cities",
        Authorization: `Basic ${process.env.BASIC_AUTH_CREDENTIALS}`,
      },
      body: soapRequest,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response:", errorText);
      throw new Error(`SOAP request failed: ${response.statusText}`);
    }

    const data = await response.text();
    const parser = new XMLParser({
      ignoreNameSpace: true,
      ignoreAttributes: false,
    });
    const parsedData = parser.parse(data);

    const soapBody = parsedData.Envelope.Body;
    const cities = soapBody.dict_CitiesResponse?.dict_CitiesResult || [];

    const nextResponse = NextResponse.json(cities);
    nextResponse.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=3600"
    );
    return nextResponse;
  } catch (error) {
    console.error("Error during SOAP request:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities", details: error.message },
      { status: 500 }
    );
  }
}
