import copy from "copy-to-clipboard";
import { onMount, Show, splitProps, type ComponentProps } from "solid-js";
import { IoChatbubblesOutline, IoFlashOutline } from "solid-icons/io";

import Icon from "./assets/images/icon-unwrapped-cropped.png?format=webp&h=256";
import ProfileIcon from "./assets/images/icon.png?format=webp&h=80";
import { cn } from "./lib/utils";
import { HiSolidArrowUpRight } from "solid-icons/hi";
import toast, { Toaster } from "solid-toast";

function Button(props: ComponentProps<"button">) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <button
      {...others}
      class={cn(
        "px-4 py-2 rounded-full",
        "flex items-center justify-center gap-2",
        local.class
      )}
    />
  );
}

function Info(props: ComponentProps<"p">) {
  return <p {...props} class={cn("truncate cursor-pointer", props.class)} />;
}

function App() {
  /** User */
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  /** Full Name */
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ");

  /** Copy Content to Clipboard */
  const copyContent = (text: string) => {
    if (copy(text)) {
      toast.success("Copied to clipboard!");
      console.log("Copied to clipboard:", text);
    } else {
      console.error("Failed to copy to clipboard:", text);
    }
  };

  /** Copy Username */
  const copyUsername = () =>
    copyContent(`@${user?.username || import.meta.env.VITE_APP_TELEGRAM_BOT}`);

  /** Copy User ID */
  const copyUserId = () => copyContent(user?.id?.toString() || "");

  /** Open Telegram Link */
  const openTelegramLink = (link: string) => {
    window.Telegram?.WebApp?.openTelegramLink?.(link);
  };

  /** Open Channel */
  const openChannel = () => {
    openTelegramLink("https://t.me/purrfect_community");
  };

  /** Open Chat */
  const openChat = () => {
    openTelegramLink("https://t.me/purrfect_community_chat");
  };

  /** Configure Telegram App */
  onMount(() => {
    window.Telegram?.WebApp?.disableVerticalSwipes?.();
    window.Telegram?.WebApp?.expand?.();
  });

  return (
    <>
      {/* Toaster */}
      <Toaster position="top-center" />

      {/* App content */}
      <div class="flex flex-col p-4 min-h-dvh">
        <div class="flex flex-col w-full max-w-xs gap-2 m-auto">
          {/* Logo */}
          <img src={Icon} class="h-24 mx-auto" />

          <div class="flex flex-col gap-2">
            {/* Title */}
            <h1 class="text-3xl leading-none text-center text-orange-500 font-turret-road">
              Purrfect
            </h1>

            {/* User Info */}
            <div class="flex items-center gap-3 p-3 bg-black rounded-full">
              {/* User Photo */}
              <img
                class="rounded-full w-11 h-11 shrink-0"
                src={user?.["photo_url"] || ProfileIcon}
              />

              <div class="flex flex-col min-w-0 min-h-0 pr-2 grow">
                {/* First and Last Name */}
                <Info class="font-bold text-purple-300">
                  {fullName || "Purrfect"}
                </Info>

                {/* Username */}
                <Show when={!user || user?.username}>
                  <Info onClick={copyUsername} class="text-yellow-300">
                    @{user?.username || import.meta.env.VITE_APP_TELEGRAM_BOT}
                  </Info>
                </Show>

                {/* User ID */}
                <Show when={user?.id}>
                  <Info onClick={copyUserId} class="text-lime-300">
                    ID: {user?.id}
                  </Info>
                </Show>
              </div>
            </div>
          </div>

          {/* Channel & Chat */}
          <div class="flex items-center justify-center">
            <div class="grid grid-cols-2 gap-2">
              <Button
                onClick={openChannel}
                class={cn("bg-purple-200 text-black")}
              >
                <IoFlashOutline />
                Channel
              </Button>
              <Button onClick={openChat} class={cn("bg-lime-200 text-black")}>
                <IoChatbubblesOutline />
                Group
              </Button>
            </div>
          </div>

          {/* Official Website */}
          <div class="flex justify-center p-1">
            <a
              href={import.meta.env.VITE_APP_WEBSITE}
              target="_blank"
              class={cn(
                "text-xs text-orange-500 dark:text-orange-400",
                "hover:underline flex items-center gap-1"
              )}
            >
              <HiSolidArrowUpRight />
              Official Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
