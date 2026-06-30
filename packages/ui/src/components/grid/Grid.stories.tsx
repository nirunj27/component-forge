import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Grid",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Grid variant="default">Grid default</Grid>
      <Grid variant="compact">Grid compact</Grid>
      <Grid variant="spacious">Grid spacious</Grid>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
