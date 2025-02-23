import {} from "react-icons/hi2";

import copy from "copy-to-clipboard";
import { IoChatbubblesOutline, IoFlashOutline } from "react-icons/io5";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";
import { cn } from "./lib/utils";

function App() {
  /** Copy Username */
  const copyUsername = useCallback(
    () => copy(`@${window.Telegram?.WebApp?.initDataUnsafe?.user?.username}`),
    []
  );

  /** Copy User ID */
  const copyUserId = useCallback(
    () => copy(window.Telegram?.WebApp?.initDataUnsafe?.user?.id),
    []
  );

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

          <div className="flex items-center gap-4 p-3 rounded-full bg-neutral-900">
            {/* User Photo */}
            <img
              className="rounded-full w-11 h-11 shrink-0"
              src={window.Telegram?.WebApp?.initDataUnsafe?.user?.["photo_url"]}
            />

            <div className="flex flex-col min-w-0 min-h-0 text-sm grow pr-2">
              {/* First and Last Name */}
              <p className="font-bold text-purple-500 truncate">
                {window.Telegram?.WebApp?.initDataUnsafe?.user?.[
                  "first_name"
                ] || "Telegram"}{" "}
                {window.Telegram?.WebApp?.initDataUnsafe?.user?.["last_name"] ||
                  "User"}
              </p>

              {/* Username */}
              {window.Telegram?.WebApp?.initDataUnsafe?.user?.username ? (
                <p onClick={copyUsername} className="text-yellow-500 truncate">
                  @{window.Telegram?.WebApp?.initDataUnsafe?.user?.username}
                </p>
              ) : null}

              {/* User ID */}
              <p onClick={copyUserId} className="truncate text-lime-500">
                ID: {window.Telegram?.WebApp?.initDataUnsafe?.user?.id}
              </p>
            </div>
          </div>
        </div>

        {/* Channel & Chat */}
        <div className="flex justify-center items-center text-sm">
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
