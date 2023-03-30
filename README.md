# ShirTemplateHostApp

### What is this app

This is a dummy example of a `host` (aka shell) application in the context of Module Federation,
written in Angular 14.

### How was this app generated

To generate this application and the default setup for module federation, the following commands
were ran:

- `ng new shir-template-host-app --create-application="false"`
- `cd shir-template-host-app`
- `ng g application shir-template-host-app --routing=true --style=scss`
- `ng add @angular-architects/module-federation@^14.3.0 --project shir-template-host-app --port 5002 --type dynamic-host`

Eventually other code changes were done manually and the commit messages can be observed for a
detailed description.

### What does this app

The `mf.manifest.json` defines the configuration details for all the mfe resources (modules and
components) that are available to be consumed by this app. The `remoteEntry` field is the only one
that is mandatory, but we decided to provide more different details so that they are all kept inside
that file (else we would still provide them but in other files). Then we created `mf.model.ts` to
define the class types that are needed.

Module resources are lazily loaded inside the `app-routing.module.ts` (plenty of details in that
file), which means that on each different route (so a single page) we can have a single micro
frontend. But there might be cases where we want to load multiple micro frontends on the same page
and in this case we can use component resources. In this application, we have
created `LoadMfeComponentsComponent` (plenty of details in that file) that accepts as input
parameter a string corresponding to the name of the component that we want to load from a mfe and
then create it inside our template. We can see how easy the `ExposedComponent` from the mfe is
integrated inside `home.component.html`.
