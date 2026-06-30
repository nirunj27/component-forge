import type { Meta, StoryObj } from "@storybook/react";
import { AuditTimeline } from "./AuditTimeline";

const meta: Meta<typeof AuditTimeline> = {
  title: "Components/AuditTimeline",
  component: AuditTimeline,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AuditTimeline>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "AuditTimeline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <AuditTimeline variant="default">AuditTimeline default</AuditTimeline>
      <AuditTimeline variant="bordered">AuditTimeline bordered</AuditTimeline>
      <AuditTimeline variant="striped">AuditTimeline striped</AuditTimeline>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
