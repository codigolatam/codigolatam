import { defineConfig } from "astro/config";
import { sitio } from "./src/data/sitio";

// https://astro.build/config
export default defineConfig({
  site: sitio.url,
  output: "static",
});
