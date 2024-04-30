import { GithubProfile } from "../utils/github.ts";

async function getGithubProfile(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return await response.json() as GithubProfile;
}

type Data = {
  profile: GithubProfile;
  query: string;
};

export default async function Home(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("username") || "octocat";
  const profile = await getGithubProfile(query);
  // use tailwindcss for styling
  return (
    <div class="p-4">
      <form class="flex">
        <input
          type="text"
          name="username"
          value={query}
          class="px-2 py-1 border-gray-500 border-2 rounded"
        />
        <button
          type="submit"
          class="px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
        >
          Search
        </button>
      </form>
      <h1 class="text-2xl font-bold">{profile.name}</h1>
      <p class="text-gray-500">{profile.bio}</p>
      <p class="text-gray-500">{profile.location}</p>
    </div>
  );
}
