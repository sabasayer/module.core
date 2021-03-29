export type PublishType = "add" | "change" | "remove";
export type SubscribeOptions<T> = {
  onAdded?: (data: T) => void;
  onChanged?: (data: T) => void;
  onRemoved?: (data: T) => void;
};

export type IObserver<T> = {
  subscribe(options: SubscribeOptions<T>): number;
  unsubscribe(id?: number): void;
  publish(data: T, type: PublishType): void;
};
