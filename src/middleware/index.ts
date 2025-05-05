import { prisma } from "../prisma";
import { StatusCodes } from "http-status-codes";
// import { auth } from './firebase'
// import { UserRecord } from 'firebase-admin/auth'
// import { DecodedIdToken } from 'firebase-admin/auth'
import { Request, Response, NextFunction } from "express";
import { IS_DEVELOPMENT } from "../config";

type ErrorType = {
  status: any;
  body: any;
};

export async function getImpersonatedUser(fakeToken?: string) {
  if (!fakeToken) {
    return;
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(fakeToken) },
  });
  return user;
}

//There's a decent chance we'll end up farming out authentication to something like Firebase on the front-end, and we'll
//handle authentication by tying users to an ID provided by some other service ("auth_ID" in the database) that we get from
//the decoded token. In the development environment, we can accept
export async function getUserFromRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers?.authorization;
  if (!header) {
    console.log("no header found!");
    res.status(StatusCodes.UNAUTHORIZED).send("Authorization required.");
  }
  console.log(header);
  const [bearerType, token] = header.split(" ");

  if (!token) {
    console.log("Malformed token.");
    res.status(StatusCodes.UNAUTHORIZED).send("Malformed token.");
  }

  let user;

  if (bearerType === "Impersonate" && IS_DEVELOPMENT) {
    user = await getImpersonatedUser(token);

    console.log("Impersonated user: ", token, user?.display_name);
    if (user) {
      //@ts-ignore
      req.locals = user;
      next();
    } else {
      console.log("User not round from ID");
      res.status(StatusCodes.NOT_FOUND).send("User not found.");
    }
  }

  // //for deleted users
  // if (user?.deleted_at) {
  //   return [
  //     null,
  //     null,
  //     {
  //       status: StatusCodes.GONE,
  //       body: 'User has been deleted',
  //     },
  //   ]
  // }

  //Add logic for authentication here.....
}
