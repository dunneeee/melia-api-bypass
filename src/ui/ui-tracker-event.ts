export enum UITrackerEventEnum {
  CAPTCHA = "captcha",
  AUTH_SERVICE = "auth_service",
  ROUTER_SERVICE = "router_service",
  ALL = "all",
}

export enum UITrackingStateEnum {
  START = "started",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface TrackingState {
  state: UITrackingStateEnum;
  functionName: string;
  details?: Record<string, any>;
  className?: string;
}
