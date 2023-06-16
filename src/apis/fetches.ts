import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";
import useSWR from "swr";
import { GameSimple, GameDataResponse, GamesPriceResponse, GameData } from "../types";

const countryCode = getPreferenceValues<Preferences>().countryCode;

async function fetchGames(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return ((await response.json()) as GameSimple[]) ?? [];
}

async function fetchGameData({ appid, url }: { appid: number; url: string }) {
  const response = await fetch(url);

  if (!response.ok) {
    throw Object.assign(new Error(`${response.status} ${response.statusText}`), { status: response.status });
  }
  const gameData = (await response.json()) as GameDataResponse;
  if (!gameData?.[appid]?.success) {
    throw Object.assign(new Error("Game not found"), { status: 404 });
  }

  return gameData?.[appid]?.data;
}

export async function fetchGamesPrice(appids: string) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appids}&cc=${countryCode}&filters=price_overview`;
  const response = await fetch(url);

  if (!response.ok) {
    throw Object.assign(new Error(`${response.status} ${response.statusText}`), { status: response.status });
  }
  return (await response.json()) as GamesPriceResponse;
}

export const useGameId = ({ term = "", cacheKey = 0, execute = true }) => {
  const { data, error, isValidating } = useSWR<GameSimple[]>(
    execute ? `https://steam-search.vercel.app/api/games?cacheKey=${cacheKey}&search=${term}` : null,
    fetchGames
  );

  return {
    data,
    isLoading: !data && !error && execute,
    isValidating,
    isError: error,
  };
};

export const useGameDetail = <T>({ appid = 0, execute = true }) => {
  const key = {
    appid,
    url: `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=${countryCode}`,
  };

  const { data, error, isValidating } = useSWR<GameData | undefined>(execute && appid ? key : null, fetchGameData, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 600_000, // 10 minutes
    dedupingInterval: 600_000, // 10 minutes
  });

  return {
    data: data as T,
    isLoading: !data && !error,
    isValidating,
    isError: error,
  };
};
