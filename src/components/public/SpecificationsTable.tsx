export function SpecificationsTable({
  specifications,
}: {
  specifications: Record<string, string>;
}) {
  if (Object.keys(specifications).length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-industrial">
      <table className="min-w-full divide-y divide-outline-variant">
        <tbody className="divide-y divide-outline-variant">
          {Object.entries(specifications).map(([key, value]) => (
            <tr key={key}>
              <th className="px-4 py-3 text-left text-sm font-semibold text-on-surface bg-surface-container-low w-1/3">
                {key.replace(/_/g, " ")}
              </th>
              <td className="px-4 py-3 text-sm text-secondary">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function parseSpecifications(json: string | null | undefined): Record<string, string> {
  if (!json) return {};
  try {
    const parsed = JSON.parse(json) as Record<string, string>;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}
