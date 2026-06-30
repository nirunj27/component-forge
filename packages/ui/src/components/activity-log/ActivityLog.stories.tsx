import type { Meta, StoryObj } from "@storybook/react";
import { ActivityLog } from "./ActivityLog";

const meta: Meta<typeof ActivityLog> = {
  title: "Components/ActivityLog",
  component: ActivityLog,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityLog>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "ActivityLog",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ActivityLog variant="default">ActivityLog default</ActivityLog>
      <ActivityLog variant="bordered">ActivityLog bordered</ActivityLog>
      <ActivityLog variant="striped">ActivityLog striped</ActivityLog>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
