import { describe, expect, it } from "vitest";

import { site } from "./site";

describe("site data", () => {
  it("exposes non-empty name, canonical url and description", () => {
    expect(site.name).toBe("Código LATAM");
    expect(site.url).toBeTruthy();
    expect(site.description).toBeTruthy();
  });

  it("declares the domain apex as canonical url", () => {
    expect(site.url).toBe("https://codigolatam.media");
  });

  it("keeps the description within metadata limits", () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
  });
});
