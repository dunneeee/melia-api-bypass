import { WebpackRequire } from "./modules/webpack-require";
import { UITracker } from "./ui/ui-tracker";
import { UITrackerEventEnum } from "./ui/ui-tracker-event";

UITracker.Instance.on(UITrackerEventEnum.ALL, (data) => {
  console.log("[UI Tracker Event]", data);
});

WebpackRequire.Instance.on("catchRequire", () => {
  console.log("[Webpack Require] Webpack require function captured.");
});

export * from "./auth/auth-service";
export * from "./modules/webpack-require";
