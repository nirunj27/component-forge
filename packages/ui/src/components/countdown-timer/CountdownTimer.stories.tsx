import type { Meta, StoryObj } from "@storybook/react";
import { CountdownTimer } from "./CountdownTimer";

const meta: Meta<typeof CountdownTimer> = {
  title: "Components/CountdownTimer",
  component: CountdownTimer,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CountdownTimer>;

export const Default: Story = {
  args: {
    value: "",
    disabled: false,
    children: "CountdownTimer",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
