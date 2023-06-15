import { useEffect } from "react";
import { List, ActionPanel, Action, Icon } from "@raycast/api";
import { useWishList } from "./utils/useWishList";
import GameDetail from "./components/GameDetail";

export default function Command() {
  const wishList = useWishList();
  useEffect(() => {
    wishList.update();
  })

  return (
    <List>
      {wishList.value?.map((item, index) => (
        <List.Item 
          key={index} 
          title={item.name} 
          subtitle={item.currentPierce && item.discount ? item.currentPierce + " " + item.discount + "%" : ""}
          actions={
            <ActionPanel>
              <Action.Push icon={Icon.Sidebar} title="View Game Details" 
                target={<GameDetail appid={item.appid} />} 
              />
              <Action 
                icon={Icon.Sidebar} 
                title="Remove From Wishlist" 
                onAction={() => wishList.remove(item)} 
                shortcut={{ modifiers: ["opt"], key: "enter" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
