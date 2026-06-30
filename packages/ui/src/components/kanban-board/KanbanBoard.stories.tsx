import type { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard } from "./KanbanBoard";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "KanbanBoard",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
