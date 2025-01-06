import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon.png?format=webp&w=256";
import copy from "copy-to-clipboard";

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
      <div className="flex flex-col w-full max-w-xs gap-2 m-auto">
        <img src={Icon} className="mx-auto w-28 h-28" />
        <h1 className="text-3xl leading-none text-center text-orange-500 font-turret-road">
          Purrfect
        </h1>
        <p
          className="mx-auto text-center text-orange-500 truncate"
          onClick={copyUsername}
        >
          @
          {window.Telegram?.WebApp?.initDataUnsafe?.user?.username ||
            "purrfect_little_bot"}
        </p>
        <p className="text-center">Your purrfect little bot</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={openChannel}
            className="px-4 py-2 text-white bg-purple-500 rounded-xl hover:bg-purple-600"
          >
            Open Channel
          </button>
          <button
            onClick={openChat}
            className="px-4 py-2 text-white rounded-xl bg-lime-500 hover:bg-lime-600"
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
