import { useCallback, useState } from "react";
import { findOptimalClinician } from "../utils/dispatch";
import type { ClinicianResult, Location } from "../types";

export function useClinicianDispatch() {
  const [address, setAddress] = useState("");
  const [labDropoff, setLabDropoff] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ClinicianResult[] | null>(null);
  const [patient, setPatient] = useState<Location | null>(null);
  const [error, setError] = useState("");

  const handleFind = useCallback(() => {
    if (!address.trim()) {
      setError("Please enter a patient address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const { results: r, patient: p } = findOptimalClinician(
        address.trim(),
        labDropoff,
      );

      setResults(r);
      setPatient(p);
      setLoading(false);
    }, 600);
  }, [address, labDropoff]);

  return {
    address,
    setAddress,
    labDropoff,
    setLabDropoff,
    loading,
    results,
    patient,
    error,
    handleFind,
  };
}
