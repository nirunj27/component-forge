import type { Meta, StoryObj } from "@storybook/react";
import { LoadingButton } from "./LoadingButton";

const meta: Meta<typeof LoadingButton> = {
  title: "Components/LoadingButton",
  component: LoadingButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "LoadingButton",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <LoadingButton variant="primary">LoadingButton primary</LoadingButton>
      <LoadingButton variant="secondary">LoadingButton secondary</LoadingButton>
      <LoadingButton variant="ghost">LoadingButton ghost</LoadingButton>
      <LoadingButton variant="danger">LoadingButton danger</LoadingButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <LoadingButton size="sm">Size sm</LoadingButton>
      <LoadingButton size="md">Size md</LoadingButton>
      <LoadingButton size="lg">Size lg</LoadingButton>
    </div>
  ),
};
