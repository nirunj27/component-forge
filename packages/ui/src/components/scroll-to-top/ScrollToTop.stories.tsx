import type { Meta, StoryObj } from "@storybook/react";
import { ScrollToTop } from "./ScrollToTop";

const meta: Meta<typeof ScrollToTop> = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","ghost","danger"] },
    size: { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    children: "ScrollToTop",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ScrollToTop variant="primary">ScrollToTop primary</ScrollToTop>
      <ScrollToTop variant="secondary">ScrollToTop secondary</ScrollToTop>
      <ScrollToTop variant="ghost">ScrollToTop ghost</ScrollToTop>
      <ScrollToTop variant="danger">ScrollToTop danger</ScrollToTop>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <ScrollToTop size="sm">Size sm</ScrollToTop>
      <ScrollToTop size="md">Size md</ScrollToTop>
      <ScrollToTop size="lg">Size lg</ScrollToTop>
    </div>
  ),
};
