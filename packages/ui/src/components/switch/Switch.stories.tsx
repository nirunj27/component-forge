import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    variant: "primary",
    disabled: false,
    children: "Switch",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Switch variant="primary">Switch primary</Switch>
      <Switch variant="secondary">Switch secondary</Switch>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
