import type { Meta, StoryObj } from "@storybook/react";
import { NotificationPanel } from "./NotificationPanel";

const meta: Meta<typeof NotificationPanel> = {
  title: "Components/NotificationPanel",
  component: NotificationPanel,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationPanel>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "NotificationPanel",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <NotificationPanel variant="primary">NotificationPanel primary</NotificationPanel>
      <NotificationPanel variant="secondary">NotificationPanel secondary</NotificationPanel>
      <NotificationPanel variant="success">NotificationPanel success</NotificationPanel>
      <NotificationPanel variant="warning">NotificationPanel warning</NotificationPanel>
      <NotificationPanel variant="error">NotificationPanel error</NotificationPanel>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <NotificationPanel size="sm">Size sm</NotificationPanel>
      <NotificationPanel size="md">Size md</NotificationPanel>
      <NotificationPanel size="lg">Size lg</NotificationPanel>
    </div>
  ),
};
