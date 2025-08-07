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
      { icon: "twitter", link: "https://x.com/home" },
    ],
    footer: {
      message: "本博客内容基于 MIT 许可证发布，欢迎合理转载。",
      copyright: "Copyright © 2024-present 张宏杰的博客",
    },
    lastUpdated: {
      text: "最新更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchTitle: "切换到深色模式",
    lightModeSwitchTitle: "切换到浅色模式",
  },
});
