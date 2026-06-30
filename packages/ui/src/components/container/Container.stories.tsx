import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Container",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Container variant="default">Container default</Container>
      <Container variant="compact">Container compact</Container>
      <Container variant="spacious">Container spacious</Container>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
