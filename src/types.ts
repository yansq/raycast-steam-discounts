export type GameSimple = {
  appid: number;
  name: string;
  currentPrice?: string;
  discount?: number;
  lowestPierce?: string;
  lastUpdated?: string;
};

export type GameDataResponse = {
  [appid: number]: {
    success?: boolean;
    data?: GameData;
  };
};

export type GamesPriceResponse = Record<number, PriceOverview>;

export type PriceOverview = {
  success: boolean;
  data: {
    price_overview: {
      currency: string;
      initial: number;
      final: number;
      discount_percent: number;
      initial_formatted: string;
      final_formatted: string;
    };
  };
};

export type GameData = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string[];
  header_image: string;
  website: string;
  pc_requirements: {
    minimum: string;
    recommended: string;
  };
  mac_requirements: {
    minimum: string;
    recommended: string;
  };
  linux_requirements: {
    minimum: string;
    recommended: string;
  };
  developers: string[];
  publishers: string[];
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  metacritic: {
    score: number;
    url: string;
  };
  categories: {
    id: number;
    description: string;
  }[];
  genres: {
    id: number;
    description: string;
  }[];
  screenshots: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  }[];
  movies: {
    id: number;
    name: string;
    thumbnail: string;
    webm: string;
    highlight: boolean;
    description: string;
  }[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  background: string;
  legal_notice: string;
  release_date: {
    coming_soon: boolean;
    date: string;
  };
};
