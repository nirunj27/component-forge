import type { Meta, StoryObj } from "@storybook/react";
import { ResizablePanels } from "./ResizablePanels";

const meta: Meta<typeof ResizablePanels> = {
  title: "Components/ResizablePanels",
  component: ResizablePanels,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    readOnly: { control: "boolean" },
    height: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanels>;

export const Default: Story = {
  args: {
    value: "",
    readOnly: false,
    height: 320,
    children: "ResizablePanels",
  },
};

export const AllVariants: Story = {
  args: {}
};

export const AllSizes: Story = {
  args: {}
};
