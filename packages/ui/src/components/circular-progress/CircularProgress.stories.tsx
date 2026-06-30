import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

const meta: Meta<typeof CircularProgress> = {
  title: "Components/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "CircularProgress",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <CircularProgress variant="primary">CircularProgress primary</CircularProgress>
      <CircularProgress variant="secondary">CircularProgress secondary</CircularProgress>
      <CircularProgress variant="success">CircularProgress success</CircularProgress>
      <CircularProgress variant="warning">CircularProgress warning</CircularProgress>
      <CircularProgress variant="error">CircularProgress error</CircularProgress>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <CircularProgress size="sm">Size sm</CircularProgress>
      <CircularProgress size="md">Size md</CircularProgress>
      <CircularProgress size="lg">Size lg</CircularProgress>
    </div>
  ),
};
