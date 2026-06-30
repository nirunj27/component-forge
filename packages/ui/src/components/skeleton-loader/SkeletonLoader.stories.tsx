import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonLoader } from "./SkeletonLoader";

const meta: Meta<typeof SkeletonLoader> = {
  title: "Components/SkeletonLoader",
  component: SkeletonLoader,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonLoader>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "SkeletonLoader",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <SkeletonLoader variant="primary">SkeletonLoader primary</SkeletonLoader>
      <SkeletonLoader variant="secondary">SkeletonLoader secondary</SkeletonLoader>
      <SkeletonLoader variant="success">SkeletonLoader success</SkeletonLoader>
      <SkeletonLoader variant="warning">SkeletonLoader warning</SkeletonLoader>
      <SkeletonLoader variant="error">SkeletonLoader error</SkeletonLoader>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <SkeletonLoader size="sm">Size sm</SkeletonLoader>
      <SkeletonLoader size="md">Size md</SkeletonLoader>
      <SkeletonLoader size="lg">Size lg</SkeletonLoader>
    </div>
  ),
};
