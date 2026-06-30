import type { Meta, StoryObj } from "@storybook/react";
import { SortDropdown } from "./SortDropdown";

const meta: Meta<typeof SortDropdown> = {
  title: "Components/SortDropdown",
  component: SortDropdown,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SortDropdown>;

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
