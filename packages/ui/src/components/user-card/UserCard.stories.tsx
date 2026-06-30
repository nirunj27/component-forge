import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default","bordered","striped"] },
    loading: { control: "boolean" },
    empty: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    variant: "default",
    loading: false,
    empty: false,
    children: "UserCard",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <UserCard variant="default">UserCard default</UserCard>
      <UserCard variant="bordered">UserCard bordered</UserCard>
      <UserCard variant="striped">UserCard striped</UserCard>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {}
};
