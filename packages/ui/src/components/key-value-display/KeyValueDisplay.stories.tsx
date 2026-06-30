import type { Meta, StoryObj } from "@storybook/react";
import { KeyValueDisplay } from "./KeyValueDisplay";

const meta: Meta<typeof KeyValueDisplay> = {
  title: "Components/KeyValueDisplay",
  component: KeyValueDisplay,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof KeyValueDisplay>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "KeyValueDisplay",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <KeyValueDisplay variant="default">KeyValueDisplay default</KeyValueDisplay>
      <KeyValueDisplay variant="bordered">KeyValueDisplay bordered</KeyValueDisplay>
      <KeyValueDisplay variant="striped">KeyValueDisplay striped</KeyValueDisplay>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
