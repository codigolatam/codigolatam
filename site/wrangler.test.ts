import { readFileSync } from "node:fs";
import { parse } from "jsonc-parser";
import { describe, expect, it } from "vitest";

import { site } from "./src/data/site";

interface WranglerConfig {
  name: string;
  assets: {
    directory: string;
    not_found_handling: string;
  };
  routes: {
    pattern: string;
    zone_name: string;
    custom_domain: boolean;
  }[];
}

const config = parse(
  readFileSync(new URL("./wrangler.jsonc", import.meta.url), "utf8"),
) as WranglerConfig;

describe("wrangler config", () => {
  it("serves the build output as assets with a 404 page fallback", () => {
    expect(config.assets.directory).toBe("./dist");
    expect(config.assets.not_found_handling).toBe("404-page");
  });

  it("routes apex and www as custom domains of the zone", () => {
    const patterns = config.routes.map((route) => route.pattern);
    expect(patterns).toContain("codigolatam.media");
    expect(patterns).toContain("www.codigolatam.media");
    for (const route of config.routes) {
      expect(route.zone_name).toBe("codigolatam.media");
      expect(route.custom_domain).toBe(true);
    }
  });

  it("matches the canonical url of the site data", () => {
    const canonicalHost = new URL(site.url).host;
    expect(config.routes.map((route) => route.pattern)).toContain(
      canonicalHost,
    );
  });

  it("names the worker after the dashboard project", () => {
    expect(config.name).toBe("codigolatam");
  });
});
