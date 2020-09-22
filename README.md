# IBM Garage Cloud Native Toolkit 
## Developer Dashboard

A simple dashboard that enables navigation to the tools that have been installed
 using the `iteration-zero` Terraform asset or configured with `igc tool
 -config` command line.

## Build

To build the project use the following commands.

Build and develop with the server code it will open on port `3000`
```bash
npm install
npm run build
npm run start
```

Build and develop with the client code it will open on port `3001`
```bash
cd client
npm run dev 

```

### Testing API

Use PostMan `newman` CLI
```bash
brew install newman
npm run api:test
```

### Release steps

#### Creating a release

This repository uses GitHub actions to automatically create a release whenever a change is pushed to `master`. The workflow for changes should follow a typical process:

1. Create a branch (ideally in a fork of the repository)

2. Create a pull-request to merge the changes from the branch into `master`. Add a release label (`major`, `minor`, `patch`) and a change type label (`feature`, `bug`, `chore`) to the pull request to effect the new release tag that is generated and how the change log is generated for the release.

3. Merge the pull-request into master. This will trigger the workflow to create the release.

#### Building the container image

This repository is also connected to the Docker Hub build image. The build process has been configured with two rules:

1. Any time a change is pushed to `master`, a new image is built with the `latest` tag
2. Any time a new release is created for the repository, a new image is built with a tag that matches the repository tag (e.g. git tag v1.1.1 -> docker tag 1.1.1)

#### Updating the Dashboard terraform module

The `terraform-tools-dashboard` module deploys the built image to the cluster. The terraform module uses the `developer-dashboard` chart in the [Toolkit charts](https://github.com/ibm-garage-cloud/toolkit-charts)
repository to deploy the image.

Each version of the module refers to a particular version of the image. As part of the release process, a GitHub Action will trigger a notification
to the terraform module that a new version is available. This will trigger a process in the terraform module to get the latest version number and create a PR containing the change.
