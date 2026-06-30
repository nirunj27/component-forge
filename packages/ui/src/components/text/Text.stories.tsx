import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary","success","warning","error"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Text",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Text variant="primary">Text primary</Text>
      <Text variant="secondary">Text secondary</Text>
      <Text variant="success">Text success</Text>
      <Text variant="warning">Text warning</Text>
      <Text variant="error">Text error</Text>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Text size="sm">Size sm</Text>
      <Text size="md">Size md</Text>
      <Text size="lg">Size lg</Text>
    </div>
  ),
};
