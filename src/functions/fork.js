import "@octokit/core";
import vars from './vars'





//make fork function
async function fork(repository) {  
    if (repository === undefined) {
        repository = 'register';
      }
   // if (owner === undefined) {
   //     owner = 'is-a-dev';
   //   }  
    const { Octokit } = require("@octokit/core");
    const { createTokenAuth } = require("@octokit/auth-token");
    const token = Object.values(vars)
    const ghtoken = token.toString();
    console.log(ghtoken);

    const octokit = new Octokit({
        auth: ghtoken
    })
    const forked = await octokit.request('POST /repos/{owner}/{repo}/forks', {
        owner: 'is-a-dev',
        repo: repository
    });
    return forked;
    
}

export default fork