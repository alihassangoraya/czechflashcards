import { createBoundaryViolations } from "./mobileViolationState/boundaryViolations.mjs";
import { createFeatureViolations } from "./mobileViolationState/featureViolations.mjs";
import { createPlatformViolations } from "./mobileViolationState/platformViolations.mjs";

export function createMobileArchitectureViolations() {
  return {
    ...createFeatureViolations(),
    ...createBoundaryViolations(),
    ...createPlatformViolations(),
    duplicateTypes: [],
    defaultExports: [],
    lineCounts: [],
    localeSections: [],
    localeSettingsSections: [],
    rawCollectionTypes: [],
    wildcardExports: []
  };
}
