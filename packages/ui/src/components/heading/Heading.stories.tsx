import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Heading",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Heading variant="primary">Heading primary</Heading>
      <Heading variant="secondary">Heading secondary</Heading>
      <Heading variant="success">Heading success</Heading>
      <Heading variant="warning">Heading warning</Heading>
      <Heading variant="error">Heading error</Heading>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Heading size="sm">Size sm</Heading>
      <Heading size="md">Size md</Heading>
      <Heading size="lg">Size lg</Heading>
    </div>
  ),
};
