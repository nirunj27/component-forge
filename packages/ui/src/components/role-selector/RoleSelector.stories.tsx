import type { Meta, StoryObj } from "@storybook/react";
import { RoleSelector } from "./RoleSelector";

const meta: Meta<typeof RoleSelector> = {
  title: "Components/RoleSelector",
  component: RoleSelector,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RoleSelector>;

export const Default: Story = {
  args: {
    value: "",
    disabled: false,
    placeholder: "Select an option",
    
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
