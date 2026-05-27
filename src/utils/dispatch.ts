import { CLINICIANS, LABS } from '../data/locations';
import type { ClinicianResult, Location } from '../types';

const EARTH_RADIUS_MILES = 3958.8;

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const haversineDistanceMiles = (from: Location, to: Location): number => {
  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) ** 2;

  return EARTH_RADIUS_MILES * 2 * Math.asin(Math.sqrt(a));
};

const geocodePatientAddress = (patientAddress: string): Location => {
  const normalized = patientAddress.trim().toLowerCase();
  const hash = Array.from(normalized).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );

  return {
    name: 'Patient location',
    address: patientAddress,
    lat: 44.98 + ((hash % 100) - 50) * 0.001,
    lng: -93.27 + (((hash >> 2) % 100) - 50) * 0.001,
  };
};

const getNearestLab = (patientLocation: Location): Location =>
  LABS.reduce((nearest, currentLab) => {
    const currentDistance = haversineDistanceMiles(
      patientLocation,
      currentLab,
    );
    const nearestDistance = haversineDistanceMiles(
      patientLocation,
      nearest,
    );

    return currentDistance < nearestDistance ? currentLab : nearest;
  }, LABS[0]);

export const findOptimalClinician = (
  patientAddress: string,
  requiresLabDropoff: boolean,
): { results: ClinicianResult[]; patient: Location } => {
  const patient = geocodePatientAddress(patientAddress);

  const results: ClinicianResult[] = CLINICIANS
    .map((clinician) => {
      const toPatient = haversineDistanceMiles(clinician, patient);

      if (!requiresLabDropoff) {
        return {
          name: clinician.name,
          address: clinician.address,
          totalMiles: toPatient * 2,
          toPatient,
          rank: 0,
        };
      }

      const nearestLab = getNearestLab(patient);
      const patientToLab = haversineDistanceMiles(patient, nearestLab);
      const labToHome = haversineDistanceMiles(nearestLab, clinician);

      return {
        name: clinician.name,
        address: clinician.address,
        totalMiles: toPatient + patientToLab + labToHome,
        toPatient,
        patientToLab,
        labToHome,
        labName: nearestLab.name,
        rank: 0,
      };
    })
    .sort((left, right) => left.totalMiles - right.totalMiles)
    .map((result, index) => ({
      ...result,
      rank: index + 1,
    }));

  return {
    results,
    patient,
  };
};
