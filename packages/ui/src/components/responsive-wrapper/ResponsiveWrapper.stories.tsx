import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveWrapper } from "./ResponsiveWrapper";

const meta: Meta<typeof ResponsiveWrapper> = {
  title: "Components/ResponsiveWrapper",
  component: ResponsiveWrapper,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveWrapper>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "ResponsiveWrapper",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <ResponsiveWrapper variant="default">ResponsiveWrapper default</ResponsiveWrapper>
      <ResponsiveWrapper variant="compact">ResponsiveWrapper compact</ResponsiveWrapper>
      <ResponsiveWrapper variant="spacious">ResponsiveWrapper spacious</ResponsiveWrapper>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
