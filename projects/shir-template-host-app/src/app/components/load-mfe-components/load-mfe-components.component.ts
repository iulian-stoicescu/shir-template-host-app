/*
 * Copyright '2023' Dell Inc. or its subsidiaries. All Rights Reserved.
 */
import { Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { CustomManifest, PluginOptions } from '../../models/mf.model';
import { getManifest, loadRemoteModule } from '@angular-architects/module-federation';
import { from } from 'rxjs';

// this component reads all the configurations from the `mf.manifest.json` file, then finds the one that has the
// `componentName` field set (aka is an exposed component from the MFEs that this app needs) to the value of the
// input parameter `componentToBeLoaded`. That component will then be loaded from the mfe and created inside the template.
@Component({
  selector: 'load-mfe-components',
  templateUrl: 'load-mfe-components.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoadMfeComponentsComponent implements OnInit {
  @Input() componentToBeLoaded: string | undefined;

  @ViewChild('mfeComponentPlaceHolder', { read: ViewContainerRef, static: true }) viewContainer!: ViewContainerRef;

  ngOnInit(): void {
    const manifest: CustomManifest = getManifest<CustomManifest>();
    const options: PluginOptions = Object.values(manifest).find(
      customConfig => customConfig.componentName === this.componentToBeLoaded
    ) as PluginOptions;

    this.viewContainer.clear();
    from(loadRemoteModule(options).then(m => m[options?.componentName])).subscribe(component => {
      this.viewContainer?.createComponent(component);
    });
  }
}
