export interface Id {
    oid: string;
}

export interface Small {
    url: string;
    width: number;
    height: number;
}

export interface Medium {
    url: string;
    width: number;
    height: number;
}

export interface Large {
    url: string;
    width: number;
    height: number;
}

export interface Images {
    small: Small;
    medium: Medium;
    large: Large;
}

export interface Metadata {
    key: string;
    value: any;
}

export interface Catalognumberlist {
    CatalogNumberListElement: string[];
}

export interface Releasedate {
    $date: Date;
}

export interface Upclist {
    UPCListElement: string[];
}

export interface ProductModel {
    _id: Id;
    images: Images;
    description: string[];
    metadata: Metadata[];
    binding: string;
    brand: string;
    catalognumberlist: Catalognumberlist;
    ean: string;
    esrbagerating: string;
    feature: string[];
    format: string;
    genre: string;
    hardwareplatform: string;
    label: string;
    price: number;
    oldprice?: number;
    pricevariance: string;
    currency: string;
    manufacturer: string;
    model: string;
    mpn: string;
    numberofitems: number;
    operatingsystem: string;
    packagequantity: number;
    partnumber: string;
    platform: string[];
    productgroup: string;
    producttypename: string;
    publisher: string;
    releasedate: Releasedate;
    studio: string;
    title: string;
    upc: string;
    upclist: Upclist;
    category: string;
    salesrank: number;
}