import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.body.email) {
          throw new BadRequestException('Please provide an email');
        }
        if (!request.body.password) {
            throw new BadRequestException('Please provide a password');
        }
        return super.canActivate(context);
      }
}