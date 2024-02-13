export interface Commit {
    repository: {
      name: string;
      owner: string;
    };
    commitMessage: string;
    commitDate: Date;
    commitAgo: string;
  }