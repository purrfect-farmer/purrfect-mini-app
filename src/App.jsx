import copy from "copy-to-clipboard";
import { useCallback, useEffect } from "react";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";

function App() {
  /** Copy Username */
  const copyUsername = useCallback(
    () => copy(`@${window.Telegram?.WebApp?.initDataUnsafe?.user?.username}`),
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

          <div className="flex items-center gap-2 p-3 rounded-full bg-neutral-900">
            {/* User Photo */}
            <img
              className="w-12 h-12 rounded-full shrink-0"
              src={window.Telegram?.WebApp?.initDataUnsafe?.user?.["photo_url"]}
            />

            <div className="flex flex-col min-w-0 min-h-0 text-sm grow">
              {/* First and Last Name */}
              <p className="font-bold text-purple-500 truncate">
                {window.Telegram?.WebApp?.initDataUnsafe?.user?.[
                  "first_name"
                ] || "Purrfect"}{" "}
                {window.Telegram?.WebApp?.initDataUnsafe?.user?.["last_name"] ||
                  "Bot"}
              </p>

              {/* Username */}
              {window.Telegram?.WebApp?.initDataUnsafe?.user?.username ? (
                <p
                  onClick={copyUsername}
                  className="font-bold text-yellow-500 truncate"
                >
                  @{window.Telegram?.WebApp?.initDataUnsafe?.user?.username}
                </p>
              ) : null}

              {/* User ID */}
              <p className="font-bold truncate text-lime-500">
                ID: {window.Telegram?.WebApp?.initDataUnsafe?.user?.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
