import type { Meta, StoryObj } from "@storybook/react";
import { AnalyticsWidget } from "./AnalyticsWidget";

const meta: Meta<typeof AnalyticsWidget> = {
  title: "Components/AnalyticsWidget",
  component: AnalyticsWidget,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof AnalyticsWidget>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "AnalyticsWidget",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
