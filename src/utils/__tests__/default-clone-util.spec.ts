import { defaultCloneUtil } from "../default-clone.util";

describe("Default Clone Util", () => {
  it("should clone object ", () => {
    let test = { id: 1 };

    let clone = defaultCloneUtil.clone(test);
    clone.id = 2;

    expect(test.id).toEqual(1);
    expect(clone.id).toEqual(2);
  });

  it("should clone array ", () => {
    let test = [1, 2, 3];
    let clone = defaultCloneUtil.clone(test);
    clone[0] = 10;

    expect(test[0]).toEqual(1);
    expect(clone[0]).toEqual(10);
  });

  it("should cloneDeep ", () => {
    let test = {
      obj: {
        arr: [1, 2],
      },
    };

    let clone = defaultCloneUtil.cloneDeep(test);
    clone.obj.arr[0] = 2;

    expect(test.obj.arr[0]).toBe(1);
    expect(clone.obj.arr[0]).toBe(2);
  });
});
