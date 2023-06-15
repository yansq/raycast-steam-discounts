import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useState } from "react";
import { useGameId } from "./apis/api";
import { useWishList } from "./utils/useWishList";
import GameDetail from "./components/GameDetail";

export default function Command() {
  const [searchContent, setSearchContent] = useState("");
  const { data: gameIds } = useGameId({ term: searchContent, execute: searchContent.length > 2 });
  const wishList = useWishList();

  const loading = () => {
    if (searchContent) {
      return !gameIds;
    }
    return false;
  };

  return (
    <List 
      isLoading={loading()} onSearchTextChange={setSearchContent}
      searchBarPlaceholder="Search games by name"
      throttle
    >
      {gameIds?.map((item) => (
        <List.Item 
          key={item.appid} 
          title={item.name as string}
          subtitle={item.appid?.toString()}
          actions={
            <ActionPanel>
              <Action.Push icon={Icon.Sidebar} title="View Game Details" 
                target={<GameDetail appid={item.appid} />} 
              />
              <Action 
                icon={Icon.Sidebar} 
                title="Add to Wishlist" 
                onAction={() => wishList.add(item)} 
                shortcut={{ modifiers: ["opt"], key: "enter" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
