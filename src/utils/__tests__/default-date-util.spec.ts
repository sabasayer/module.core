import { defaultDateUtil } from "../default-date.util";
import {
  DateDuration,
  DateUnion,
  SetDateValues,
} from "../types/date-util.interface";

describe("Default Date Util", () => {
  describe("Now", () => {
    const RealDate = Date;

    function mockDate(isoDate: any) {
      global.Date = class extends RealDate {
        constructor() {
          super();
          return new RealDate(isoDate);
        }
      } as any;
    }

    afterEach(() => {
      global.Date = RealDate;
    });

    it("should get now date", () => {
      const date = new Date(2010, 0, 1);
      mockDate(date);

      const result = defaultDateUtil.now();

      expect(result).toEqual(date);
    });

    it("should get now ISO string", () => {
      const date = new Date(2010, 0, 1);
      mockDate(date);

      const result = defaultDateUtil.nowISO();
      expect(result).toEqual("2010-01-01T00:00:00");
    });
  });

  describe("format string by formatter", () => {
    it("should format iso string", () => {
      const result = defaultDateUtil.format(
        "2011-02-01T01:02:03",
        "dd.MM.yyyy HH:mm:ss"
      );
      expect(result).toBe("01.02.2011 01:02:03");
    });

    it("should format date", () => {
      const result = defaultDateUtil.format(
        new Date(2011, 1, 1, 1, 2, 3),
        "dd.MM.yyyy HH:mm:ss"
      );
      expect(result).toBe("01.02.2011 01:02:03");
    });

    it("should format date without time", () => {
      const result = defaultDateUtil.format(
        new Date(2011, 1, 1),
        "dd.MM.yyyy HH:mm:ss"
      );
      expect(result).toBe("01.02.2011 00:00:00");
    });

    it("should format iso string with defaultFormat set", () => {
      defaultDateUtil.setDefaultFormat("dd.MM.yyyy hh:mm:ss");

      const result = defaultDateUtil.format("2011-02-01T01:02:03");
      expect(result).toBe("01.02.2011 01:02:03");
    });
  });

  describe("format iso", () => {
    it("should format date object to iso string", () => {
      const result = defaultDateUtil.formatISO(new Date(2020, 0, 2, 1, 2, 3));
      expect(result).toBe("2020-01-02T01:02:03");
    });

    it("should format date object withouth time to iso string", () => {
      const result = defaultDateUtil.formatISO(new Date(2010, 0, 1));
      expect(result).toBe("2010-01-01T00:00:00");
    });
  });

  describe("add duration", () => {
    const cases: [DateUnion, DateDuration, DateUnion][] = [
      ["2011-01-01T00:00:00", { days: 1 }, "2011-01-02T00:00:00"],
      [new Date(2011, 0, 1), { days: 1 }, new Date(2011, 0, 2)],
      ["2011-01-01T00:00:00", { months: 1 }, "2011-02-01T00:00:00"],
      [new Date(2011, 0, 1), { years: 1 }, new Date(2012, 0, 1)],
      ["2011-02-03T10:00:00", { hours: -1 }, "2011-02-03T09:00:00"],
    ];

    it.each(cases)(
      "should add duration. date = %j , duration %j , expected = %j",
      (date: DateUnion, duration: DateDuration, expected: DateUnion) => {
        const result = defaultDateUtil.add(date, duration);

        expect(result).toEqual(expected);
      }
    );
  });

  describe("Set", () => {
    const cases: [DateUnion, SetDateValues, DateUnion][] = [
      [
        new Date(2020, 0, 1),
        { hours: 1, minutes: 2, seconds: 3 },
        new Date(2020, 0, 1, 1, 2, 3),
      ],
      [
        "2020-01-01T00:00:00",
        {
          hours: 1,
          minutes: 2,
          seconds: 3,
        },
        "2020-01-01T01:02:03",
      ],
      [
        "2020-01-01T00:00:00",
        {
          year: 2021,
          month: 2,
          date: 3,
        },
        "2021-03-03T00:00:00",
      ],
    ];

    it.each(cases)(
      "should set date. date = %j , values = %j , expected = %j",
      (date: DateUnion, values: SetDateValues, expected: DateUnion) => {
        const result = defaultDateUtil.set(date, values);
        expect(result).toEqual(expected);
      }
    );
  });

  describe("Clear Time", () => {
    const cases: [DateUnion, DateUnion][] = [
      [new Date(2010, 0, 1, 1, 2, 3, 4), new Date(2010, 0, 1)],
      ["2010-01-02T03:04:05", "2010-01-02T00:00:00"],
    ];

    it.each(cases)(
      "should clear time of date. date= %j, expected= %j",
      (date: DateUnion, expected: DateUnion) => {
        const result = defaultDateUtil.clearTime(date);
        expect(result).toEqual(expected);
      }
    );
  });
});
