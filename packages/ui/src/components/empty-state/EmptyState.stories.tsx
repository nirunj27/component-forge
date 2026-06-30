import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "EmptyState",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <EmptyState variant="default">EmptyState default</EmptyState>
      <EmptyState variant="bordered">EmptyState bordered</EmptyState>
      <EmptyState variant="striped">EmptyState striped</EmptyState>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
