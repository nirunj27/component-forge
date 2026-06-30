import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "./Pill";

const meta: Meta<typeof Pill> = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    variant: "primary",
    disabled: false,
    children: "Pill",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Pill variant="primary">Pill primary</Pill>
      <Pill variant="secondary">Pill secondary</Pill>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
