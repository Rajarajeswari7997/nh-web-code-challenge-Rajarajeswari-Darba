export interface GeoLocation {
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
}

export interface Location extends GeoLocation {}

export interface ClinicianResult {
  readonly name: string;
  readonly address: string;
  readonly totalMiles: number;
  readonly toPatient: number;
  readonly patientToLab?: number;
  readonly labToHome?: number;
  readonly labName?: string;
  readonly rank: number;
}

export interface RankedClinician {
  readonly clinician: GeoLocation;
  readonly totalDistanceMiles: number;
  readonly requiresLab: boolean;
  readonly assignedLab?: GeoLocation;
  readonly rank: number;
}

export interface DispatchResult {
  readonly results: readonly ClinicianResult[];
  readonly patient: Location;
}
