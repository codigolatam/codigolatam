import { defineConfig } from "astro/config";
import { site } from "./src/data/site";

// https://astro.build/config
export default defineConfig({
  site: site.url,
  output: "static",
});
