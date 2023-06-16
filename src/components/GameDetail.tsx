import { Action, ActionPanel, Detail, Icon, showToast, Toast } from "@raycast/api";
import { GameData, GameSimple } from "../types";
import { useGameDetail } from "../apis/fetches";
import { useWishList } from "../utils/useWishList";

const GameDetail = ({ item }: { item: GameSimple }) => {
  const appid = item.appid;
  const { data: gameDetail, isError: error } = useGameDetail<GameData>({ appid });
  const wishList = useWishList();
  const lightGrey = "#cccccc";
  const markdown = gameDetail
    ? `
![Game header image](${gameDetail.header_image})

${gameDetail.short_description}

`
    : null;

  return (
    <Detail
      isLoading={!gameDetail}
      navigationTitle={gameDetail?.name}
      markdown={error ? error?.message : markdown}
      actions={
        <ActionPanel>
          <Action
            icon={Icon.Sidebar}
            title="Add to Wishlist"
            onAction={() => {
              wishList.add(item);
              showToast({ title: "Added to Wishlist", style: Toast.Style.Success });
            }}
            shortcut={{ modifiers: ["opt"], key: "a" }}
          />
          <Action
            icon={Icon.Sidebar}
            title="Remove From Wishlist"
            style={Action.Style.Destructive}
            onAction={() => {
              wishList.remove(item);
              showToast({ title: "Removed from Wishlist", style: Toast.Style.Success });
            }}
            shortcut={{ modifiers: ["opt"], key: "r" }}
          />
        </ActionPanel>
      }
      metadata={
        error ? null : (
          <Detail.Metadata>
            {gameDetail?.price_overview ? (
              <>
                <Detail.Metadata.Label title="Initial Price" text={gameDetail?.price_overview.initial_formatted} />
                <Detail.Metadata.Label title="Current Price" text={gameDetail?.price_overview.final_formatted} />
                <Detail.Metadata.Label
                  title="Discount Percent"
                  text={gameDetail?.price_overview.discount_percent + "%"}
                />
              </>
            ) : null}
            {gameDetail?.release_date?.date ? (
              <Detail.Metadata.Label title="Release Date" text={gameDetail?.release_date?.date} />
            ) : null}
            {gameDetail?.metacritic?.url ? (
              <Detail.Metadata.Link
                title="Data"
                text={
                  gameDetail?.metacritic?.score
                    ? `Metacritic: ${gameDetail?.metacritic?.score.toString()}`
                    : "Metacritic"
                }
                target={gameDetail.metacritic.url}
              />
            ) : null}
            {gameDetail?.developers?.length > 0 ? (
              <Detail.Metadata.TagList title="Developers">
                <Detail.Metadata.TagList.Item color={"#67c0f4"} text={gameDetail?.developers[0]} />
              </Detail.Metadata.TagList>
            ) : null}
            {gameDetail?.categories?.length > 0 ? (
              <>
                <Detail.Metadata.Separator />
                <Detail.Metadata.TagList title="Categories">
                  {gameDetail?.categories[0]?.description ? (
                    <Detail.Metadata.TagList.Item color={lightGrey} text={gameDetail?.categories[0]?.description} />
                  ) : null}
                  {gameDetail?.categories[1]?.description ? (
                    <Detail.Metadata.TagList.Item color={lightGrey} text={gameDetail?.categories[1]?.description} />
                  ) : null}
                  {gameDetail?.categories[2]?.description ? (
                    <Detail.Metadata.TagList.Item color={lightGrey} text={gameDetail?.categories[2]?.description} />
                  ) : null}
                  {gameDetail?.categories[3]?.description ? (
                    <Detail.Metadata.TagList.Item color={lightGrey} text={gameDetail?.categories[3]?.description} />
                  ) : null}
                  {gameDetail?.categories[4]?.description ? (
                    <Detail.Metadata.TagList.Item color={lightGrey} text={gameDetail?.categories[4]?.description} />
                  ) : null}
                </Detail.Metadata.TagList>
              </>
            ) : null}
            {gameDetail?.platforms ? <Detail.Metadata.Separator /> : null}
            {gameDetail?.platforms ? (
              <Detail.Metadata.TagList title="Platform">
                {gameDetail.platforms?.windows && <Detail.Metadata.TagList.Item text="Windows" color={"#7eba43"} />}
                {gameDetail.platforms?.mac && <Detail.Metadata.TagList.Item text="Mac" color={"#512f5f"} />}
                {gameDetail.platforms?.linux && <Detail.Metadata.TagList.Item text="Linux" color={"#1893d1"} />}
              </Detail.Metadata.TagList>
            ) : null}
            {gameDetail?.steam_appid || gameDetail?.website ? <Detail.Metadata.Separator /> : null}
            {gameDetail?.steam_appid ? (
              <Detail.Metadata.Link
                title=""
                target={`https://store.steampowered.com/app/${gameDetail.steam_appid}`}
                text="Steam Page"
              />
            ) : null}
            {gameDetail ? (
              <Detail.Metadata.Link
                title=""
                text="Steam Deck Support Info"
                target={"https://www.protondb.com/app/" + appid}
              />
            ) : null}
          </Detail.Metadata>
        )
      }
    />
  );
};

export default GameDetail;
