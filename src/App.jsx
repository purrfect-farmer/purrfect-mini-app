import copy from "copy-to-clipboard";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";
import { cn } from "./lib/utils";

function App() {
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
    () =>
      copy(
        `@${
          window.Telegram?.WebApp?.initDataUnsafe?.user?.username ||
          "purrfect_little_bot"
        }`
      ),
    []
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

          {/* Username */}
          <div className="flex justify-center w-4/5 mx-auto">
            <p
              className={cn(
                "bg-orange-200 text-orange-600",
                "px-2 py-1 rounded-full",
                "text-sm font-bold text-center truncate"
              )}
              onClick={copyUsername}
            >
              @
              {window.Telegram?.WebApp?.initDataUnsafe?.user?.username ||
                "purrfect_little_bot"}
            </p>
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
