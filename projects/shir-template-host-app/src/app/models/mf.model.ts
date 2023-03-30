/*
 * Copyright '2023' Dell Inc. or its subsidiaries. All Rights Reserved.
 */
import { LoadRemoteModuleOptions, Manifest, RemoteConfig } from '@angular-architects/module-federation';

// All configurations will contain `remoteEntry` field as it is mandatory because it points to the location where the MFE resources are exposed.
// The configuration for a component will contain `exposedModule` and `componentName` fields
// The configuration for a module will contain `exposedModule`, `ngModuleName` and `routePath` fields
// This is because the modules are loaded in the routing module (one per page), while the components are loaded inside html files (one or more per page)
export type CustomRemoteConfig = RemoteConfig & {
  exposedModule: string;
  componentName?: string;
  ngModuleName?: string;
  routePath?: string;
};

export type CustomManifest = Manifest<CustomRemoteConfig>;

export type PluginOptions = LoadRemoteModuleOptions & {
  componentName: string;
};
