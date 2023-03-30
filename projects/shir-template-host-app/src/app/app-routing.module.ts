import { getManifest, loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomManifest } from './models/mf.model';
import { HomeComponent } from './components/home/home.component';

// this will load all the configurations from the `mf.manifest.json` file that have the `ngModuleName` field set,
// aka all the exposed modules from the MFEs that this app needs. Each module will be lazily loaded on the given
// specified routePath. Currently, the `ExposedModule` from `shir-template-mfe-app` will be loaded on the `mfe` path.
const lazyRoutes = Object.entries(getManifest<CustomManifest>())
  .filter(([key, value]) => {
    return value.ngModuleName != null
  })
  .map(([key, value]) => {
    return {
      path: value.routePath,
      loadChildren: () => loadRemoteModule({
        type: 'manifest',
        remoteName: key,
        exposedModule: value.exposedModule
      }).then(m => m[value.ngModuleName!])
    }
  });

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot([...routes, ...lazyRoutes])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
