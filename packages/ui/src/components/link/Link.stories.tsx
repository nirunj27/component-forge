import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary","secondary"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    variant: "primary",
    disabled: false,
    children: "Link",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Link variant="primary">Link primary</Link>
      <Link variant="secondary">Link secondary</Link>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
