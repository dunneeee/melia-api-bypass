import { TypeSafeEventEmitter } from "../listeners/event-listener";
import { TrackingState, UITrackerEventEnum } from "./ui-tracker-event";

export class UITracker extends TypeSafeEventEmitter<
  Record<string, TrackingState>
> {
  private static instance: UITracker;
  private constructor() {
    super();
  }

  public static get Instance(): UITracker {
    if (!UITracker.instance) {
      UITracker.instance = new UITracker();
    }
    return UITracker.instance;
  }

  emit<K extends string>(eventName: K, data: TrackingState): void {
    super.emit(eventName, data);
    if (eventName !== UITrackerEventEnum.ALL) {
      super.emit(UITrackerEventEnum.ALL, data);
    }
  }
}
