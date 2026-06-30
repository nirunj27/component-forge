import type { Meta, StoryObj } from "@storybook/react";
import { RecentActivity } from "./RecentActivity";

const meta: Meta<typeof RecentActivity> = {
  title: "Components/RecentActivity",
  component: RecentActivity,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof RecentActivity>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "RecentActivity",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
