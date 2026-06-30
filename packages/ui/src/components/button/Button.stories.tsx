import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","jjjjjjj"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Button variant="primary">Button primary</Button>
      <Button variant="secondary">Button secondary</Button>
      <Button variant="ghost">Button ghost</Button>
      <Button variant="danger">Button danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Button size="sm">Size sm</Button>
      <Button size="md">Size md</Button>
      <Button size="jjjjjjj">Size jjjjjjj</Button>
    </div>
  ),
};
