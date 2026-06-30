import type { Meta, StoryObj } from "@storybook/react";
import { AsyncSelect } from "./AsyncSelect";

const meta: Meta<typeof AsyncSelect> = {
  title: "Components/AsyncSelect",
  component: AsyncSelect,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AsyncSelect>;

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
