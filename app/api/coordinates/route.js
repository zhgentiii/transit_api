import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <dict_Cities xmlns="http://ltl-ws.major-express.ru/edclients/"/>
    </soap:Body>
  </soap:Envelope>`;

  try {
    const response = await fetch("http://ed.major-express.ru/edclients2.asmx", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://ltl-ws.major-express.ru/edclients/dict_Cities",
        Authorization: "Basic eW91cjpjcmVkZW50aWFscw==", // Replace with the actual Base64 credentials
      },
      body: soapRequest,
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture and log error response
      console.error("Error Response:", errorText);
      throw new Error("Network response was not ok");
    }

    const data = await response.text();

    const parser = new XMLParser({
      ignoreNameSpace: true,
      ignoreAttributes: false,
    });

    const parsedData = parser.parse(data);
    const soapBody = parsedData.Envelope.Body;

    // Log the parsed response to inspect the structure
    console.log("SOAP Body:", soapBody);

    // Extract the result (adjust based on actual response structure)
    const cities = soapBody.dict_CitiesResponse.dict_CitiesResult;

    const nextResponse = NextResponse.json(cities);

    // Cache-Control header for 1 hour
    nextResponse.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=3600"
    );

    return nextResponse;
  } catch (error) {
    console.error("Error during SOAP request:", error);
    return NextResponse.error();
  }
}
