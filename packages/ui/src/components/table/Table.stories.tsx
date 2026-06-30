import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "Table",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Table variant="default">Table default</Table>
      <Table variant="bordered">Table bordered</Table>
      <Table variant="striped">Table striped</Table>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
