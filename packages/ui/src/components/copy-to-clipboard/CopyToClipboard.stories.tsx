import type { Meta, StoryObj } from "@storybook/react";
import { CopyToClipboard } from "./CopyToClipboard";

const meta: Meta<typeof CopyToClipboard> = {
  title: "Components/CopyToClipboard",
  component: CopyToClipboard,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  args: {
    value: "",
    disabled: false,
    children: "CopyToClipboard",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
