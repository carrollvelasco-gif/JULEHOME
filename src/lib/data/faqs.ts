import type { Faq } from "@/types";

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "¿Cuánto tarda el envío?",
    answer:
      "Los pedidos se preparan en 24–48 horas laborables y se entregan en 2–4 días. Ofrecemos envío gratuito a partir de 250.000 COP y envío express disponible en el checkout.",
    category: "Envíos",
  },
  {
    id: "f2",
    question: "¿Qué cera utilizáis?",
    answer:
      "Trabajamos con cera de soja 100 % natural, de origen sostenible y sin aditivos. Nuestras mechas son de algodón sin plomo y todos los aromas utilizan aceites esenciales de alta calidad.",
    category: "Producto",
  },
  {
    id: "f3",
    question: "¿Cuántas horas dura una vela?",
    answer:
      "Depende del formato, pero la mayoría de nuestras velas ofrecen entre 40 y 60 horas de combustión limpia. Cada ficha de producto indica la duración estimada exacta.",
    category: "Producto",
  },
  {
    id: "f4",
    question: "¿Cómo cuido mi vela para que dure más?",
    answer:
      "Deja que la capa superior de cera se funda por completo en el primer encendido (1–2 horas). Recorta la mecha a 5 mm antes de cada uso y evita encenderla más de 4 horas seguidas.",
    category: "Producto",
  },
  {
    id: "f5",
    question: "¿Puedo solicitar un cambio?",
    answer:
      "En JULEHOME cada pieza es única y elaborada artesanalmente, por lo que no disponemos de cambios ni devoluciones. Si recibes tu pedido con algún daño, escríbenos en un plazo de 48 horas y lo solucionamos.",
    category: "Envíos",
  },
  {
    id: "f6",
    question: "¿Ofrecéis envueltos para regalo?",
    answer:
      "Sí. Todos nuestros sets y estuches de regalo incluyen presentación premium, y podemos añadir una tarjeta escrita a mano con tu mensaje. Selecciónalo en el checkout.",
    category: "Producto",
  },
  {
    id: "f7",
    question: "¿Cómo pago mi pedido?",
    answer:
      "Aceptamos tarjeta de crédito y débito, PayPal y transferencia. Todos los pagos se procesan de forma segura y cifrada; nunca almacenamos datos de pago.",
    category: "Pago",
  },
  {
    id: "f8",
    question: "¿Hacéis envíos internacionales?",
    answer:
      "De momento enviamos a toda la Unión Europea y a Reino Unido. Los plazos y costes se calculan automáticamente en el checkout según tu destino.",
    category: "Envíos",
  },
];

export const faqCategories = ["Todas", ...Array.from(new Set(faqs.map((f) => f.category)))];
