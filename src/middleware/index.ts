import { prisma } from "../prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { IS_DEVELOPMENT } from "../config";

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
//handle authentication by tying users to an ID provided by some other service ("auth_ID" in the model) that we get from
//the decoded token. In the development environment, we can make things easier and facilitate devolopment by using just having
//the frontend pass the unencoded userID in the authorization header.

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

  //Add additional logic for authentication here.....
}
