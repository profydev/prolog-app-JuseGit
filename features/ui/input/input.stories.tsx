import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
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
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const defaultIconProps = {
  color: "gray",
  hasMask: true,
  content: "/icons/circle.svg",
  width: "1.25em",
  height: "1.25em",
};

export const Default = Template.bind({});
Default.args = {
  name: "default",
  width: "320px",
  disabled: false,
  error: false,
  errorMsg: "",
  placeholder: "test",
  type: "text",
  icon: defaultIconProps,
};
Default.parameters = {
  viewMode: "docs",
};
