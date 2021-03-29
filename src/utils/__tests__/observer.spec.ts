import { globalModule } from "@/global-module/global-module";
import { Observer } from "../observer";

describe("Observer", () => {
  beforeEach(() => {
    globalModule.clear();
    globalModule.setObserver(Observer);
  });

  it("should trigger onAdded", () => {
    const observer = globalModule.createObserver<string>();

    let localData = "";
    const newData = "Test";

    observer?.subscribe({ onAdded: (data) => (localData = data) });
    observer?.publish(newData, "add");

    expect(localData).toBe(newData);
  });

  it("should trigger onChange", () => {
    const observer = globalModule.createObserver<string>();

    let localData = "Test";
    const changedData = "Mest";

    observer?.subscribe({ onChanged: (data) => (localData = data) });
    observer?.publish(changedData, "change");

    expect(localData).toBe(changedData);
  });

  it("should trigger onRemove", () => {
    const observer = globalModule.createObserver<string>();

    let localData = "";
    const removedData = "Test";

    observer?.subscribe({ onRemoved: (data) => (localData = data) });
    observer?.publish(removedData, "remove");

    expect(localData).toBe(removedData);
  });

  it("should unsubscribe with id", () => {
    const observer = globalModule.createObserver<string>();

    let localData = "";
    const addedData = "Test";

    const id = observer?.subscribe({ onAdded: (data) => (localData = data) });
    observer?.unsubscribe(id);

    observer?.publish(addedData, "add");

    expect(localData).toBe("");
  });
});
