import type { Meta, StoryObj } from "@storybook/react";
import { StickyColumns } from "./StickyColumns";

const meta: Meta<typeof StickyColumns> = {
  title: "Components/StickyColumns",
  component: StickyColumns,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StickyColumns>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "StickyColumns",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <StickyColumns variant="default">StickyColumns default</StickyColumns>
      <StickyColumns variant="bordered">StickyColumns bordered</StickyColumns>
      <StickyColumns variant="striped">StickyColumns striped</StickyColumns>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
