import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "Timeline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Timeline variant="default">Timeline default</Timeline>
      <Timeline variant="bordered">Timeline bordered</Timeline>
      <Timeline variant="striped">Timeline striped</Timeline>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
