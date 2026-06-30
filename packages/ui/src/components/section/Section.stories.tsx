import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","compact","spacious"] },
    gap: { control: "select", options: ["sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    variant: "default",
    gap: "md",
    children: "Section",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Section variant="default">Section default</Section>
      <Section variant="compact">Section compact</Section>
      <Section variant="spacious">Section spacious</Section>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
