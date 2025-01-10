import copy from "copy-to-clipboard";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";

function App() {
  /** User */
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

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
    openTelegramLink("https://t.me/purrfect_group_chat");
  }, [openTelegramLink]);

  /** Copy Username */
  const copyUsername = useCallback(
    () => copy(`@${user?.username || "purrfect_little_bot"}`),
    [user?.username]
  );

  /** Configure Telegram App */
  useEffect(() => {
    window.Telegram?.WebApp?.disableVerticalSwipes();
    window.Telegram?.WebApp?.expand();
  }, []);

  return (
    <div className="flex flex-col p-4 min-h-dvh">
      <div className="flex flex-col w-full max-w-xs gap-4 m-auto">
        {/* Logo */}
        <img src={Icon} className="h-24 mx-auto" />

        <div className="flex flex-col gap-2">
          {/* Title */}
          <h1 className="text-3xl leading-none text-center text-orange-500 font-turret-road">
            Purrfect
          </h1>

          <div className="flex gap-2 p-2 rounded-lg bg-neutral-900">
            <img
              className="rounded-full shrink-0 w-9 h-9"
              src={user?.["photo_url"]}
            />

            <div className="flex flex-col min-w-0 min-h-0 text-sm grow">
              <p className="font-bold text-purple-500">
                {user?.["first_name"] || "Purrfect"}{" "}
                {user?.["last_name"] || "Bot"}
              </p>
              <p onClick={copyUsername} className="font-bold text-yellow-500">
                @{user?.username || "purrfect_little_bot"}
              </p>
              <p className="font-bold text-lime-500">ID: {user?.id || 1}</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <button
            onClick={openChannel}
            className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-full"
          >
            Open Community
          </button>
          <button
            onClick={openChat}
            className="px-4 py-2 text-sm font-bold text-white rounded-full bg-lime-500"
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
