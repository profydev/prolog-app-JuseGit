import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonIcon } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "3em" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ size, color, icon }) => (
  <Button color={color} size={size} icon={icon}>
    <img src="/icons/circle.svg" alt="story img" />
    Label
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.md,
  color: ButtonColor.darkGray,
  icon: ButtonIcon.leading,
};
Default.parameters = {
  viewMode: "docs",
};
