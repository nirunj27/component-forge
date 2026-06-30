import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "ThemeSwitcher",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ThemeSwitcher variant="primary">ThemeSwitcher primary</ThemeSwitcher>
      <ThemeSwitcher variant="secondary">ThemeSwitcher secondary</ThemeSwitcher>
      <ThemeSwitcher variant="ghost">ThemeSwitcher ghost</ThemeSwitcher>
      <ThemeSwitcher variant="danger">ThemeSwitcher danger</ThemeSwitcher>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <ThemeSwitcher size="sm">Size sm</ThemeSwitcher>
      <ThemeSwitcher size="md">Size md</ThemeSwitcher>
      <ThemeSwitcher size="lg">Size lg</ThemeSwitcher>
    </div>
  ),
};
