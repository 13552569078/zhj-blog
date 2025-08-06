import { defineConfig } from "vitepress";
import nav from "./nav.mts";
import sidebar from "./sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "张宏杰的个人空间",
  description: "张宏杰的前端技术分享与生活记录",
  srcDir: "docs",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 确保路径正确
  ],
  themeConfig: {
    nav: nav,

    sidebar: sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/13552569078/zhj-blog" },
    ],
  },
});
