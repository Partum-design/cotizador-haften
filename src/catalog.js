// Catálogo de productos Haften (tomado del sitio haften.com.mx).
// Los precios se capturan en cada cotización: el catálogo solo precarga
// nombre, modelo, marca, descripción e imagen.

export const CATEGORIES = [
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

const P = "/productos";
const DOCS = "https://haften.com.mx/Documentos";

const humidifiers = [
  {
    code: "SKE",
    name: "Humidificador eléctrico SKE",
    image: `${P}/ske-600x600.png`,
    description:
      "Humidificador de vapor eléctrico de 2.7 a 136 kg/h, cámara de acero inoxidable removible sin herramientas, sistema AFEC y comunicación BACnet MS/TP o Modbus.",
  },
  {
    code: "SKS",
    name: "Humidificador vapor-vapor SKS",
    image: `${P}/sks4-600x600.png`,
    description:
      "Humidificador vapor a vapor de 8 a 570 kg/h con intercambiadores de acero inoxidable, válvula de globo con actuador Neptronic y gestión integral de incrustaciones.",
  },
  {
    code: "SKG",
    name: "Humidificador a gas SKG",
    image: `${P}/skg4-600x600.png`,
    description:
      "Humidificador a gas de 50 a 370 kg/h, relación de reducción hasta 40:1, eficiencia de combustión de 83 % a 87 % y quemador autoajustable por altitud.",
  },
  {
    code: "SKH",
    name: "Humidificador de alta presión SKH",
    image: `${P}/skh4-600x600.png`,
    description:
      "Sistema adiabático de alta presión (70 bar) de 100 a 1250 kg/h para humidificación y enfriamiento, con bomba de acero inoxidable y hasta cuatro zonas.",
  },
  {
    code: "SKVF",
    name: "Enfriador evaporativo SKVF",
    image: `${P}/ske-600x600.png`,
    description:
      "Enfriador evaporativo para aplicaciones a gran escala con ventiladores moduladores de bajo consumo y control de temperatura o humedad.",
  },
  {
    code: "SKRO",
    name: "Sistema de ósmosis inversa SKRO",
    image: `${P}/skro-600x600.png`,
    description:
      "Tratamiento de agua por ósmosis inversa para humidificadores Neptronic; elimina sólidos disueltos, sales y bacterias y reduce el mantenimiento.",
  },
  {
    code: "SKV",
    name: "Humidificador evaporativo SKV",
    image: `${P}/skv-600x600.png`,
    description:
      "Humidificador evaporativo de medio húmedo en cascada con hasta 12 °C de enfriamiento por evaporación.",
  },
  {
    code: "SKD",
    name: "Humidificador de vapor directo SKD",
    image: `${P}/hd12-600x600.png`,
    description:
      "Distribución Multi-Steam de vapor directo con diseño personalizado y controlador electrónico SKDESC.",
  },
  {
    code: "SKR",
    name: "Humidificador residencial SKR",
    image: `${P}/skr-600x600.png`,
    description: "Humidificador Neptronic para aplicaciones residenciales.",
  },
].map((item) => ({ ...item, category: "Humidificadores", brand: "Neptronic", unit: "Equipo" }));

const thermostats = [
  ["AC223-A2", "Serie AC223-A2"],
  ["AC223-E1", "Serie AC223-E1"],
  ["AC223-M2", "Modelo AC223 M2 1S LP 24"],
  ["ALT", "Serie ALT"],
  ["ALT-CPH-1S", "Serie ALT-CPH-1S"],
  ["BAST-221-321", "Serie BAST-221-321"],
  ["BAST-421", "Serie BAST-421"],
  ["EXT-CF24", "Serie EXT-CF24"],
  ["EXT-CF230", "Serie EXT-CF230"],
  ["EXT-RCx", "Serie EXT-RCF/RCPB"],
  ["GA-B", "Serie GA-B"],
  ["HRO", "Serie HRO"],
  ["HT1000", "Serie HT1000"],
  ["HT5000HC11", "Serie HT5000HC11"],
  ["HTW-WF06-FC", "Serie HTW-WF06-FC"],
  ["MTS", "Serie MTS"],
  ["NEST 3A", "Termostato Nest 3a generación", "Google Nest"],
  ["NEST 4TA", "Termostato Nest 4a generación", "Google Nest"],
  ["P722U", "Serie P722U"],
  ["TAS24", "Serie TAS24"],
  ["TAS400", "Serie TAS400"],
  ["TAT-SUPER", "Serie TAT-SUPER"],
  ["TBS24", "Serie TBS24"],
  ["TEC3000", "Serie TEC3000", "Johnson Controls"],
  ["TEC4000S", "Termostato TEC 4000S", "Johnson Controls"],
  ["TRS-HT4-01", "Serie TRS-HT4-01"],
  ["TUCB-TUHB", "Serie TUCB-TUHB"],
  ["TUUB", "Serie TUUB"],
].map(([code, name, brand = ""]) => ({
  category: "Termostatos y controladores",
  code,
  name: name.startsWith("Serie") ? `Termostato / controlador ${name.replace("Serie ", "")}` : name,
  brand,
  unit: "Pieza",
  image: "",
  description: `Termostato / controlador para sistemas HVAC. Ficha técnica: ${DOCS}/${encodeURI(code)}.pdf`,
}));

const valves = [
  {
    code: "EXT-SW",
    name: "Válvulas EXT-SW",
    brand: "",
    description: "Válvulas para control de agua en sistemas HVAC.",
  },
  ...["AL40MET3", "AL50MET3", "AL75MET3", "AL100MET3"].map((code) => ({
    code,
    name: `Medidor ${code}`,
    brand: "",
    description: `Medidor de flujo ${code} para agua en sistemas de climatización.`,
  })),
  {
    code: "Energy Valve",
    name: "Belimo Energy Valve",
    brand: "Belimo",
    description:
      "Válvula de control independiente de la presión con medición de energía, para optimizar el desempeño de serpentines.",
  },
  {
    code: "FlowCon",
    name: "Válvula independiente de la presión FlowCon",
    brand: "FlowCon",
    description: "Sistema de ahorro de energía con válvulas de control independientes de la presión.",
  },
].map((item) => ({ ...item, category: "Válvulas y medidores", unit: "Pieza", image: "" }));

const others = [
  {
    category: "Deshumidificadores",
    code: "MiniPAC MP",
    name: "Deshumidificador compacto MiniPAC",
    brand: "Bry-Air",
    unit: "Equipo",
    image: `${P}/deshumidificador.png`,
    description:
      "Deshumidificador desecante compacto, independiente o conectado al aire acondicionado central; controla la humedad hasta en 10,000 ft².",
  },
  {
    category: "Deshumidificadores",
    code: "FLI",
    name: "Deshumidificador desecante FLI",
    brand: "Bry-Air",
    unit: "Equipo",
    image: `${P}/deshumidificador.png`,
    description: "Deshumidificador desecante de alta capacidad para aplicaciones industriales.",
  },
  {
    category: "Calefactores",
    code: "Bobina abierta",
    name: "Calefactor eléctrico de bobina abierta",
    brand: "Neptronic",
    unit: "Equipo",
    image: `${P}/calefactor.png`,
    description:
      "Calefactor para ducto de 0.5 a 1000 kW, hasta 40 kW/ft², elementos NiCr, controlador HEC integrado y sensores de flujo de aire EAS.",
  },
  {
    category: "Calefactores",
    code: "Tubular",
    name: "Calefactor eléctrico tubular / tubular aleteado",
    brand: "Neptronic",
    unit: "Equipo",
    image: `${P}/calefactor.png`,
    description:
      "Calefactor tubular (hasta 13 kW/ft²) o tubular aleteado (hasta 15 kW/ft²) con elementos sin contacto directo con el aire y controlador HEC.",
  },
  {
    category: "Sensores y transmisores",
    code: "Sensores muro",
    name: "Sensores y transmisores en muro",
    brand: "Belimo",
    unit: "Pieza",
    image: "",
    description: "Sensores de temperatura, humedad y calidad de aire para montaje en muro.",
  },
  {
    category: "Sensores y transmisores",
    code: "CDT-S",
    name: "Transmisor de CO₂ serie CDT-S",
    brand: "Dwyer",
    unit: "Pieza",
    image: "",
    description: "Transmisor de dióxido de carbono para monitoreo de calidad del aire interior.",
  },
  {
    category: "Sensores y transmisores",
    code: "Air Monitor",
    name: "Estación de medición de flujo de aire",
    brand: "Air Monitor",
    unit: "Pieza",
    image: "",
    description: "Medición de flujo de aire para control preciso en unidades manejadoras y ductos.",
  },
  {
    category: "Ahorro de energía",
    code: "CoolAutomation",
    name: "Integración CoolAutomation",
    brand: "CoolAutomation",
    unit: "Sistema",
    image: "",
    description: "Integración y control centralizado de equipos VRF/mini split hacia sistemas BMS.",
  },
  {
    category: "Servicio e instalación",
    code: "SRV-ARR",
    name: "Arranque y puesta en marcha",
    brand: "Haften",
    unit: "Servicio",
    image: "",
    description: "Arranque, configuración y checklist de puesta en marcha del equipo en sitio.",
  },
  {
    category: "Servicio e instalación",
    code: "SRV-INS",
    name: "Instalación",
    brand: "Haften",
    unit: "Servicio",
    image: "",
    description: "Instalación mecánica y eléctrica del equipo según manual IOM del fabricante.",
  },
  {
    category: "Servicio e instalación",
    code: "SRV-MTO",
    name: "Mantenimiento preventivo",
    brand: "Haften",
    unit: "Servicio",
    image: "",
    description: "Mantenimiento preventivo, limpieza y revisión de parámetros de operación.",
  },
];

export const CATALOG = [...humidifiers, ...others, ...thermostats, ...valves].map(
  (item, index) => ({ ...item, catalogId: `cat-${index}` }),
);
