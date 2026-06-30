import { inspectLocalRouteAndModalPicks } from "./mobileContractRules.mjs";
import { inspectWildcardExports } from "./mobileBarrelRules.mjs";
import { inspectFeatureHookPlacement, inspectFeaturePlacement, inspectFeatureText } from "./mobileFeatureRules.mjs";
import { inspectMaterialIconPropTypes } from "./mobileIconRules.mjs";
import { inspectAppImports, inspectFeatureImports } from "./mobileImportBoundaryRules.mjs";
import { inspectLineCount } from "./mobileLineCountRules.mjs";
import { inspectRootAppModules } from "./mobileRootAppRules.mjs";
import { inspectRootSourceFile } from "./mobileRootSourceRules.mjs";
import { inspectRootPlatformServices, inspectRootServices } from "./mobileServiceRules.mjs";
import { inspectCanonicalTypes, inspectRawCollectionTypes } from "./mobileTypeRules.mjs";

export function inspectMobileFile(source, violations) {
  inspectLineCount(source, violations);
  inspectWildcardExports(source, violations);
  inspectFeaturePlacement(source, violations);
  inspectFeatureHookPlacement(source, violations);
  inspectFeatureText(source, violations);
  inspectAppImports(source, violations);
  inspectFeatureImports(source, violations);
  inspectRootSourceFile(source, violations);
  inspectRootAppModules(source, violations);
  inspectRootServices(source, violations);
  inspectRootPlatformServices(source, violations);
  inspectMaterialIconPropTypes(source, violations);
  inspectCanonicalTypes(source, violations);
  inspectRawCollectionTypes(source, violations);
  inspectLocalRouteAndModalPicks(source, violations);
}
