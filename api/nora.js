const MODEL = "gemini-3.1-flash-lite";
const MAX_PROMPT_LENGTH = 1200;

const CATEGORIES = [
  "Humidificadores",
  "Deshumidificadores",
  "Calefactores",
  "Termostatos y controladores",
  "Válvulas y medidores",
  "Sensores y transmisores",
  "Ahorro de energía",
  "Servicio e instalación",
  "Otro",
];

// Modelos del catálogo Haften para que NORA use nombres y códigos reales.
const CATALOG_HINT = [
  "Neptronic: SKE (humidificador eléctrico), SKS (vapor-vapor), SKG (gas), SKH (alta presión), SKVF (enfriador evaporativo), SKRO (ósmosis inversa), SKV (evaporativo), SKD (vapor directo), SKR (residencial), calefactores eléctricos de bobina abierta y tubulares",
  "Bry-Air: deshumidificadores MiniPAC MP y FLI",
  "Belimo: Energy Valve, sensores y transmisores en muro",
  "FlowCon: válvulas independientes de la presión",
  "Dwyer: transmisor CDT-S; Air Monitor; CoolAutomation",
  "Termostatos/controladores: AC223-A2, AC223-E1, AC223-M2, ALT, BAST-221-321, BAST-421, EXT-CF24, EXT-CF230, GA-B, HRO, HT1000, HT5000HC11, MTS, Nest, P722U, TAS24, TAS400, TAT-SUPER, TBS24, TEC3000, TEC4000S, TRS-HT4-01, TUCB-TUHB, TUUB",
  "Medidores AL40MET3, AL50MET3, AL75MET3, AL100MET3; válvulas EXT-SW",
].join("\n");

const serviceSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Confirmación breve en español, sin saludo ni texto promocional.",
    },
    services: {
      type: "array",
      minItems: 1,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: CATEGORIES,
          },
          code: {
            type: "string",
            description: "Modelo o código del producto (ej. SKE); vacío si no aplica.",
          },
          name: {
            type: "string",
            description: "Nombre comercial claro y breve del equipo o servicio.",
          },
          description: {
            type: "string",
            description: "Descripción técnica breve en una sola oración.",
          },
          duration: {
            type: "string",
            description: "Tiempo de entrega indicado o Por confirmar.",
          },
          capacity: {
            type: "string",
            description: "Unidad de venta: Pieza, Equipo, Servicio, Lote, etc.",
          },
          quantity: {
            type: "integer",
            minimum: 1,
            maximum: 9999,
          },
          price: {
            type: "number",
            minimum: 0,
            description: "Precio unitario sin IVA. Usa 0 si el usuario no dio un precio.",
          },
          deliverable: {
            type: "string",
            description: "Observaciones indicadas por el usuario o cadena vacía.",
          },
        },
        required: [
          "category",
          "code",
          "name",
          "description",
          "duration",
          "capacity",
          "quantity",
          "price",
          "deliverable",
        ],
      },
    },
  },
  required: ["message", "services"],
};

const safeText = (value, fallback, maxLength = 240) => {
  const text = String(value ?? "").trim();
  return (text || fallback).slice(0, maxLength);
};

function sanitizeService(service) {
  return {
    category: CATEGORIES.includes(service.category) ? service.category : "Otro",
    code: safeText(service.code, "", 40),
    name: safeText(service.name, "Concepto por definir", 120),
    description: safeText(service.description, "Descripción por definir.", 320),
    duration: safeText(service.duration, "Por confirmar", 60),
    capacity: safeText(service.capacity, "Pieza", 40),
    quantity: Math.min(9999, Math.max(1, Math.round(Number(service.quantity) || 1))),
    price: Math.max(0, Number(service.price) || 0),
    deliverable: safeText(service.deliverable, "", 160),
  };
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método no permitido." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (
    !apiKey ||
    apiKey === "undefined" ||
    apiKey.startsWith("pega_aqui_")
  ) {
    return response.status(503).json({
      error: "NORA aún no tiene configurada la variable GEMINI_API_KEY.",
      code: "KEY_NOT_CONFIGURED",
    });
  }

  const prompt = String(request.body?.prompt ?? "").trim();
  const currency = request.body?.currency === "USD" ? "USD" : "MXN";

  if (prompt.length < 8) {
    return response.status(400).json({
      error: "Describe lo que necesitas cotizar con un poco más de detalle.",
    });
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return response.status(400).json({
      error: `El dictado debe tener menos de ${MAX_PROMPT_LENGTH} caracteres.`,
    });
  }

  const instruction = [
    "Eres NORA, asistente de cotizaciones de HAFTEN, distribuidor mexicano de equipos HVAC/R, BMS, medición y ahorro de energía.",
    "Convierte exclusivamente el texto del usuario en uno o varios conceptos de cotización (equipos, refacciones o servicios).",
    "Cuando el usuario mencione un producto del catálogo, usa su nombre y código reales:",
    CATALOG_HINT,
    `La moneda de la cotización es ${currency}.`,
    "No inventes precios, tiempos de entrega ni observaciones: usa los valores de respaldo definidos en el esquema.",
    "El precio siempre es unitario, numérico y sin IVA.",
    "No agregues explicaciones fuera del JSON.",
    `Texto del usuario: ${prompt}`,
  ].join("\n");

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: instruction }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 900,
            responseMimeType: "application/json",
            responseSchema: serviceSchema,
            thinkingConfig: {
              thinkingLevel: "minimal",
            },
          },
        }),
        signal: AbortSignal.timeout(20_000),
      },
    );

    const payload = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API error", geminiResponse.status, payload?.error?.message);
      return response.status(geminiResponse.status === 429 ? 429 : 502).json({
        error:
          geminiResponse.status === 429
            ? "NORA llegó al límite temporal. Intenta nuevamente en un momento."
            : "NORA no pudo interpretar la solicitud en este momento.",
      });
    }

    const text = payload?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("");
    const result = JSON.parse(text);
    const services = Array.isArray(result.services)
      ? result.services.slice(0, 8).map(sanitizeService)
      : [];

    if (!services.length) {
      throw new Error("Gemini returned no services");
    }

    return response.status(200).json({
      message: safeText(result.message, `${services.length} concepto(s) listo(s).`, 140),
      services,
    });
  } catch (error) {
    console.error("NORA request failed", error);
    return response.status(502).json({
      error: "NORA no pudo completar la solicitud. Revisa la conexión e intenta otra vez.",
    });
  }
}
