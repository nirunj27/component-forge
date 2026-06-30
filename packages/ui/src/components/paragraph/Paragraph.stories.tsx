import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "./Paragraph";

const meta: Meta<typeof Paragraph> = {
  title: "Components/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Paragraph",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Paragraph variant="primary">Paragraph primary</Paragraph>
      <Paragraph variant="secondary">Paragraph secondary</Paragraph>
      <Paragraph variant="success">Paragraph success</Paragraph>
      <Paragraph variant="warning">Paragraph warning</Paragraph>
      <Paragraph variant="error">Paragraph error</Paragraph>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Paragraph size="sm">Size sm</Paragraph>
      <Paragraph size="md">Size md</Paragraph>
      <Paragraph size="lg">Size lg</Paragraph>
    </div>
  ),
};
