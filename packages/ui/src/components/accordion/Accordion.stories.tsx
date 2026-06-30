import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "Accordion",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Accordion variant="default">Accordion default</Accordion>
      <Accordion variant="bordered">Accordion bordered</Accordion>
      <Accordion variant="striped">Accordion striped</Accordion>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
