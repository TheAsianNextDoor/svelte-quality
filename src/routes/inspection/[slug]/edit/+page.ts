import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const data = await fetch('/api/task');
  const { tasks } = await data.json();

  return {
    page: params.slug,
    tasks,
  };
};
