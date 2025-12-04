import { RouterModule } from "../modules/interfaces/router-module";
import { WebpackRequire } from "../modules/webpack-require";

export class RouterService {
  public static readonly EVENT_ROUTER_CHANGE_COMPLETE = "routeChangeComplete";
  public static readonly EVENT_ROUTER_CHANGE_ERROR = "routeChangeError";
  public static get Router(): RouterModule {
    return WebpackRequire.Instance.RequireFunction(5795);
  }

  async navigateAndWait(url: string, replace: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      RouterService.Router.events.on(
        RouterService.EVENT_ROUTER_CHANGE_COMPLETE,
        this.handleNavigateComplete
      );
      RouterService.Router.events.on(
        RouterService.EVENT_ROUTER_CHANGE_ERROR,
        this.handleNavigateError
      );

      const navigatePromise = replace
        ? RouterService.Router.replace(url)
        : RouterService.Router.push(url);

      navigatePromise
        .catch((error) => {
          RouterService.Router.events.off(
            RouterService.EVENT_ROUTER_CHANGE_ERROR,
            this.handleNavigateError
          );
          RouterService.Router.events.off(
            RouterService.EVENT_ROUTER_CHANGE_COMPLETE,
            this.handleNavigateComplete
          );
          reject(error);
        })
        .then(() => {
          resolve();
        });
    });
  }

  isCurrentPage(url: string | RegExp): boolean {
    const currentPath = RouterService.Router.pathname;
    const currentAsPath = RouterService.Router.asPath;

    if (url instanceof RegExp) {
      return url.test(currentPath) || url.test(currentAsPath);
    }
    return (
      currentPath === url || currentAsPath === url || currentPath.includes(url)
    );
  }

  reload() {
    return RouterService.Router.reload();
  }

  private handleNavigateComplete = (targetUrl: string) => {
    RouterService.Router.events.off(
      RouterService.EVENT_ROUTER_CHANGE_COMPLETE,
      this.handleNavigateComplete
    );
    RouterService.Router.events.off(
      RouterService.EVENT_ROUTER_CHANGE_ERROR,
      this.handleNavigateError
    );
  };

  private handleNavigateError = (error: Error, targetUrl: string) => {
    RouterService.Router.events.off(
      RouterService.EVENT_ROUTER_CHANGE_ERROR,
      this.handleNavigateError
    );
    RouterService.Router.events.off(
      RouterService.EVENT_ROUTER_CHANGE_COMPLETE,
      this.handleNavigateComplete
    );
  };
}
