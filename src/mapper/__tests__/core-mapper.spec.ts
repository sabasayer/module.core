import { CoreMapper } from "../core-mapper";

describe("Core Mapper", () => {
  it("should map every field", () => {
    interface FirstType {
      name: string;
      age: number;
    }

    const mapper = new CoreMapper<FirstType, FirstType>();

    const mapped = mapper.mapToTarget({ name: "ali", age: 12 });
    const mappedSource = mapper.mapToSource({ name: "veli", age: 3 });

    expect(mapped).toEqual({ name: "ali", age: 12 });
    expect(mappedSource).toEqual({ name: "veli", age: 3 });
  });

  it("should map to target ", () => {
    interface FirstType {
      first: string;
      second: number;
    }

    interface SecondType {
      first: string;
      age: number;
      sum: string;
    }

    const mapper = new CoreMapper<FirstType, SecondType>();
    mapper
      .forTarget("first")
      .forTarget("age", "second")
      .forTarget("sum", (from) => `${from.first} ${from.second}`);

    const mapped = mapper.mapToTarget({ first: "orange", second: 231 });

    expect(mapped).toEqual({ first: "orange", age: 231, sum: "orange 231" });
  });

  it("should map to target array and source array", () => {
    interface TestType {
      name: string;
    }

    const mapper = new CoreMapper<TestType, TestType>();

    const mapped = mapper.mapToTargetList([
      { name: "first" },
      { name: "second" },
    ]);

    const mappedSource = mapper.mapToSourceList([
      { name: "first" },
      { name: "second" },
    ]);

    expect(mapped).toEqual([{ name: "first" }, { name: "second" }]);
    expect(mappedSource).toEqual([{ name: "first" }, { name: "second" }]);
  });

  it("should map to source", () => {
    interface Target {
      list: number[];
      obj: { name: string };
    }

    interface Source {
      count: number;
      name: string;
    }

    const mapper = new CoreMapper<Source, Target>();
    mapper
      .forSource("count", (target) =>
        target.list.reduce((count: number, e) => e + count, 0)
      )
      .forSource("name", (target) => target.obj.name);

    const mapped = mapper.mapToSource({
      list: [1, 3, 4],
      obj: { name: "Ospin" },
    });

    expect(mapped).toEqual({ count: 8, name: "Ospin" });
  });

  it("should map defined and same fields", () => {
    interface Source {
      field1: string;
      field2: string;
      field3: string;
      field4: string;
    }

    interface Target extends Source {
      newField: string;
    }

    const mapper = new CoreMapper<Source, Target>();
    mapper.forTarget("newField", "field1");
    mapper.forTarget("field1", (source) => source.field1 + "111");
    mapper.setTargetConfig({ canMapUndefinedFields: true });

    const mapped = mapper.mapToTarget({
      field1: "a",
      field2: "b",
      field3: "c",
      field4: "d",
    });

    mapper.forSource("field1", (target) => target.field1 + "---");
    mapper.setSourceConfig({ canMapUndefinedFields: true });

    const mappedSource = mapper.mapToSource({
      field1: "a",
      field2: "b",
      field3: "c",
      field4: "d",
      newField: "s",
    });

    expect(mapped).toEqual({
      field1: "a111",
      field2: "b",
      field3: "c",
      field4: "d",
      newField: "a",
    });

    expect(mappedSource).toEqual({
      field1: "a---",
      field2: "b",
      field3: "c",
      field4: "d",
      newField: "s",
    });
  });

  it("should ignore fields", () => {
    interface Source {
      name: string;
      date: string;
      value: number;
    }

    interface Target {
      date: string;
      age: number;
    }

    const mapper = new CoreMapper<Source, Target>();
    mapper.ignoreSourceFields("name", "value");
    mapper.ignoreTargetFields("age");

    const mapped = mapper.mapToTarget({ date: "2021", name: "test", value: 2 });

    const mappedSource = mapper.mapToSource({ date: "1998", age: 22 });

    expect(mapped).toEqual({ date: "2021" });
    expect(mappedSource).toEqual({ date: "1998" });
  });
});
