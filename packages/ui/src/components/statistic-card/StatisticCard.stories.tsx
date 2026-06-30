import type { Meta, StoryObj } from "@storybook/react";
import { StatisticCard } from "./StatisticCard";

const meta: Meta<typeof StatisticCard> = {
  title: "Components/StatisticCard",
  component: StatisticCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticCard>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "StatisticCard",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
