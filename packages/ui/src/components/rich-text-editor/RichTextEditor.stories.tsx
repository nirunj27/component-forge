import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "RichTextEditor",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
