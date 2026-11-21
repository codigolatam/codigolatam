import { describe, expect, it } from "vitest";

import { sitio } from "./sitio";

describe("datos del sitio", () => {
  it("expone nombre, url canónica y descripción no vacíos", () => {
    expect(sitio.nombre).toBe("Código LATAM");
    expect(sitio.url).toBeTruthy();
    expect(sitio.descripcion).toBeTruthy();
  });

  it("declara el apex del dominio como URL canónica", () => {
    expect(sitio.url).toBe("https://codigolatam.media");
  });

  it("mantiene la descripción dentro del límite de los metadatos", () => {
    expect(sitio.descripcion.length).toBeLessThanOrEqual(160);
  });
});
