"use server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const players = await prisma.players.findMany();
      return Response.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Inter server error'});
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   const players = await prisma.players.findMany();
//   res.status(200).json(players);
//   console.info(players);
// }