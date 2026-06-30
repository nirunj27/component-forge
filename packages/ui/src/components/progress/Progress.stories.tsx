import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    variant: "primary",
    disabled: false,
    children: "Progress",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Progress variant="primary">Progress primary</Progress>
      <Progress variant="secondary">Progress secondary</Progress>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
