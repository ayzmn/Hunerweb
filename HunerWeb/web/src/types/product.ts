export interface Product {
  UrunKod: string;
  Aciklama: string;
  Fiyat: string;
  GRUP: string;
  GRUPAciklama: string;
  USTGrup: string;
  USTGrupAciklama: string;
  ALTGrup: string;
  ALTGrupAciklama: string;
  KullananUrunKod: string;
}

export interface AltGrupNode {
  key: string;
  name: string;
  products: Product[];
}

export interface GrupNode {
  key: string;
  name: string;
  altGrups: AltGrupNode[];
}

export interface UstGrupNode {
  key: string;
  name: string;
  grups: GrupNode[];
  image?: string;
}
