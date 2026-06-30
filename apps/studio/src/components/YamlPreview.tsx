import {
  formatValidationErrors,
  safeParseComponentSchema,
  serializeSchemaToYaml,
  type ComponentSchema,
} from "@component-forge/schema";

interface YamlPreviewProps {
  schema: ComponentSchema;
}

export function YamlPreview({ schema }: YamlPreviewProps) {
  const parsed = safeParseComponentSchema(schema);
  let yaml = "";
  let errors: string | null = null;

  if (parsed.success) {
    try {
      yaml = serializeSchemaToYaml(parsed.data);
    } catch (e) {
      errors = String(e);
    }
  } else {
    errors = formatValidationErrors(parsed.error);
  }

  return (
    <aside className="yaml-panel">
      <div className="panel-header">
        <h3>YAML preview</h3>
        {parsed.success ? (
          <span className="badge badge-ok">Valid</span>
        ) : (
          <span className="badge badge-error">Invalid</span>
        )}
      </div>
      {errors ? (
        <pre className="yaml-error">{errors}</pre>
      ) : (
        <pre className="yaml-code">{yaml}</pre>
      )}
    </aside>
  );
}
