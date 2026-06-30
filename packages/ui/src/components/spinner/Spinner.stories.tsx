import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Spinner",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Spinner variant="primary">Spinner primary</Spinner>
      <Spinner variant="secondary">Spinner secondary</Spinner>
      <Spinner variant="success">Spinner success</Spinner>
      <Spinner variant="warning">Spinner warning</Spinner>
      <Spinner variant="error">Spinner error</Spinner>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Spinner size="sm">Size sm</Spinner>
      <Spinner size="md">Size md</Spinner>
      <Spinner size="lg">Size lg</Spinner>
    </div>
  ),
};
