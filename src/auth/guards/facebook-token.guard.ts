import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FacebookTokenAuthGuard extends AuthGuard('facebook-token') {}