import { useState } from "react";
import { ClinicianResult, Location } from "../types";
import { useClinicianDispatch } from "../hooks/useClinicianDispatch";

// ── Rank badge colours ───────────────────────────────────────────────────────
const RANK_COLORS: { bg: string; text: string }[] = [
  { bg: "#1D9E75", text: "#fff" }, // 1st – teal
  { bg: "#378ADD", text: "#fff" }, // 2nd – blue
  { bg: "#888780", text: "#fff" }, // 3rd – slate
];

function RankBadge({ rank }: { rank: number }) {
  const color = RANK_COLORS[rank - 1] ?? { bg: "#D3D1C7", text: "#444" };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: color.bg,
        color: color.text,
        fontSize: 12,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {rank}
    </span>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────
function RouteChip({ label, miles }: { label: string; miles: number }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "3px 8px",
        background: "rgba(255,255,255,0.18)",
        borderRadius: "var(--border-radius-md)",
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      {label}{" "}
      <strong style={{ fontWeight: 600 }}>{miles.toFixed(1)} mi</strong>
    </span>
  );
}

function RouteDot() {
  return (
    <span
      style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, alignSelf: "center" }}
    >
      ·
    </span>
  );
}

// ── Best-match hero card ─────────────────────────────────────────────────────
function BestMatchCard({ best }: { best: ClinicianResult }) {
  return (
    <div
      style={{
        background: "#1D9E75",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.25rem 1.5rem",
        marginBottom: "1rem",
        color: "#fff",
      }}
    >
      <p
        style={{
          margin: "0 0 4px",
          fontSize: 12,
          opacity: 0.8,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Best match
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <p style={{ margin: "0 0 2px", fontSize: 24, fontWeight: 500 }}>
            {best.name}
          </p>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>
            {best.address}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: "0 0 2px", fontSize: 28, fontWeight: 500 }}>
            {best.totalMiles.toFixed(1)} mi
          </p>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>
            total round-trip
          </p>
        </div>
      </div>

      {/* Route breakdown chips */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "0.5px solid rgba(255,255,255,0.25)",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <RouteChip label="Home → Patient" miles={best.toPatient} />
        {best.labName ? (
          <>
            <RouteDot />
            <RouteChip label={`→ ${best.labName}`} miles={best.patientToLab!} />
            <RouteDot />
            <RouteChip label="→ Home" miles={best.labToHome!} />
          </>
        ) : (
          <>
            <RouteDot />
            <RouteChip label="→ Home" miles={best.toPatient} />
          </>
        )}
      </div>
    </div>
  );
}

// ── Ranked clinician list ────────────────────────────────────────────────────
interface RankedListProps {
  results: ClinicianResult[];
  labDropoff: boolean;
  patient: Location | null;
}

function RankedClinicianList({ results, labDropoff, patient }: RankedListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? results : results.slice(0, 3);

  return (
    <div
      style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      {/* List header */}
      <div
        style={{
          padding: "1rem 1.5rem 0.75rem",
          borderBottom: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 500,
            color: "var(--color-text-secondary)",
          }}
        >
          All clinicians — ranked by total drive distance
          {labDropoff && patient && (
            <span style={{ marginLeft: 8, color: "var(--color-text-tertiary)" }}>
              · Lab route via nearest lab
            </span>
          )}
        </p>
      </div>

      {/* Clinician rows */}
      {displayed.map((r, i) => (
        <div
          key={r.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "0.85rem 1.5rem",
            borderBottom:
              i < displayed.length - 1
                ? "0.5px solid var(--color-border-tertiary)"
                : "none",
            background: r.rank === 1 ? "#F0FBF7" : "transparent",
          }}
        >
          <RankBadge rank={r.rank} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: "0 0 2px",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--color-text-primary)",
              }}
            >
              {r.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {r.address}
            </p>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                margin: "0 0 2px",
                fontSize: 15,
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              {r.totalMiles.toFixed(1)} mi
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "var(--color-text-secondary)",
              }}
            >
              {labDropoff
                ? `${r.toPatient.toFixed(1)} + ${r.patientToLab!.toFixed(1)} + ${r.labToHome!.toFixed(1)}`
                : `${r.toPatient.toFixed(1)} × 2`}
            </p>
          </div>
        </div>
      ))}

      {/* Show-all toggle */}
      {!showAll && results.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: 13,
            color: "var(--color-text-secondary)",
            background: "transparent",
            border: "none",
            borderTop: "0.5px solid var(--color-border-tertiary)",
            cursor: "pointer",
          }}
        >
          Show all {results.length} clinicians ↓
        </button>
      )}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ClinicianDispatch() {
  const {
    address,
    setAddress,
    labDropoff,
    setLabDropoff,
    loading,
    results,
    patient,
    error,
    handleFind,
  } = useClinicianDispatch();

  const best = results?.[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background-tertiary)",
        fontFamily: "var(--font-sans)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              margin: "0 0 6px",
            }}
          >
            Nice Healthcare
          </p>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 500,
              margin: "0 0 6px",
              color: "var(--color-text-primary)",
            }}
          >
            Clinician Dispatch
          </h1>
          <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14 }}>
            Find the nearest available clinician for a patient visit.
          </p>
        </div>

        {/* ── Input card ── */}
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "1.25rem 1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              marginBottom: 6,
            }}
          >
            Patient address
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFind()}
            placeholder="e.g. 1000 Nicollet Mall, Minneapolis, MN 55403"
            style={{
              width: "100%",
              padding: "9px 12px",
              fontSize: 14,
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-md)",
              background: "var(--color-background-secondary)",
              color: "var(--color-text-primary)",
              marginBottom: 12,
              boxSizing: "border-box",
            }}
          />

          {/* Lab drop-off checkbox */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "var(--color-text-primary)",
              marginBottom: 16,
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={labDropoff}
              onChange={(e) => setLabDropoff(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#1D9E75" }}
            />
            <span>Lab drop-off required</span>
            {labDropoff && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "2px 8px",
                  background: "#E1F5EE",
                  color: "#0F6E56",
                  borderRadius: "var(--border-radius-md)",
                }}
              >
                Route includes nearest lab
              </span>
            )}
          </label>

          {error && (
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-danger)",
                margin: "0 0 12px",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            onClick={handleFind}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              fontSize: 14,
              fontWeight: 500,
              background: loading
                ? "var(--color-background-secondary)"
                : "#1D9E75",
              color: loading ? "var(--color-text-secondary)" : "#fff",
              border: "none",
              borderRadius: "var(--border-radius-md)",
              cursor: loading ? "default" : "pointer",
              transition: "opacity 0.15s",
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    border: "2px solid #888",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Calculating…
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Find optimal clinician
              </>
            )}
          </button>
        </div>

        {/* ── Results ── */}
        {!loading && best && (
          <BestMatchCard best={best} />
        )}

        {!loading && results && patient && (
          <RankedClinicianList
            results={results}
            labDropoff={labDropoff}
            patient={patient}
          />
        )}

        {/* ── Footnote ── */}
        {results && !loading && (
          <p
            style={{
              fontSize: 12,
              color: "var(--color-text-tertiary)",
              margin: 0,
            }}
          >
            Distances are crow-flies (Haversine formula) using geocoded
            clinician/lab coordinates. Patient address is approximated; a
            production build would use a geocoding + routing API for road
            distances.
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="text"]:focus {
          outline: none;
          box-shadow: 0 0 0 2px #1D9E75;
        }
      `}</style>
    </div>
  );
}
