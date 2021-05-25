import { createUniqueList } from "../unique-list";

describe("Unique List", () => {
  describe("push", () => {
    it("should add item", () => {
      const list = createUniqueList((a: number, b: number) => a === b, [1]);
      list.push(2);
      expect([...list]).toEqual([1, 2]);
    });

    it("should not add same item", () => {
      const list = createUniqueList(
        (a: number, b: number) => a === b,
        [1, 2, 3]
      );
      list.push(2);
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe("remove", () => {
    it("should remove item by comparing", () => {
      type ListItem = { id: number };
      const list = createUniqueList(
        (a: ListItem, b: ListItem) => a.id === b.id,
        [{ id: 1 }, { id: 3 }]
      );

      list.remove({ id: 1 });

      expect([...list]).toEqual([{ id: 3 }]);
    });
  });
});
