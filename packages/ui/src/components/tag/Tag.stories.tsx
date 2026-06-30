import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Tag",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Tag variant="primary">Tag primary</Tag>
      <Tag variant="secondary">Tag secondary</Tag>
      <Tag variant="success">Tag success</Tag>
      <Tag variant="warning">Tag warning</Tag>
      <Tag variant="error">Tag error</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Tag size="sm">Size sm</Tag>
      <Tag size="md">Size md</Tag>
      <Tag size="lg">Size lg</Tag>
    </div>
  ),
};
