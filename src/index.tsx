import { useEffect } from "react";
import { List, ActionPanel, Action, Icon, Toast, showToast } from "@raycast/api";
import { SWRConfig } from "swr";
import { useWishList } from "./utils/useWishList";
import GameDetail from "./components/GameDetail";
import { cacheProvider } from "./utils/cache";

export default function Command() {
  const wishList = useWishList();
  useEffect(() => {
    wishList.update();
  });

  return (
    <SWRConfig value={{ provider: cacheProvider }}>
      <List>
        {wishList.value?.map((item, index) => (
          <List.Item
            key={index}
            title={item.name as string}
            subtitle={item.currentPrice ? item.currentPrice + "  " + item.discount + "%" : ""}
            actions={
              <ActionPanel>
                <Action.Push icon={Icon.Sidebar} title="View Game Details" target={<GameDetail item={item} />} />
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
          />
        ))}
      </List>
    </SWRConfig>
  );
}
