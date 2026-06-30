import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Divider",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Divider variant="default">Divider default</Divider>
      <Divider variant="compact">Divider compact</Divider>
      <Divider variant="spacious">Divider spacious</Divider>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
