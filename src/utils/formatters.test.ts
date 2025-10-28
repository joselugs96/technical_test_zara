import { formatDate, formatDuration } from "./formatters";

describe("formatDate", () => {
  it("devuelve una fecha formateada en formato DD/MM/YYYY", () => {
    expect(formatDate("2024-05-10T00:00:00Z")).toBe("10/05/2024");
  });

  it("devuelve cadena vacía si el valor es null o undefined", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
  });

  it("devuelve la entrada original si no es una fecha válida", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });

  it("maneja correctamente fechas locales", () => {
    const date = new Date(2023, 11, 25); // 25 diciembre 2023
    expect(formatDate(date.toISOString())).toBe("25/12/2023");
  });
});

describe("formatDuration", () => {
  it("devuelve cadena vacía si el valor es null, undefined o negativo", () => {
    expect(formatDuration(null)).toBe("");
    expect(formatDuration(undefined)).toBe("");
    expect(formatDuration(-5)).toBe("");
  });

  it("devuelve la misma cadena si ya tiene formato HH:MM o MM:SS", () => {
    expect(formatDuration("02:15")).toBe("02:15");
    expect(formatDuration("01:05:09")).toBe("01:05:09");
  });

  it("formatea correctamente segundos numéricos menores de una hora", () => {
    expect(formatDuration(65)).toBe("01:05"); // 1 min y 5 seg
    expect(formatDuration(600)).toBe("10:00");
  });

  it("formatea correctamente duraciones mayores de una hora", () => {
    expect(formatDuration(3661)).toBe("01:01:01"); // 1h 1m 1s
    expect(formatDuration(5400)).toBe("01:30:00");
  });

  it("convierte correctamente duraciones en string numérico", () => {
    expect(formatDuration("125")).toBe("02:05");
  });

  it("devuelve cadena vacía si la entrada no es numérica", () => {
    expect(formatDuration("abc")).toBe("");
  });
});
