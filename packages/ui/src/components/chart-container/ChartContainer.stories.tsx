import type { Meta, StoryObj } from "@storybook/react";
import { ChartContainer } from "./ChartContainer";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/ChartContainer",
  component: ChartContainer,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "ChartContainer",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
