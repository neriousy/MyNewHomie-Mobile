// Klasa do obsługi customowych eventów

export type Events = 'NEW_MESSAGE';

class EventDispatcher {
  listeners: { [key: string]: Function[] };

  constructor() {
    this.listeners = {};
  }

  addEventListener(
    eventType: Events,
    callback: (event: { type: Events }) => void
  ) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  removeEventListener(
    eventType: Events,
    callback: (event: { type: Events }) => void
  ) {
    if (this.listeners[eventType]) {
      this.listeners[eventType] = this.listeners[eventType].filter(
        (cb) => cb !== callback
      );
    }
  }

  dispatchEvent(event: { type: Events }) {
    const eventType = event.type;
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach((callback) => callback(event));
    }
  }
}

const eventDispatcher = new EventDispatcher();

export class EventManager {
  static addEventListener(
    eventType: Events,
    callback: (event: { type: Events }) => void
  ) {
    eventDispatcher.addEventListener(eventType, callback);
  }

  static removeEventListener(
    eventType: Events,
    callback: (event: { type: Events }) => void
  ) {
    eventDispatcher.removeEventListener(eventType, callback);
  }

  static dispatchEvent(event: Events) {
    eventDispatcher.dispatchEvent({ type: event });
  }
}
