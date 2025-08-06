import { defineConfig } from "vitepress";
import nav from "./nav.mts";
import sidebar from "./sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "张宏杰技术博客",
  description: "张宏杰的前端技术分享与记录",
  srcDir: "docs",
  themeConfig: {
    nav: nav,

    sidebar: sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/13552569078/zhj-blog" },
    ],
  },
});
