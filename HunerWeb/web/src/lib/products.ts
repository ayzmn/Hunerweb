import type { Product, UstGrupNode, GrupNode, AltGrupNode } from "@/types/product";

export const CATEGORY_IMAGES: Record<string, string> = {
  "MIG-WEC-S-TORCH": "/images/U_MIG-Torch.jpg",
  "MIG-WEC-TORCH": "/images/U_MIG-Torch.jpg",
  "MIG-AT-DT-TORCH": "/images/U_MIG-Torch.jpg",
  "MIG-KIRBAC-TORCH": "/images/U_MIG-Torch.jpg",
  "TIG-SIVICLI": "/images/U_TIG-Torch.jpg",
  "TIG-MUSLUKLU": "/images/U_TIG-Torch.jpg",
  "YP-MIG": "/images/U_YP-1.jpg",
  "YP-TIG": "/images/U_YP-2.jpg",
  "YP-TEL": "/images/U_TelSurme.jpg",
  "YP-SU": "/images/U_SuSogutma.jpg",
  "CO2-ISITICI-UNITE": "/images/U_Karbondioksit.jpg",
  "SUSOGUTMA-UNITE": "/images/U_SuSogutma.jpg",
  "PEL-ELEKTROD": "/images/U_Plazma-1.jpg",
  "PEL-MEME": "/images/U_Plazma-2.jpg",
  "PEL-SAF": "/images/U_Plazma-1.jpg",
  "PEL-TUNGSTEN": "/images/U_Plazma-2.jpg",
  "ELEKTRONIKKART-UNITE": "/images/U_YP-3.jpg",
  "GAZVALF-UNITE": "/images/U_YP-3.jpg",
};

export const ANA_KATEGORI_LABELS: Record<string, string> = {
  MIG: "MIG Torçları",
  TIG: "TIG Torçları",
  YP: "Yedek Parça",
  UNITE: "Üniteler",
  PLAZMA: "Plazma",
};

export function buildHierarchy(products: Product[]): UstGrupNode[] {
  const ustMap = new Map<string, UstGrupNode>();

  for (const p of products) {
    if (!p.USTGrup || p.USTGrup === "#N/A" || p.USTGrupAciklama === "#N/A") continue;

    if (!ustMap.has(p.USTGrup)) {
      ustMap.set(p.USTGrup, {
        key: p.USTGrup,
        name: p.USTGrupAciklama,
        grups: [],
        image: CATEGORY_IMAGES[p.USTGrup],
      });
    }

    const ustNode = ustMap.get(p.USTGrup)!;
    let grupNode = ustNode.grups.find((g) => g.key === p.GRUP + "_" + p.USTGrup);

    if (!grupNode) {
      grupNode = { key: p.GRUP + "_" + p.USTGrup, name: p.GRUPAciklama, altGrups: [] };
      ustNode.grups.push(grupNode);
    }

    let altNode = grupNode.altGrups.find((a) => a.key === p.ALTGrup);
    if (!altNode) {
      altNode = { key: p.ALTGrup, name: p.ALTGrupAciklama, products: [] };
      grupNode.altGrups.push(altNode);
    }

    altNode.products.push(p);
  }

  return Array.from(ustMap.values());
}

export function groupByAnaKategori(nodes: UstGrupNode[]): Record<string, UstGrupNode[]> {
  const groups: Record<string, UstGrupNode[]> = {
    MIG: [],
    TIG: [],
    YP: [],
    UNITE: [],
    PLAZMA: [],
  };

  for (const node of nodes) {
    if (node.key.startsWith("MIG-")) groups.MIG.push(node);
    else if (node.key.startsWith("TIG-")) groups.TIG.push(node);
    else if (node.key.startsWith("YP-")) groups.YP.push(node);
    else if (node.key.startsWith("PEL-")) groups.PLAZMA.push(node);
    else groups.UNITE.push(node);
  }

  return groups;
}
