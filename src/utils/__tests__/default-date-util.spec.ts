import { defaultDateUtil } from "../default-date.util";
import { DateDuration } from "../types/date-util.interface";

describe("Default Date Util", () => {
  describe("format string by formatter", () => {
    it("should format iso string", () => {
      const result = defaultDateUtil.format(
        "2011-02-01T01:02:03",
        "dd.MM.yyyy hh:mm:ss"
      );
      expect(result).toBe("01.02.2011 01:02:03");
    });

    it("should format date", () => {
      const result = defaultDateUtil.format(
        new Date(2011, 1, 1, 1, 2, 3),
        "dd.MM.yyyy hh:mm:ss"
      );
      expect(result).toBe("01.02.2011 01:02:03");
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
  });

  describe("add duration", () => {
    const cases: [string | Date, DateDuration, string | Date][] = [
      ["2011-01-01T00:00:00", { days: 1 }, "2011-01-02T00:00:00"],
      [new Date(2011, 0, 1), { days: 1 }, new Date(2011, 0, 2)],
      ["2011-01-01T00:00:00", { months: 1 }, "2011-02-01T00:00:00"],
      [new Date(2011, 0, 1), { years: 1 }, new Date(2012, 0, 1)],
      ["2011-02-03T10:00:00", { hours: -1 }, "2011-02-03T09:00:00"],
    ];

    it.each(cases)(
      "should add duration. date = %j , duration %j , expected = %j",
      (
        date: string | Date,
        duration: DateDuration,
        expected: string | Date
      ) => {
        const result = defaultDateUtil.add(date, duration);

        expect(result).toEqual(expected);
      }
    );
  });
});
