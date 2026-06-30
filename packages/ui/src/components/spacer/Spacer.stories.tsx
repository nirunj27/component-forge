import type { Meta, StoryObj } from "@storybook/react";
import { Spacer } from "./Spacer";

const meta: Meta<typeof Spacer> = {
  title: "Components/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Spacer",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Spacer variant="default">Spacer default</Spacer>
      <Spacer variant="compact">Spacer compact</Spacer>
      <Spacer variant="spacious">Spacer spacious</Spacer>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
