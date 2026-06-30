import type { Meta, StoryObj } from "@storybook/react";
import { JsonEditor } from "./JsonEditor";

const meta: Meta<typeof JsonEditor> = {
  title: "Components/JsonEditor",
  component: JsonEditor,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof JsonEditor>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "JsonEditor",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
