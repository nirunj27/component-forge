import {
  Button,
  Badge,
  Input,
  Card,
  Modal,
  Select,
} from "@component-forge/ui";
import { useState } from "react";
import { Badge as UiBadge } from "@component-forge/app-ui/components/ui/badge";
import {
  Card as UiCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@component-forge/app-ui/components/ui/card";

export function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  const sections = [
    {
      title: "Buttons",
      category: "inputs",
      content: (
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      ),
    },
    {
      title: "Badges",
      category: "display",
      content: (
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Stable</Badge>
          <Badge variant="warning">Beta</Badge>
          <Badge variant="error">Deprecated</Badge>
          <Badge variant="secondary">Draft</Badge>
        </div>
      ),
    },
    {
      title: "Form controls",
      category: "inputs",
      content: (
        <div className="space-y-4">
          <Input label="Email address" placeholder="you@company.com" />
          <Select label="Framework" placeholder="Choose stack" />
        </div>
      ),
    },
    {
      title: "Card layout",
      category: "layout",
      content: (
        <Card
          variant="elevated"
          title="Schema-driven output"
          footer={<Badge variant="success">6 files generated</Badge>}
        >
          <p>Every component ships with TSX, CSS module, tests, Storybook, and docs.</p>
        </Card>
      ),
    },
    {
      title: "Modal overlay",
      category: "overlay",
      content: (
        <>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open modal demo
          </Button>
          <Modal isOpen={modalOpen} title="Confirm deploy" onClose={() => setModalOpen(false)}>
            <p>Deploy generated components to the design system package?</p>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Confirm
            </Button>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <section className="py-16" id="components">
      <div className="mx-auto max-w-6xl space-y-10 px-4">
        <div>
          <h2 className="text-3xl font-bold">Component library</h2>
          <p className="text-muted-foreground">
            Live previews of every generated component in the Forge design system.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <UiCard key={s.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <UiBadge variant="outline">{s.category}</UiBadge>
                </div>
              </CardHeader>
              <CardContent>{s.content}</CardContent>
            </UiCard>
          ))}
        </div>
      </div>
    </section>
  );
}
