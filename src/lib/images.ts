export const UNSPLASH_ID = {
  hero: "1600607687939-ce8a6c25118c",
  heroLiving: "1616486338812-3dadae4b4ace",
  livingWarm: "1522708323590-d24dbb6b0267",
  livingBeige: "1618221195710-dd6b41faaea6",
  interiorModern: "1586023492125-27b2c045efd7",
  decorShelf: "1556228453-efd6c1ff04f6",
  roomCurtains: "1598928506311-c55ded91a20c",
  roomCorner: "1600121848594-d8644e57abab",
  homePlant: "1616627561950-9f746e330187",
  bedroomWarm: "1505693416388-ac5ce068fe85",
  cozyHome: "1513694203232-719a280e022f",
  aboutCraft: "1615873968403-89e068629265",
  kitchen: "1556910103-1c02745aae4d",
  kitchenB: "1519947486511-46149fa0a254",
  spaStone: "1584100936595-c0654b55a2e2",
  spaBath: "1544161515-4ab6ce6db874",
  candleAmber: "1603006905003-be475563bc59",
  candleWhite: "1602874801007-bd458bb1b8b6",
  candleJar: "1600334129128-685c5582fd35",
  candleGlow: "1519710164239-da123dc03ef4",
  candleFlame: "1543589077-47d81606c1bf",
  candleSmoke: "1582719471384-894fbb16e074",
  candleSet: "1572726729207-a78d6feb18d7",
  candleTin: "1611930022073-b7a4ba5fcccd",
  candleOnTable: "1517512006864-7edc3b933137",
  candleDark: "1495107334309-fcf20504a5ab",
  diffuserReed: "1608571423902-eed4a5ad8108",
  diffuserGold: "1592945403244-b3fbafd7f539",
  diffuserBottle: "1615634260167-c8cdede054de",
  xmasTree: "1512389098783-66b81f86e199",
  xmasTreeLit: "1481070555726-e2fe8357725c",
  xmasDecor: "1513885535751-8b9238bd345a",
  xmasHome: "1481026469463-66327c86e544",
  xmasBaubles: "1606313564200-e75d5e30476c",
  xmasFire: "1506784983877-45594efa4cbe",
  instaLiving: "1616594039964-ae9021a400a0",
  hotChocolate: "1583847268964-b28dc8f51f92",
  latteArt: "1511537190424-bbbab87ac5eb",
  chocolate: "1481391319762-47dff72954d9",
  lavender: "1526047932273-341f2a7631f9",
} as const;

export type ImageKey = keyof typeof UNSPLASH_ID;

const BASE = "https://images.unsplash.com";

/** Build an optimized Unsplash URL for the given image key. */
export function u(key: ImageKey): string {
  return `${BASE}/photo-${UNSPLASH_ID[key]}?auto=format&fit=crop&q=80`;
}

export function uw(key: ImageKey, w: number): string {
  return `${BASE}/photo-${UNSPLASH_ID[key]}?auto=format&fit=crop&w=${w}&q=80`;
}
