import { useEffect } from 'react';
import { EventManager, Events } from '../lib/event-handling/events';

export function useEventHandler(
  eventType: Events,
  callback: (event: { type: Events }) => void
) {
  useEffect(() => {
    EventManager.addEventListener(eventType, callback);

    return () => {
      EventManager.removeEventListener(eventType, callback);
    };
  }, [eventType, callback]);
}
