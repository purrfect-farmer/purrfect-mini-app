declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id?: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        disableVerticalSwipes?: () => void;
        expand?: () => void;
        openTelegramLink?: (link: string) => void;
      };
    };
  }
}

export {};
