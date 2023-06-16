import { useCachedState } from "@raycast/utils";
import { GameSimple, PriceOverview } from "../types";
import { fetchGamesPrice } from "../apis/fetches";

export const useWishList = () => {
  const [wishList, setWishList] = useCachedState("wishList", [] as GameSimple[]);

  const add = (game: GameSimple) => {
    if (wishList.some((g) => g.appid === game.appid)) {
      return;
    }
    setWishList(wishList.concat(game));
  };

  const remove = (game: GameSimple) => {
    setWishList(wishList.filter((g) => g.appid !== game.appid));
  };

  const update = async () => {
    const toUpdateIds = wishList
      .filter((g) => !g.lastUpdated || g.lastUpdated !== new Date().toLocaleDateString())
      .map((g) => g.appid)
      .join(",");

    if (!toUpdateIds) {
      return;
    }
    const pricesData = await fetchGamesPrice(toUpdateIds);

    for (const [appid, price] of Object.entries<PriceOverview>(pricesData)) {
      setWishList(
        wishList.map((item) =>
          item.appid.toString() === appid
            ? {
                ...item,
                currentPierce: price.data.price_overview.final_formatted,
                discount: price.data.price_overview.discount_percent,
                lastUpdated: new Date().toLocaleDateString(),
              }
            : { ...item }
        )
      );
    }
  };

  return {
    value: wishList,
    add,
    remove,
    update,
  };
};
