import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownEditor } from "./MarkdownEditor";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Components/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "MarkdownEditor",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
