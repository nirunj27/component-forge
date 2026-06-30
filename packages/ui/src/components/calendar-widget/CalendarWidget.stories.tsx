import type { Meta, StoryObj } from "@storybook/react";
import { CalendarWidget } from "./CalendarWidget";

const meta: Meta<typeof CalendarWidget> = {
  title: "Components/CalendarWidget",
  component: CalendarWidget,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "select", options: ["up","down","neutral"] },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarWidget>;

export const Default: Story = {
  args: {
    trend: "neutral",
    children: "CalendarWidget",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
