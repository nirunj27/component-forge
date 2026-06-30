import type { Meta, StoryObj } from "@storybook/react";
import { EditableTable } from "./EditableTable";

const meta: Meta<typeof EditableTable> = {
  title: "Components/EditableTable",
  component: EditableTable,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof EditableTable>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "EditableTable",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <EditableTable variant="default">EditableTable default</EditableTable>
      <EditableTable variant="bordered">EditableTable bordered</EditableTable>
      <EditableTable variant="striped">EditableTable striped</EditableTable>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
