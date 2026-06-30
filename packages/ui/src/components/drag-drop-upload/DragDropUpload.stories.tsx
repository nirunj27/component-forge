import type { Meta, StoryObj } from "@storybook/react";
import { DragDropUpload } from "./DragDropUpload";

const meta: Meta<typeof DragDropUpload> = {
  title: "Components/DragDropUpload",
  component: DragDropUpload,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DragDropUpload>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "",
    disabled: false,
    required: false,
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
