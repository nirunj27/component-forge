import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar } from "./Snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Snackbar",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Snackbar variant="primary">Snackbar primary</Snackbar>
      <Snackbar variant="secondary">Snackbar secondary</Snackbar>
      <Snackbar variant="success">Snackbar success</Snackbar>
      <Snackbar variant="warning">Snackbar warning</Snackbar>
      <Snackbar variant="error">Snackbar error</Snackbar>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Snackbar size="sm">Size sm</Snackbar>
      <Snackbar size="md">Size md</Snackbar>
      <Snackbar size="lg">Size lg</Snackbar>
    </div>
  ),
};
