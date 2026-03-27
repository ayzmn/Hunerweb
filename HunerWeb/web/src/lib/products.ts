import type { Product, UstGrupNode } from "@/types/product";

const IMAGES_BASE = "/images/Urunler/";

function imgOrUndef(val: string | undefined): string | undefined {
  if (!val || val === "0") return undefined;
  return IMAGES_BASE + val;
}

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
        image: imgOrUndef(p.UstGrupImage),
        grups: [],
      });
    }

    const ustNode = ustMap.get(p.USTGrup)!;
    let grupNode = ustNode.grups.find((g) => g.key === p.UrunGrup + "_" + p.USTGrup);

    if (!grupNode) {
      grupNode = {
        key: p.UrunGrup + "_" + p.USTGrup,
        name: p.UrunGrupAciklama,
        image: imgOrUndef(p.UrunImage),
        altGrups: [],
      };
      ustNode.grups.push(grupNode);
    }

    let altNode = grupNode.altGrups.find((a) => a.key === p.ALTGrup);
    if (!altNode) {
      altNode = {
        key: p.ALTGrup,
        name: p.ALTGrupAciklama,
        image: imgOrUndef(p.AltGrupImage),
        products: [],
      };
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
