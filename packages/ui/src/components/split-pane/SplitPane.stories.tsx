import type { Meta, StoryObj } from "@storybook/react";
import { SplitPane } from "./SplitPane";

const meta: Meta<typeof SplitPane> = {
  title: "Components/SplitPane",
  component: SplitPane,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "SplitPane",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SplitPane variant="default">SplitPane default</SplitPane>
      <SplitPane variant="compact">SplitPane compact</SplitPane>
      <SplitPane variant="spacious">SplitPane spacious</SplitPane>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
