import type { Meta, StoryObj } from "@storybook/react";
import { FlowDiagram } from "./FlowDiagram";

const meta: Meta<typeof FlowDiagram> = {
  title: "Components/FlowDiagram",
  component: FlowDiagram,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof FlowDiagram>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "FlowDiagram",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
