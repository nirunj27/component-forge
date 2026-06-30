import type { Meta, StoryObj } from "@storybook/react";
import { KpiCard } from "./KpiCard";

const meta: Meta<typeof KpiCard> = {
  title: "Components/KpiCard",
  component: KpiCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof KpiCard>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "KpiCard",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
