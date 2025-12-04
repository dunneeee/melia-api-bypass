export interface RouterModule {
  back: () => void;
  push: (path: string) => Promise<void>;
  replace: (path: string) => Promise<void>;
  reload: () => void;
  events: {
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;
  };
  pathname: string;
  asPath: string;
}
