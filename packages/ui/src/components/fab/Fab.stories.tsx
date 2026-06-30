import type { Meta, StoryObj } from "@storybook/react";
import { Fab } from "./Fab";

const meta: Meta<typeof Fab> = {
  title: "Components/Fab",
  component: Fab,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "Fab",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Fab variant="primary">Fab primary</Fab>
      <Fab variant="secondary">Fab secondary</Fab>
      <Fab variant="ghost">Fab ghost</Fab>
      <Fab variant="danger">Fab danger</Fab>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Fab size="sm">Size sm</Fab>
      <Fab size="md">Size md</Fab>
      <Fab size="lg">Size lg</Fab>
    </div>
  ),
};
