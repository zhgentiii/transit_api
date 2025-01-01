import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function GET() {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <dict_CitiesResponse xmlns="http://ltl-ws.major-express.ru/">
        <dict_CitiesResult />
      </dict_CitiesResponse>
    </soap:Body>
  </soap:Envelope>`;

  try {
    const response = await fetch("http://ltl-ws.major-express.ru/ed.asmx", {
      method: "POST",
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        SOAPAction: "http://ltl-ws.major-express.ru/dict_Cities",
      },
      body: soapRequest,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text(); // Get the response as text (XML)

    const options = {
      attributeNamePrefix: "",
      attrNodeName: "attr",
      ignoreNameSpace: true,
      ignoreAttributes: false,
    };

    const parser = new XMLParser(options);
    const parsedData = parser.parse(data);

    const soapBody = parsedData["soap:Envelope"]["soap:Body"];
    console.log("@@@@@@@", soapBody);

    // Create the response and set the Cache-Control header
    const nextResponse = NextResponse.json(
      soapBody.dict_CitiesResponse.dict_CitiesResult.EDCity
    );

    // Set Cache-Control header for caching the data for 1 hour
    nextResponse.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=3600" // Cache for 1 hour
    );

    return nextResponse;
  } catch (error) {
    console.error("@@@@@@@@@@@@@@@@@@error", error);
    return NextResponse.error();
  }
}
