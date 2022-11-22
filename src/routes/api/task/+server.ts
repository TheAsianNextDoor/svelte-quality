import { prisma } from '@services/prisma';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const tasks = await prisma.task.findMany({
    include: { Links: true },
  });

  return json({ tasks });
};
