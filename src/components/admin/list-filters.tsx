import Link from "next/link";
import { inputClassName, selectClassName } from "@/components/admin/form-field";

type FilterField = {
  name: string;
  label: string;
  type: "select" | "date";
  options?: { value: string; label: string }[];
};

export function ListFilters({
  basePath,
  fields,
  values,
}: {
  basePath: string;
  fields: FilterField[];
  values: Record<string, string | undefined>;
}) {
  const hasFilters = Object.values(values).some(Boolean);

  return (
    <form
      method="get"
      className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-industrial"
    >
      {fields.map((field) => (
        <div key={field.name} className="min-w-[140px]">
          <label className="mb-1 block text-xs font-medium text-secondary">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              name={field.name}
              defaultValue={values[field.name] ?? ""}
              className={selectClassName}
            >
              <option value="">All</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type="date"
              name={field.name}
              defaultValue={values[field.name] ?? ""}
              className={inputClassName}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="rounded-lg bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary-container"
      >
        Filter
      </button>
      {hasFilters && (
        <Link
          href={basePath}
          className="rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold"
        >
          Clear
        </Link>
      )}
    </form>
  );
}
