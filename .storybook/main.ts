import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (storybookConfig) => {
    storybookConfig.resolve = storybookConfig.resolve ?? {};
    storybookConfig.resolve.alias = {
      ...(storybookConfig.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "../src"),
    };

    return storybookConfig;
  },
};

export default config;
