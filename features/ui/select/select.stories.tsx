import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select, SelectOption } from "./select";

export default {
  title: "UI/Select",
  component: Select,
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
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

const selectOptions: readonly SelectOption[] = [
  {
    value: "default",
    label: "Select team member",
    isFixed: true,
    isDisabled: true,
    isEmpty: true,
  },
  { value: "phoenixbaker", label: "Phoenix Baker", isFixed: true },
  { value: "oliviarhye", label: "Olivia Rhye" },
  { value: "jusedev", label: "Juse Dev" },
];

const defaultIconProps = {
  color: "red",
  hasIcon: true,
  content: "/icons/circle.svg",
  width: "1.25em",
  height: "1.25em",
};

export const Default = Template.bind({});
Default.args = {
  name: "default",
  options: selectOptions,
  disabled: false,
  error: false,
  isEmpty: true,
  width: "320px",
  icon: defaultIconProps,
};
Default.parameters = {
  viewMode: "docs",
};
