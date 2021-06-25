import type {
  IObserver,
  PublishType,
  SubscribeOptions,
} from "./types/observer.interface";

export class Observer<T> implements IObserver<T> {
  private subs: Map<number, SubscribeOptions<T>> = new Map();

  subscribe(options: SubscribeOptions<T>) {
    const id = this.subs.size + 1;
    this.subs.set(id, options);
    return id;
  }

  unsubscribe(id?: number) {
    if (!id) return;
    
    this.subs.delete(id);
  }

  publish(data: T, type: PublishType) {
    this.subs.forEach((sub) => {
      switch (type) {
        case "add":
          return sub.onAdded?.(data);
        case "change":
          return sub.onChanged?.(data);
        case "remove":
          return sub.onRemoved?.(data);
      }
    });
  }
}
