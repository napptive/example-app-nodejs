# Using this example with the FREE account

The free account is configured with a default environment whose quota matches the total of the FREE plan. This example relies on creating two environments: one to run the acceptance tests, and the other to deploy the application in production. To run this CI/CD example with a free account follow the next steps:

1. Navigate to [https://github.com/napptive/example-app-nodejs](https://github.com/napptive/example-app-nodejs) and fork the example to your own repository by clicking on the `Fork` icon on the top right of the GitHub page.
2. Generate a [Personal Access Token](https://docs.napptive.com/guides/04.5.Using_personal_access_tokens.html) and save the results in a secret called `PLAYGROUND_PAT`. Make sure the repository can access the value of the secret in case you are using an organization one. If you don't have a playground account, [get started for free](https://playground.napptive.dev) by signing up with your GitHub account.
3. Generate Docker [Access Tokens](https://docs.docker.com/docker-hub/access-tokens/) and store the resulting values in two secrets: `DOCKER_HUB_USER` and `DOCKER_HUB_TOKEN`.
4. Edit [.github/workflows/deploy-app.yml](.github/workflows/deploy-app.yml) and modify the value of `TARGET_DOCKER_REGISTRY` with your docker username. Additionally, modify the following lines so that new environments are created with a specific quota.

```yaml
    - name: Create test environment
      uses: napptive-actions/playground-github-action@v2.4.1
      with:
        cmd: "env create ${{steps.envname.outputs.envname }} --cpu=0.3 --ram=1G" 
        playgroundConfigFile: ./config/playground.yaml
```

```yaml
    - name: Create production environment
      uses: napptive-actions/playground-github-action@v2.4.1
      continue-on-error: true
      with:
        cmd: "env create ${{steps.envname.outputs.envname }} --cpu=0.3 --ram=1G" 
        playgroundConfigFile: ./config/playground.yaml
```

5. Remove your default environment so that there is no environments associated with your account. A default environment can be recreated with a reduced quota of 0.4CPU and 2G RAM.
6. Commit your changes to your repository, accept the PR if you are using this approach, and check the triggered action.
7. Continue on with the [README.md](./README.md#how-to-run-this-example) instructions, skipping steps 1 to 5.