import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "glass",
      values: [
        { name: "glass", value: "#0b0d10" },
        { name: "light", value: "#f6f8fb" },
      ],
    },
    controls: { expanded: true },
  },
};

export default preview;
