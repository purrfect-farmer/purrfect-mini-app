import {} from "react-icons/hi2";

import copy from "copy-to-clipboard";
import { IoChatbubblesOutline, IoFlashOutline } from "react-icons/io5";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";
import { cn } from "./lib/utils";

function App() {
  /** User */
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  /** Copy Username */
  const copyUsername = useCallback(() => copy(`@${user?.username}`), [user]);

  /** Copy User ID */
  const copyUserId = useCallback(() => copy(user?.id), [user]);

  /** Open Telegram Link */
  const openTelegramLink = useCallback(
    (link) => window.Telegram?.WebApp?.openTelegramLink(link),
    []
  );

  /** Open Channel */
  const openChannel = useCallback(() => {
    openTelegramLink("https://t.me/purrfect_community");
  }, [openTelegramLink]);

  /** Open Chat */
  const openChat = useCallback(() => {
    openTelegramLink("https://t.me/purrfect_community_chat");
  }, [openTelegramLink]);

  /** Configure Telegram App */
  useEffect(() => {
    window.Telegram?.WebApp?.disableVerticalSwipes();
    window.Telegram?.WebApp?.expand();
  }, []);

  return (
    <div className="flex flex-col p-4 min-h-dvh">
      <div className="flex flex-col w-full max-w-xs gap-2 m-auto">
        {/* Logo */}
        <img src={Icon} className="h-24 mx-auto" />

        <div className="flex flex-col gap-2">
          {/* Title */}
          <h1 className="text-3xl leading-none text-center text-orange-500 font-turret-road">
            Purrfect
          </h1>

          {user ? (
            <div className="flex items-center gap-4 p-3 bg-black rounded-full">
              {/* User Photo */}
              <img
                className="rounded-full w-11 h-11 shrink-0"
                src={user?.["photo_url"]}
              />

              <div className="flex flex-col min-w-0 min-h-0 pr-2 text-sm grow">
                {/* First and Last Name */}
                <p className="font-bold text-purple-500 truncate">
                  {user?.["first_name"] || user?.["last_name"]
                    ? `${user?.["first_name"] || ""} ${
                        user?.["last_name"] || ""
                      }`
                    : " Telegram User"}
                </p>

                {/* Username */}
                {user?.username ? (
                  <p
                    onClick={copyUsername}
                    className="text-yellow-500 truncate"
                  >
                    @{user?.username}
                  </p>
                ) : null}

                {/* User ID */}
                <p onClick={copyUserId} className="truncate text-lime-500">
                  ID: {user?.id}
                </p>
              </div>
            </div>
          ) : (
            <p className="p-2 text-sm text-center text-yellow-500 bg-black rounded-full">
              Telegram Mini-Apps Automation Tool
            </p>
          )}
        </div>

        {/* Channel & Chat */}
        <div className="flex items-center justify-center text-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={openChannel}
              className={cn(
                "px-4 py-2 rounded-full",
                "flex items-center gap-2",
                "bg-purple-300 text-black"
              )}
            >
              <IoFlashOutline />
              Channel
            </button>
            <button
              onClick={openChat}
              className={cn(
                "px-4 py-2 rounded-full",
                "flex items-center gap-2",
                "bg-lime-300 text-black"
              )}
            >
              <IoChatbubblesOutline />
              Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
