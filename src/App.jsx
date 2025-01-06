import copy from "copy-to-clipboard";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon.png?format=webp&w=256";
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
        <img src={Icon} className="mx-auto w-28 h-28" />

        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-3xl leading-none text-center text-orange-500 font-turret-road">
            Purrfect
          </h1>

          {/* Intro */}
          <p className="text-center">
            <span
              className={cn(
                "text-transparent",
                "bg-clip-text",
                "bg-gradient-to-r from-green-500 to-violet-500"
              )}
            >
              Your Little Bot
            </span>
          </p>

          {/* Username */}
          <p
            className="w-4/5 mx-auto text-sm text-center text-orange-500 truncate"
            onClick={copyUsername}
          >
            @
            {window.Telegram?.WebApp?.initDataUnsafe?.user?.username ||
              "purrfect_little_bot"}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <button
            onClick={openChannel}
            className="px-4 py-2 text-sm text-white bg-orange-500 rounded-xl hover:bg-orange-600"
          >
            Open Channel
          </button>
          <button
            onClick={openChat}
            className="px-4 py-2 text-sm text-black rounded-xl bg-lime-500 hover:bg-lime-400"
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
