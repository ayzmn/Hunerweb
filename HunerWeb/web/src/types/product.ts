export interface Product {
  UrunKod: string;
  Aciklama: string;
  Fiyat: string;
  UrunGrup: string;
  UrunGrupAciklama: string;
  UrunImage: string;
  USTGrup: string;
  USTGrupAciklama: string;
  UstGrupImage: string;
  ALTGrup: string;
  ALTGrupAciklama: string;
  AltGrupImage: string;
  KullananUrunKod: string;
}

export interface AltGrupNode {
  key: string;
  name: string;
  image?: string;
  products: Product[];
}

export interface GrupNode {
  key: string;
  name: string;
  image?: string;
  altGrups: AltGrupNode[];
}

export interface UstGrupNode {
  key: string;
  name: string;
  image?: string;
  grups: GrupNode[];
}
