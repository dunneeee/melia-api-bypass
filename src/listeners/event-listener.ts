import { CustomEventListener } from "./types";

export class TypeSafeEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Set<CustomEventListener<T[K]>>;
  } = {};

  on<K extends keyof T>(
    eventName: K,
    listener: CustomEventListener<T[K]>
  ): () => void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set();
    }

    this.listeners[eventName]!.add(listener);

    return () => this.off(eventName, listener);
  }

  once<K extends keyof T>(
    eventName: K,
    listener: CustomEventListener<T[K]>
  ): () => void {
    const onceListener: CustomEventListener<T[K]> = (data) => {
      listener(data);
      this.off(eventName, onceListener);
    };

    return this.on(eventName, onceListener);
  }

  off<K extends keyof T>(
    eventName: K,
    listener: CustomEventListener<T[K]>
  ): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }

  emit<K extends keyof T>(eventName: K, data: T[K]): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in listener for ${String(eventName)}:`, error);
        }
      });
    }
  }

  removeAllListeners<K extends keyof T>(eventName?: K): void {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }

  listenerCount<K extends keyof T>(eventName: K): number {
    return this.listeners[eventName]?.size ?? 0;
  }
}
